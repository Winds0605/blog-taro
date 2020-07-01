import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Picker, Text, RichText } from '@tarojs/components'
import { AtInput, AtForm, AtImagePicker, AtTextarea } from 'taro-ui'
import { post } from '@/util/http'
import './index.css'

const state = {
    nodes: [{
        name: 'div',
        attrs: {
            class: 'div_class',
            style: 'line-height: 60px; color: red;'
        },
        children: [{
            type: 'text',
            text: 'Hello World!'
        }]
    }]
}

export default () => {
    const [articleInfo, setArticleInfo] = useState({
        title: '',
        tag: '请选择文章类型',
        image: '',
        content: '',
    })
    const [range, setRange] = useState([])

    let loadSelect = () => {
        post('/tags/findAll').then(res => {
            setRange(res.data.data[0].tags)
        })
    }

    let tagSelectChange = (e) => {
        setArticleInfo({
            ...articleInfo,
            tag: range[e.detail.value]
        })
    }

    let handleContentChange = (value) => {
        setArticleInfo({
            ...articleInfo,
            content: value
        })
    }

    let test = () => {
        Taro.navigateTo({
            url: '/pages/outer/index'
        })
    }

    let imageChange = (e) => {
        console.log(e)
    }

    useEffect(() => {
        loadSelect()
    }, [])

    return (
        <View>
            <AtForm className="article_form">
                <AtInput
                    name='title'
                    title='文章标题：'
                    type='text'
                    placeholder='请输入文章标题'
                    value={articleInfo.title}
                    onChange={tagSelectChange}
                    className="title"
                />
                <Picker mode='selector' range={range} onChange={tagSelectChange}>
                    <View className='picker'>
                        <Text className="tip">文章类型：</Text><Text className="select">{articleInfo.tag}</Text>
                    </View>
                </Picker>
                <Text className="image_tip">请上传文章封面</Text>
                <AtImagePicker
                    files={this.state.files}
                    onChange={imageChange}
                    className="image"
                />
                <Text className="content_tip" onClick={test}>请输入文章内容</Text>
                <AtTextarea
                    value={articleInfo.content}
                    onChange={handleContentChange}
                    height={400}
                    placeholder='你的问题是...'
                />
            </AtForm>
        </View>
    )
}
