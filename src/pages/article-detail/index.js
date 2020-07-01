import Taro, { useState, useEffect } from '@tarojs/taro'
import { post } from '@/util/http'
import { formatDate } from '@/util/utils'
import { View, Text, Image } from '@tarojs/components'
import { AtTag, AtDivider } from 'taro-ui'
import "./index.css"
import Loading from '../../static/images/loading.jpg'



export default function Detail () {
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let article = Taro.getStorageSync(this.$router.params.id)
        if (article) {
            setArticle(JSON.parse(article))
            setLoading(false)
        } else {
            post('/articles/findById', {
                articleId: this.$router.params.id
            }).then(res => {
                setArticle(res.data.data)
                Taro.setStorage({
                    key: this.$router.params.id,
                    data: JSON.stringify(res.data.data)
                })
                setLoading(false)
            })
        }
    }, [])

    return (
        <View className='index'>
            {

                loading ? <Image src={Loading} className="loading"></Image>
                    : (<View>
                        <View className="article">
                            <View className="desc">
                                <Text className="title">{article.title}</Text>
                                <View className="other">
                                    <Text className="date">{formatDate(article.modifyOn, 'yyyy年MM月dd日 hh:mm')}</Text>
                                    <Text className="read-number">阅读数：{Number(article.views) > 999 ? '999+' : article.views}</Text>
                                    <AtTag size='small'>{article.tag}</AtTag>
                                </View>
                            </View>
                            <Image src={article.banner} className="banner"></Image>
                            <View className="content">
                                <wemark md={article.content} link highlight type='wemark' />
                            </View>
                        </View>
                        <View className="footer">
                            <AtDivider content='No More' fontColor='#e7e7e7' lineColor='#e7e7e7' />
                        </View>
                    </View>)
            }
        </View>
    )
}


Detail.config = {
    navigationBarTitleText: '文章详情',
    usingComponents: {
        wemark: '../../wemark/wemark'
    }
}
