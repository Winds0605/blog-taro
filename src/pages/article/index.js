import Taro, { useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { post, get } from '../../util/http'
import { formatDate } from '../../util/utils'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import Card from '../../component/card/index'
// import CardList from '../../component/card-list/index'
import './index.css'

// class CardList extends Taro.Component {

//     constructor(props) {
//         super(props)
//         console.log(props)
//     }

//     render () {
//         return (
//             <View>
//                 2131
//             </View>
//         )
//     }
// }


export default function Article () {

    const [article, setArticle] = useState([])
    const [displayArticle, setDisplayArticle] = useState([])
    const [catelog, setCatelog] = useState({})
    const [tab, setTab] = useState('全部')
    const [tag, setTag] = useState([])
    const [test, setTest] = useState([])
    const [search, setSearch] = useState('')

    let handleChange = (value) => {
        setSearch(value)
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return value
    }

    let handleSearch = () => {
        setDisplayArticle(
            article.filter(value => {
                return value.title.indexOf(search) !== -1
            })
        )
    }

    let handleClear = () => {
        setDisplayArticle(
            article
        )
        setSearch('')
    }

    let handleClick = (value) => {
        console.log(value)
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
            setTest(["全部", ...res.data.data[0].tags])
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
                    tabList={tag}
                    onClick={handleClick} >
                    {

                        test.map((value, index) =>
                            < AtTabsPane current={value} index={index} key={value}>
                                <View>
                                    {/* {value} */}
                                    {
                                        value === "全部" ? (
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
                                                catelog[value] ? (catelog[value].map(item => {
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
                                                })) : <View>无数据{value}</View>
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
