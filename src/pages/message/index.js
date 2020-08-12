import { useReachBottom, useState, useEffect } from '@tarojs/taro'
import Comment from '@/component/comment'
import { View } from '@tarojs/components'
import { AtLoadMore, AtMessage } from 'taro-ui'
import { post } from '@/util/http'
import UserInfo from '@/component/userInfo'
import './index.scss'


export default function Login () {
    const [more, setMore] = useState(false)
    const [comment, setComment] = useState([])
    const [status, setStatus] = useState('loading')
    const [page, setPage] = useState(1)
    const [commentLength, setCommentLength] = useState(0)
    const [userInfo, setUserInfo] = useState({})
    const INIT_PAGE = 1
    const INIT_PAGE_SIZE = 10

    // 初次获取评论列表
    const fetchCommentList = () => {
        post('/messages/findAll', {
            page: INIT_PAGE,
            pageSize: INIT_PAGE_SIZE
        }).then(res => {
            setComment(res.data.data)
            setCommentLength(res.data.total)
        })
    }

    // 下拉获取更多数据
    const fetchMoreCommentList = () => {
        post('/messages/findAll', {
            page: page + 1,
            pageSize: INIT_PAGE_SIZE
        }).then(res => {
            setPage(page + 1)
            setCommentLength(res.data.total)
            setComment(comment.concat(res.data.data))
        })
    }

    // 从Storge中获取用户信息
    const getUserInfoFromStorage = () => {
        const user = Taro.getStorageSync('userInfo')
        setUserInfo(user)
    }

    // 增加留言
    const commentInsert = async (content, isSubComment, reply) => {
        const params = {
            content,
            reply,
            avatar: userInfo.avatarUrl,
            author: userInfo.nickName,
            messageId: isSubComment
        }
        let res = null

        if (isSubComment) res = await post('/messages/addSubMessage', params)
        else res = await post('/messages/add', params)

        if (res.data.code === 200) {
            setPage(1)
            setStatus('loading')
            actionCallback(null, '留言成功')
        } else {
            actionCallback('error', '留言失败')
            return
        }

        if (isSubComment) addChildrenComment(params)
        else addComment(params)

    }

    const addComment = (params) => {
        let commentList = comment.slice()
        commentList.unshift({ ...params, modifyOn: Date.now() })
        setComment(commentList)
    }

    const addChildrenComment = (params) => {
        const newComment = comment.map(item => {
            if (item.messageId === params.messageId) {
                item.sub.push({ ...params, modifyOn: Date.now() })
            }
            return item
        })
        setComment(newComment)
    }

    const actionCallback = (type, message) => Taro.atMessage({ message, type })

    useReachBottom(() => {
        if (comment.length === commentLength) {
            setStatus('noMore')
            return
        }
        setMore(true)
        fetchMoreCommentList()
    })


    useEffect(() => {
        fetchCommentList()
        getUserInfoFromStorage()
    }, [])
    return (
        <View>
            <AtMessage />
            {
                userInfo ? (
                    <View>
                        <Comment data={comment} commentInsert={commentInsert} />
                        {more ? (<View className="load" ><AtLoadMore status={status} /></View>) : ''}
                    </View>
                ) : <UserInfo getUserInfoFromStorage={getUserInfoFromStorage} />
            }
        </View>
    )
}

Login.config = {
    navigationBarTitleText: '留言板',
}
