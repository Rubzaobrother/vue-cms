import Vue from 'vue'
import App from './App'
import router from './router'

import VueResource from 'vue-resource'
Vue.use(VueResource)

// css reset CSS初始化
import './styles/common.css'
//引入mui的css
import './libs/mui/css/mui.css'
//引入mui扩展字体图片
import './libs/mui/css/icons-extra.css'

//设置请求的根路径
Vue.http.options.root = 'http://www.lovegf.cn:8899/api/';

//1.导入mint-ui 和 样式文件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

//2.安装mint-ui(全局注册使用的组件)
Vue.use(Mint)

Vue.config.productionTip = false

import moment from 'moment'

// 定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

//全局注册组件
import comment from './components/comment.vue'
Vue.component('comment', comment)

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//页面刚加载读取, 只要修改数据就保存
let car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {//this.$store.state.***
    car: car
  },
  mutations: {//this.$store.commit('方法名', 唯一的一个参数)
    addToCar(state, goodsInfo) {
      // 1. 即将要加入的商品是否在购物车已存在, 
      // 2. 如果存在只需要更新数量信息即可
      // 3. 如果不存在只需要push进car数组即可
      let flag = false
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item.count += parseInt(goodsInfo.count)
          return flag = true
        }
      })
      if (!flag) {
        state.car.push(goodsInfo)
      }
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {//this.$store.getters.***
    totalCount(state){
      let sum = 0;
      state.car.forEach(item =>{
        sum += item.count
      })
      return sum
    }
  }
})

//轮播图组件
import swiper from './components/swiper.vue'
Vue.component('swiper', swiper)


// 安装vue-pic-preview
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
