import { View, Image, Text } from '@tarojs/components'
import { formatDate } from '@/util/utils'
import './index.scss'

export default ({ messageId, avatar, modifyOn, content, author, sub, handleClick, handleChildrenClick }) => {
    return (
        <View className="comment-item">
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
            <View>
                {
                    sub && sub.length > 0 ? (
                        sub.map(item => {
                            return (
                                <View
                                    className="children-item"
                                    key={formatDate(item.modifyOn, 'yyyy年MM月dd日 hh:mm')}
                                    onClick={handleChildrenClick.bind(this, messageId, item)}
                                >
                                    <View className="other">
                                        <View className="info">
                                            <Text className="name">{item.author}</Text>
                                        </View>
                                        <View className="content">
                                            <Text>{item.content}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    ) : ''
                }
            </View>
        </View>
    )
}
