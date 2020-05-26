// 加载用户相关的请求功能

import request from '@/utils/request.js'
//引入vuex，获取headers的token数据
import store from '@/store'
// 封装登录的请求方法
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data: data
    })
}

// 封装短信发送的请求方法
export const SenSms = (mobile) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
        mobile: mobile
    })
}


// 封装获取用户信息方法
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user',
        /* headers: {
            Authorization: `Bearer ${store.state.user.token}`
        } */
    })
}


// 封装获取用户频道列表
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels',
    })
}


/* 关注用户 */

export const addFollow = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data: {
            target
        }
    })
}



/* 取消关注 */

export const deleteFollow = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${target}`,
    })
}



/* 获取用户资料 */

export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/profile',
    })
}


/* 编辑用户资料 */

export const updateUserProfile = (data) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/profile',
        data
    })
}


/* 编辑用户照片资料 */

export const updateUserPhoto = (data) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/photo',
        data
    })
}