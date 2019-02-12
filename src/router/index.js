import Vue from 'vue'
import Router from 'vue-router'
// @就是src的目录
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [  //路由的匹配规则
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
