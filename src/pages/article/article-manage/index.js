import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.css'

export default () => {

    let toArticleList = () => {
        Taro.navigateTo({
            url: '/pages/article/article-list/index'
        })
    }

    let toAddArticle = () => {
        Taro.navigateTo({
            url: '/pages/article/article-add/index'
        })
    }

    return (
        <View>
            <AtButton type='secondary' className="list" onClick={toArticleList}>文章列表</AtButton>
            <AtButton type='secondary' className="add" onClick={toAddArticle}>添加文章</AtButton>
        </View>
    )
}
