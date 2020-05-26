/* 引入dayjs */
import Vue from 'vue'
import dayjs from 'dayjs' // ES 2015
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')//全局使用


Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})









// console.log(dayjs(Date.now()).format('YYYY-MM-DD'));
