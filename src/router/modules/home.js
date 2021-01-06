import Layout from '@/layout'

const homeRouter = {
    path: '/home',
    component: Layout,
    meta: {
        title: '我的',
        icon: 'me',
        roles: ['PermissionAdministrator', 'BusinessAdmistrator']
    },
    children: [{
        path: 'home',
        component: () =>
            import ('@/views/home/home'),
        name: 'home',
        meta: { title: '我的页面', roles: ['PermissionAdministrator'] }
    }]
}
export default homeRouter