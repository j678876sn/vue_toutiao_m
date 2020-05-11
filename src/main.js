import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
// 加载全局样式
import './style/index.less'


Vue.config.productionTip = false

// 挂载vant组件库
Vue.use(Vant);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
