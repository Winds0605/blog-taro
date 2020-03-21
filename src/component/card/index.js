import Taro, { useState } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtTag, AtButton } from 'taro-ui'
import './index.css'


export default ({ title, date, views, tag, desc, banner, articleId }) => {

    const [id, setId] = useState(articleId)

    const handleDeleteArticle = () => {
        console.log(id)
    }

    return (
        <View className="article">
            <Image src={banner} className="banner"></Image>
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
                <Button className="delete" onClick={handleDeleteArticle}>删除</Button>
            </View>
        </View>
    )
}
