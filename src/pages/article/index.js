import Taro, { useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { post, get } from '../../util/http'
import { formatDate, deepClone } from '../../util/utils'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import Card from '../../component/card/index'
import Empty from '../../component/empty/index'
import './index.css'



export default function Article () {

    const [article, setArticle] = useState([])
    const [displayArticle, setDisplayArticle] = useState([])
    const [catelog, setCatelog] = useState({})
    const [tempCatelog, setTempCatelog] = useState({})
    const [tab, setTab] = useState(0)
    const [tag, setTag] = useState([])
    const [search, setSearch] = useState('')

    // 搜索框变化事件
    let handleChange = (value) => {
        setSearch(value)
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return value
    }

    let handleSearch = () => {

        if (tab !== 0) {
            // 其他标签数据搜索处理
            let name = tag[tab].title
            let searchArr = catelog[name].filter(value => {
                return value.title.indexOf(search) !== -1
            })
            let cloneCatelog = deepClone(catelog)
            cloneCatelog[name] = searchArr
            setCatelog(cloneCatelog)
        } else {
            // 全部标签数据处理
            setDisplayArticle(article.filter(value => {
                return value.title.indexOf(search) !== -1
            }))
        }

    }

    // 清空搜索
    let handleClear = () => {
        setDisplayArticle(article)
        setCatelog(tempCatelog)
        setSearch('')
    }

    // tab切换点击事件
    let handleClick = (value) => {
        setTab(value)
    }

    useEffect(() => {
        let arr = {}
        get('/articles/findAll').then(res => {
            setArticle(res.data.data)
            setDisplayArticle(res.data.data)
        })
        post('/tags/findAll').then(res => {
            let result = [{ title: "全部" }]
            res.data.data[0].tags.forEach(value => {
                result.push({
                    title: value
                })
                arr[value] = []
            })
            setTag(result)
            return get('/articles/findAll')
        }).then(res => {
            res.data.data.forEach(value => {
                Object.keys(arr).forEach(key => {
                    if (value.tag === key) {
                        arr[key].push(value)
                    }
                })
            })
            setTempCatelog(arr)
            setCatelog(arr)
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
                    animated={false}
                    tabList={tag}
                    onClick={handleClick} >
                    {

                        tag.map((value, index) =>
                            < AtTabsPane current={index} index={index} key={value.title}>
                                <View>
                                    {/* {value} */}
                                    {
                                        value.title === "全部" ? (
                                            displayArticle.map(item => {
                                                return (
                                                    <Card
                                                        key={item.modifyOn}
                                                        articleId={item.articleId}
                                                        banner={item.banner}
                                                        title={item.title}
                                                        date={formatDate(item.modifyOn, 'yyyy-MM-dd')}
                                                        views={item.views}
                                                        tag={item.tag}
                                                        desc={item.desc} />
                                                )
                                            })
                                        ) : (
                                                catelog[value.title] && catelog[value.title].length ? (catelog[value.title].map(item => {
                                                    return (
                                                        <Card
                                                            key={item.modifyOn}
                                                            articleId={item.articleId}
                                                            banner={item.banner}
                                                            title={item.title}
                                                            date={formatDate(item.modifyOn, 'yyyy-MM-dd')}
                                                            views={item.views}
                                                            tag={item.tag}
                                                            desc={item.desc} />
                                                    )
                                                })) : <Empty />
                                            )
                                    }
                                </View>
                            </AtTabsPane>
                        )
                    }
                </AtTabs>
            </View>
        </View >
    )
}
