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
    car
  },
  mutations: {//this.$store.commit('方法名', 唯一的一个参数)
  addToCar(state, goodsInfo) {
    // 加入购物车的业务逻辑:
    // 1. 即将要加入的商品是否在购物车已存在, 
    // 2. 如果存在只需要更新数量信息即可
    // 3. 如果不存在只需要push进car数组即可

    // 假设法
    // let flag = false
    // state.car.some(item => {
    //   if (item.id === goodsInfo.id) {
    //     item.count += parseInt(goodsInfo.count)
    //     // 当前要加入购物车的商品已存在于car中
    //     return flag = true
    //   }
    // })
    // // false表示没找到  在购物车中没有这个商品信息
    // if (!flag) {
    //   state.car.push(goodsInfo)
    // }

    // some forEach every filter findIndex
    // findIndex的作用是用来根据条件查找索引
    // 如果goodsInfo在car中存在, 就会返回goodsInfo的索引
    // 如果不存在返回-1
    // let index = state.car.findIndex(item => {
    //   if (item.id === goodsInfo.id) {
    //     return true
    //   }
    // })

    // 不使用假设法
    let index = state.car.findIndex(item => item.id === goodsInfo.id)
    if (index === -1) {
      // 表示没找到  不存在于购物车中
      state.car.push(goodsInfo)
    } else {
      // 表示找到了  确实在购物车中已经有该商品了
      state.car[index].count += parseInt(goodsInfo.count)
    }

    localStorage.setItem('car', JSON.stringify(state.car))
  },
    updateCount(state, goodsInfo){
      console.log(goodsInfo.id)
      state.car.some(item=>{
        if(item.id == goodsInfo.id){
          // console.log(item.id, goodsInfo.id);
          item.count = goodsInfo.count
        }
        
      })
      // state.car.some(item =>{
      //   if(item.id === goodsInfo.id){
      //     return true
      //   }
      // })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
  },
  getters: {//this.$store.getters.***
    totalCount(state){
      let sum = 0;
      state.car.forEach(item =>{
        sum += item.count
      })
      return sum
    },
    goodsCount(state){
      let o ={}
      state.car.forEach(item =>{
        o[item.id] = item.count
      })
      return o
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
