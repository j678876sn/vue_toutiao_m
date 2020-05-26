/* 
    文章请求模块
*/

import request from '@/utils/request.js'
import store from '@/store'
// 封装登录的请求方法
export const getArticleList = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params: params
    })
}


// 获取文章详情
export const getArticleDetails = (articleId) => {
    return request({
        method: 'get',
        url: `/app/v1_0/articles/${articleId}`,
    })
}


/* 收藏文章 */
export const addCollect = (target) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/collections',
        data: {
            target
        }
    })
}

/* 取消收藏 */
export const deleteCollect = (target) => {
    return request({
        method: 'DELETE',
        url: '/app/v1_0/article/collections/' + target,

    })
}

/* 点赞文章 */
export const addLike = (target) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/likings',
        data: {
            target
        }
    })
}

/* 取消点赞 */
export const deleteLike = (target) => {
    return request({
        method: 'DELETE',
        url: '/app/v1_0/article/likings/' + target,

    })
}
