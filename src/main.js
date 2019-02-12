import Vue from 'vue'
import App from './App'
import router from './router'

// css reset CSS初始化
import './styles/common.css'
//引入mui的css
import './libs/mui/css/mui.css'

//1.导入mint-ui 和 样式文件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

//2.安装mint-ui(全局注册使用的组件)
Vue.use(Mint)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
