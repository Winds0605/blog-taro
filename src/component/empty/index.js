import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import empty from '../../static/images/empty.png'
import './index.css'

export default () => {
    return (
        <View className="empty_container">
            <Image src={empty} className="empty" />
        </View>
    )
}
