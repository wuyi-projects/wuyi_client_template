import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import userRouter from './modules/user'
import permissionRouter from './modules/permission'
import oaRouter from './modules/oa'
import taskRouter from './modules/task'
import newsRouter from './modules/news'
import configRouter from './modules/config'
import fileRouter from './modules/file'
import fapiaoRouter from './modules/fapiao'
import calendarRouter from './modules/calendar'
import companyRouter from './modules/company'
import wechatMiniprogramConfigRouter from './modules/wechat-miniprogram-config'
import profileRouter from './modules/profile'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        //   path: '/',
        //   component: Layout,
        //   redirect: '/dashboard',
        //   children: [{
        //     path: 'dashboard',
        //     name: 'Dashboard',
        //     component: () =>
        //       import ('@/views/dashboard/index'),
        //     meta: { title: '首页', icon: 'dashboard' }
        //   }

        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/home/home'),
            meta: { title: '首页', icon: 'me' }
        }]
    }
]


export const asyncRoutes = [
    taskRouter,
    newsRouter,
    oaRouter,
    userRouter,
    configRouter,
    fileRouter,
    fapiaoRouter,
    permissionRouter,
    calendarRouter,
    companyRouter,
    wechatMiniprogramConfigRouter,
    profileRouter,
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