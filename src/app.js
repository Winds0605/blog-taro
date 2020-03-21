import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.css'
import 'taro-ui/dist/style/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      "pages/article/index",
      "pages/movie/index",
      "pages/other/index",
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#8D9CAA",
      selectedColor: "#222222",
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "static/images/iconindexnor1.png",
        selectedIconPath: "static/images/iconindexsel1.png"
      }, {
        pagePath: "pages/article/index",
        text: "文章管理",
        iconPath: "static/images/article-line.png",
        selectedIconPath: "static/images/article-fill.png"
      }, {
        pagePath: "pages/movie/index",
        text: "电影管理",
        iconPath: "static/images/movie-line.png",
        selectedIconPath: "static/images/movie-fill.png"
      }, {
        pagePath: "pages/other/index",
        text: "其他管理",
        iconPath: "static/images/qita.png",
        selectedIconPath: "static/images/qita_1.png"
      }],
    }
  }

  componentDidMount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidCatchError () { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
