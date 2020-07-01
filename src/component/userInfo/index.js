import Taro, { Component, useState, useEffect } from "@tarojs/taro"
import { View, Button, Image } from "@tarojs/components"


export default () => {
    const [btnText, setBtnText] = useState('微信授权登录')
    const [oauthBtnStatus, setOauthBtnStatus] = useState(true)

    // 获取用户授权结果
    const getOauthStatus = () => {
        Taro.getSetting().then(res => {
            if (Object.keys(res.authSetting).length === 0 || !res.authSetting['scope.userInfo']) {
                // 用户信息无授权
                console.log(res.authSetting)
                console.log('用户无授权信息')
            } else {
                // 用户允许授权获取用户信息
                // 隐藏授权按钮
                setOauthBtnStatus(false)
                // 获取用户信息
                getUserInfo()
            }
        }).catch(err => console.log(err))
    }

    // 获取用户信息
    const getUserInfo = () => {
        Taro.getUserInfo({
            lang: 'zh_CN'
        }).then(res => { // 获取成功
            Taro.setStorage({
                key: 'userInfo',
                data: res.userInfo
            })
        }).catch(err => console.log(err))
    }

    // 用户授权操作后按钮回调
    const onGotUserInfo = res => {
        if (res.detail.userInfo) {
            // 返回的信息中包含用户信息则证明用户允许获取信息授权
            setOauthBtnStatus(false)
            Taro.setStorage({
                key: 'userInfo',
                data: res.detail.userInfo
            })
        } else {
            // 用户取消授权，进行提示，促进重新授权
            Taro.showModal({
                title: '温馨提示',
                content: '未授权无法进行留言',
                showCancel: false // 不展示取消按钮
            })
                .then(ModalRes => {
                    if (ModalRes.confirm) { // 点击确定按钮
                        setBtnText('重新授权登录')
                    }
                })
        }
    }
    useEffect(() => {
        getOauthStatus()
    })

    return (
        <View className='login-page'>
            {oauthBtnStatus ? <Button className='login-btn' openType='getUserInfo' onGetUserInfo={onGotUserInfo}>{btnText}</Button> : ''}
        </View>
    )
}
