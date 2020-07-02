import { View, Image, Text } from '@tarojs/components'
import { formatDate } from '@/util/utils'
import './index.scss'

export default ({ messageId, avatar, modifyOn, content, author, sub, handleClick, handleChildrenClick }) => {
    return (
        <View className="comment-item" >
            <Image src={avatar} className="avatar" />
            <View className="other" onClick={handleClick}>
                <View className="info">
                    <Text className="name">{author}</Text>
                    <Text className="date">{formatDate(modifyOn, 'yyyy年MM月dd日 hh:mm')}</Text>
                </View>
                <View className="content">
                    <Text>{content}</Text>
                </View>
            </View>
            {
                sub && sub.length > 0 ? (
                    <View className="children-container">
                        {
                            sub.map(item => {
                                return (
                                    <View
                                        onClick={handleChildrenClick.bind(this, messageId, item.author)}
                                        className="children-item"
                                        key={item.modifyOn}
                                    >
                                        <Image src={item.avatar} className="avatar" />
                                        <View className="other">
                                            <View className="info">
                                                <Text className="name">{item.author}</Text>
                                            </View>
                                            <View className="content">
                                                <Text>
                                                    {
                                                        item.reply ? <Text className="reply">{'@' + item.reply + ':'}</Text> : ''
                                                    }
                                                    {item.content}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                ) : ''
            }

        </View >
    )
}
