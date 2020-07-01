import { useReachBottom, useState, useEffect } from '@tarojs/taro'
import Comment from '@/component/comment'
import { View } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import { post } from '@/util/http'
import './index.scss'


export default function Login () {
    const [more, setMore] = useState(false)
    const [comment, setComment] = useState([])
    const [status, setStatus] = useState('loading')
    const [page, setPage] = useState(1)
    const [commentLength, setCommentLength] = useState(0)
    const INIT_PAGE_SIZE = 10

    const fetchCommentList = () => {
        post('/messages/findAll', {
            page,
            pageSize: INIT_PAGE_SIZE
        }).then(res => {
            setComment(comment.concat(res.data.data))
            setCommentLength(res.data.total)
            setPage(page + 1)
        })
    }

    useReachBottom(() => {
        if (comment.length === commentLength) {
            setStatus('noMore')
            return
        }
        setMore(true)
        fetchCommentList()
    })


    useEffect(() => {
        fetchCommentList()
    }, [])
    return (
        <View>
            <Comment data={comment} />
            {more ? (<View className="load" ><AtLoadMore status={status} /></View>) : ''}
        </View>
    )
}

Login.config = {
    navigationBarTitleText: '留言板',
}
