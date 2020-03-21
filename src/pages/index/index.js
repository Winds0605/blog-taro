import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtGrid, AtIcon, AtTabBar } from "taro-ui"

import './index.css'

export default function Index () {

  const [current, setCurrent] = useState(0)

  let switchTab = (value) => {
    switch (value) {
      case 0:
        Taro.navigateTo({
          url: '/pages/index/index'
        })
        break;
      case 1:
        Taro.switchTab({
          url: '/pages/article/index'
        })
        break;
      case 2:
        Taro.navigateTo({
          url: '/pages/movie/index'
        })
        break;
      case 3:
        Taro.navigateTo({
          url: '/pages/other/index'
        })
        break;
      default:
        Taro.navigateTo({
          url: '/pages/index/index'
        })
        break;
    }
  }
  return (
    <View className='index'>
      <Text>这是首页</Text>
      {/* <AtTabBar
        fixed
        tabList={[
          { title: '首页', iconType: 'home' },
          { title: '文章管理', iconType: 'message' },
          { title: '电影管理', iconType: 'heart' },
          { title: '其他管理', iconType: 'tag' }
        ]}
        onClick={switchTab}
        current={current}
      /> */}
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页'
}
