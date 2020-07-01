import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { useEffect, useState } from '@tarojs/taro'
import { formatDate } from '@/util/utils'
import { get } from '@/util/http'
import { AtDivider } from 'taro-ui'
import './index.css'

export default function Index () {
  const [movies, setMovies] = useState([])
  const [articles, setArticle] = useState([])
  const imgList = [
    require('../../static/images/index1.png'),
    require('../../static/images/index2.png'),
    require('../../static/images/index3.png'),
    require('../../static/images/index4.png'),
  ]

  let toDetail = (item) => {
    Taro.navigateTo({
      url: `/pages/article-detail/index?id=${item.articleId}`,
    })
  }

  let fetchData = () => {
    Promise.all([
      get('/movies/findAll'),
      get('/articles/findAll')
    ]).then(res => {
      const [movies, articles] = res
      Taro.setStorage({
        key: "movies",
        data: movies.data.data
      })
      Taro.setStorage({
        key: "articles",
        data: articles.data.data
      })
      setMovies(movies.data.data.slice(0, 10))
      setArticle(articles.data.data.slice(0, 3))
    }).catch(err => {
      throw err
    })
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <View className='index'>
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        className="swiper"
        indicatorDots
        autoplay>
        {
          imgList.map(value => {
            return (
              <SwiperItem key={value}>
                <Image src={value} className="swiper-img"></Image>
              </SwiperItem>
            )
          })
        }
      </Swiper>
      <View className="desc">
        <View className="desc-item">
          <Text className="title1">Hey There, I'm Zephyr,</Text>
          <Text className="title2">based in FuJian, China.😬</Text>
        </View>
        <View className="desc-item">
          <Text className="title1">A Front-end Web Developer.</Text>
          <Text className="title2">And still growing.😉</Text>
        </View>
        <View className="desc-item">
          <Text className="title1">Interested in photography</Text>
          <Text className="title2">I hope to take photos that everyone likes.😝</Text>
        </View>
      </View>
      <View className="articles">
        <AtDivider>
          最新文章
        </AtDivider>
        <ScrollView className="article-container" scrollX>
          {
            articles.map(item => {
              return (
                <View className="articles-item" key={item.articleId}>
                  <View className="info">
                    <Text className="type">{item.tag}</Text>
                    <Text className="time">{formatDate(item.modifyOn, 'yyyy年MM月dd日 hh:mm')}</Text>
                  </View>
                  <Text className="title">{item.title}</Text>
                  <Image src={item.banner} className="banner" />
                  <Text className="desc">{item.desc}</Text>
                  <Text className="other" onClick={toDetail.bind(this, item)}>- 阅读全文 -</Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
      <View className="movies">
        <AtDivider>
          最新电影
        </AtDivider>
        <ScrollView className="movie-container" scrollX>
          {
            movies.map(item => {
              return (
                <View key={item.movieId} className="movie-item">
                  <Image src={item.image} className="banner" />
                  <Text className="name">{item.name}</Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '风走了以后',
}
