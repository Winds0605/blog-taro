import Taro, { useState } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtTag, AtButton } from 'taro-ui'
import './index.css'


export default ({ title, date, views, tag, desc, banner, articleId, handleClick }) => {

    const [id, setId] = useState(articleId)

    const handleDeleteArticle = () => {
        console.log(id)
    }

    return (
        <View className="article" onClick={handleClick}>
            <View className="banner">
                <Image src={banner} className="img"></Image>
            </View>
            <View className="article-container">
                <Text className="title">{title}</Text>
                <View className="other">
                    <Text className="date">{date}</Text>
                    <Text className="read-number">阅读数：{views}</Text>
                    <AtTag size='small'>{tag}</AtTag>
                </View>
                <Text className="desc">
                    {desc}
                </Text>
            </View>
        </View>
    )
}
