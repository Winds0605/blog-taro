import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Card from '../card/index'
import 'taro-ui/dist/style/index.scss'


export default ({ data }) => {

    return (
        <View>
            {
                data.map(value => {
                    return (
                        <Card
                            key={value.modifyOn}
                            articleId={value.articleId}
                            banner={value.banner}
                            title={value.title}
                            date={formatDate(value.modifyOn, 'yyyy-MM-dd')}
                            views={value.views}
                            tag={value.tag}
                            desc={value.desc} />
                    )
                })
            }
        </View>

    )
}
