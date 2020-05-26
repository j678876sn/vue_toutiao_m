/* 搜索请求 */

import request from '@/utils/request.js'

// 获取联想搜索
export const getSearchText = (q) => {
    return request({
        methods: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}


// 获取搜索结果
export const getSearchResults = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params
    })
}



