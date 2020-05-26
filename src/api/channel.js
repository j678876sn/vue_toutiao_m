/* 频道请求模块 */

import request from '@/utils/request.js'

// 封装所有频道请求方法
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels',
    })
}


// 封装用户频道请求方法
export const addUserChannels = (channel) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}


// 封装删除指定用户频道请求方法
export const removeUserChannels = (channelID) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelID}`,

    })
}