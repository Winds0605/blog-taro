import Taro, { useEffect, useState, useReachBottom } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { get } from '@/util/http'
import { formatDate, debounce } from '@/util/utils'
import { AtSearchBar, AtTabs, AtTabsPane, AtToast, AtInput } from 'taro-ui'
import Card from '@/component/card'
import Empty from '@/component/empty'
import './index.css'



export default function Article () {

    const [article, setArticle] = useState([])
    const [displayArticle, setDisplayArticle] = useState([])
    const [showToast, setShowToast] = useState(false)
    const [tab, setTab] = useState(0)
    const [lastDisplayArticleList, setLastDisplayArticleList] = useState([])
    const [tag, setTag] = useState([])
    const [search, setSearch] = useState('')

    // 搜索框变化事件
    let handleChange = (value) => {
        setSearch(value)
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return value
    }
    let toDetail = (item) => {
        Taro.navigateTo({
            url: `/pages/article-detail/index?id=${item.articleId}`,
        })
    }

    let handleSearch = () => {
        setLastDisplayArticleList(displayArticle)
        setDisplayArticle(displayArticle.filter(value => value.title.indexOf(search) !== -1))
    }

    // 清空搜索
    let handleClear = () => {
        if (lastDisplayArticleList.length === 0) {
            setSearch('')
            return
        }
        setDisplayArticle(lastDisplayArticleList)
        setSearch('')
    }

    // tab切换点击事件
    let handleClick = (value) => {
        if (value === 0) {
            setDisplayArticle(article)
        } else {
            const current = tag[value].title
            setDisplayArticle(article.filter(value => value.tag === current))
        }
        setTab(value)
    }


    // 提示框关闭回调
    let toastClose = () => {
        setShowToast(false)
    }

    useReachBottom(() => {
        setShowToast(true)
    })



    useEffect(() => {
        const articles = Taro.getStorageSync("articles")
        console.log(articles)
        if (articles) {
            setArticle(articles)
            setDisplayArticle(articles)
        } else {
            get('/articles/findAll').then(res => {
                setArticle(res.data.data)
                setDisplayArticle(res.data.data)
            })
        }
        get('/tags/articleTagsfindAll').then(res => {
            let result = [{ title: '全部' }, ...res.data.data.map(value => ({ title: value.type }))]
            setTag(result)
        })
    }, [])
    return (
        <View>
            <AtSearchBar
                fixed={true}
                value={search}
                onClear={handleClear}
                onActionClick={handleSearch}
                onChange={handleChange}
            />
            <View className="tab">
                <AtTabs
                    current={tab}
                    scroll
                    animated={true}
                    tabList={tag}
                    onClick={handleClick} >
                    {

                        tag.map((value, index) =>
                            < AtTabsPane current={index} index={index} key={value.title} className="tabs-pane">
                                <View>
                                    {
                                        displayArticle && displayArticle.length > 0 ? displayArticle.map(item => {
                                            return (
                                                <Card
                                                    handleClick={toDetail.bind(this, item)}
                                                    key={item.modifyOn}
                                                    articleId={item.articleId}
                                                    banner={item.banner}
                                                    title={item.title}
                                                    date={formatDate(item.modifyOn, 'yyyy-MM-dd')}
                                                    views={item.views}
                                                    tag={item.tag}
                                                    desc={item.desc} />
                                            )
                                        }) : <Empty />
                                    }
                                </View>
                            </AtTabsPane>
                        )
                    }
                </AtTabs>
            </View>
            <AtToast isOpened={showToast} duration={3000} text="没有更多了..." onClose={toastClose} />
        </View >
    )
}

Article.config = {
    navigationBarTitleText: '文章列表'
}
