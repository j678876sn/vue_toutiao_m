// 请求模块
import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/',//接口的基础路径
    // baseURL: 'http://api-toutiao-web.itheima.net/',
    transformResponse: [function (data) {
        try {
            return jsonBig.parse(data)
        }
        catch (err) {
            return data
        }
    }]
})
// 请求拦截器
request.interceptors.request.use(function (config) {
    // 请求发起后会经过这里
    // config:本次请求配置对象

    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, function (err) {
    return Promise.reject(error)
})

// 响应拦截器

export default request