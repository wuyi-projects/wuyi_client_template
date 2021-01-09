import Layout from '@/layout'

const companyRouter = {
    path: '/company',
    component: Layout,
    meta: {
        title: '公司信息',
        icon: 'tree',
        roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
    },
    children: [{
        path: 'company',
        component: () =>
            import ('@/views/company/company'),
        name: 'company',
        meta: { title: '公司信息', roles: ['PermissionAdministrator'] }
    }, {
        path: 'my-company',
        component: () =>
            import ('@/views/company/my-company'),
        name: 'my-company',
        meta: { title: '我的公司', roles: ['PermissionAdministrator'] }
    }]
}
export default companyRouter