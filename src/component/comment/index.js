import { useState, useReachBottom } from '@tarojs/taro'
import { View, Input, Button } from '@tarojs/components'
import CommentItem from '../commentItem'
import { AtActionSheetItem, AtActionSheet, AtLoadMore } from 'taro-ui'
import './index.scss'


export default (props) => {
    const { data, commentInsert } = props
    const [isOpened, setIsOpened] = useState(false)
    const [input, setInput] = useState('')
    const [focus, setFocus] = useState(false)
    const [currentActiveMessageId, setCurrentActiveMessageId] = useState('')
    const [reply, setReply] = useState('')

    const handleClick = (id) => {
        setIsOpened(true)
        setCurrentActiveMessageId(id)
    }

    const handleChildrenClick = (id, reply) => {
        setReply(reply)
        setIsOpened(true)
        setCurrentActiveMessageId(id)
    }

    const onInput = (e) => {
        setInput(e.detail.value)
    }

    const handleReply = () => {
        setFocus(true)
        setIsOpened(false)
    }

    const handleComment = () => {
        if (input.length > 0) {
            commentInsert(input, currentActiveMessageId, reply)
            setInput('')
            setReply('')
            setCurrentActiveMessageId('')
        } else {
            Taro.atMessage({
                message: '你还没输入呢',
                type: 'warning'
            })
        }
    }


    return (
        <View className="comment">
            <AtMessage />
            <View className="container">
                {
                    data && data.length > 0 ? data.map(item => {
                        return <CommentItem
                            {...item}
                            key={item.modifyOn}
                            handleClick={handleClick.bind(this, item.messageId, false)}
                            handleChildrenClick={handleChildrenClick}
                        />
                    }) : ''
                }
            </View>
            <AtActionSheet isOpened={isOpened} onClose={() => { setIsOpened(false) }} >
                <AtActionSheetItem onClick={handleReply} >
                    回复
                </AtActionSheetItem>
            </AtActionSheet>
            <View className="input">
                <Input
                    value={input}
                    className="item"
                    placeholderClass="placeholder"
                    border={false}
                    cursorSpacing={180}
                    focus={focus}
                    name='value'
                    type='text'
                    placeholder='请输入留言'
                    onInput={onInput}
                    onBlur={() => { setFocus(false) }}
                />
                <Button size='mini' className="btn" onClick={handleComment}>发送</Button>
            </View>
        </View>
    )
}
