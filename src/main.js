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
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss'){
  return  moment(dataStr).format(pattern)
})

//全局注册组件
import comment from './components/comment.vue'
Vue.component('comment',comment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
