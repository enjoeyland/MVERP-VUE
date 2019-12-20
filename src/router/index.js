import Vue from 'vue';
import Router from 'vue-router';


import Layout from '../layout/Main'
import AdminManagement from '../components/content/AdminManagement';

Vue.use(Router)

export const constantRoutes = [
  {
      path: '/login',
      component: () => import('@/views/login/login'),
      hidden: true
  },
  {
    path:'/',
    redirect:'/login',
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path:'/admin',
    component: Layout,
    meta: {
      title: '행정관리',
      requireAuth: true,
      level:1
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '개인정보',
        meta: {
          title: '개인정보'
        }
      }
    ]
  }
]


export const asyncRoutes = [
  {
    path:'/admin',
    component: Layout,
    meta: {
      title: '행정관리',
      roles: ['S'],
      level:1
    },
    children: [
      {
        name: '직원관리',
        path: "adminManagement",
        component:AdminManagement,
        meta: {
          title: '직원관리',
        }
      }
    ]
  },
  {
    path:'/business',
    component: Layout,
    meta: {
      title: '영업관리',
      roles: ['S','B'],
      level:2
    },
    children: [
      {
        name: '거래처관리',
        path: "contractManagement",
        component:AdminManagement,
        meta: {
          title: '거래처관리',
        }
      }
    ]
  },
]


export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
