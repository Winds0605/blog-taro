import Taro from '@tarojs/taro'
import { logError } from './utils'
import { baseUrl, HTTP_STATUS } from './config'

function baseOptions (params, method = 'GET') {
    let { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option = {
        isShowLoading: false,
        url: baseUrl + url,
        data: data,
        method: method,
        header: { 'content-type': contentType }, // 默认contentType ,预留token
        success (res) {
            if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
                return logError('api', '请求资源不存在')
            } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
                return logError('api', '服务端出现了问题')
            } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
                return logError('api', '没有权限访问')
            } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
                return res.data
            }
        },
        error (e) {
            logError('api', '请求接口出现问题', e)
        }
    }
    return Taro.request(option)
}

export const get = (url, data = '') => {
    let option = { url, data }
    return baseOptions(option)
}

export const post = (url, data, contentType) => {
    let params = { url, data, contentType }
    return baseOptions(params, 'POST')
}


