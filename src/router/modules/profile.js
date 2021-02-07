import Layout from '@/layout'

const profileRouter = {
    path: '/profile',
    component: Layout,
    meta: {
        title: '用户配置',
        icon: 'index',
        roles: ['PermissionConfigAdministrator']
    },
    children: [{
        path: 'profile-index',
        component: () =>
            import ('@/views/profile/index'),
        name: 'profile-index',
        meta: { title: '个人中心', roles: ['PermissionConfigAdministrator'] }
    }]
}
export default profileRouter