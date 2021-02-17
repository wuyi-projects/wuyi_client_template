import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import userRouter from './modules/user'
import oaRouter from './modules/oa'
import settingRouter from './modules/permission'
// import companyRouter from './modules/company'
import profileRouter from './modules/profile'
import customerRouter from './modules/customer'
import lotteryRouter from './modules/lottery'
import tableRouter from './modules/table'
import operationCenterRouter from './modules/operation-center'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/superdraw',
    component: () => import('@/views/lottery/superdraw'),
    name: 'superdraw',
    meta: { title: '超级大奖', icon: 'dashboard', roles: ['PermissionConfigAdministrator'] },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  }
]

export const asyncRoutes = [
  // companyRouter,
  customerRouter,
  lotteryRouter,
  oaRouter,
  userRouter,
  profileRouter,
  // tableRouter,
  settingRouter,
  operationCenterRouter,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
