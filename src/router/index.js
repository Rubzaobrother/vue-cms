import Vue from 'vue'
import Router from 'vue-router'
// @就是src的目录
// import HelloWorld from '@/components/HelloWorld'
import homeComponent from '../pages/home'
import memberComponent from '../pages/member'
import searchComponent from '../pages/search'
import shopcarComponent from '../pages/shopcar'


Vue.use(Router)

export default new Router({
  routes: [  //路由的匹配规则
    { path: '/home', component: homeComponent},
    { path: '/member', component: memberComponent},
    { path: '/search', component: searchComponent},
    { path: '/shopcar', component: shopcarComponent},
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ],
  linkActiveClass:'mui-active'
})
