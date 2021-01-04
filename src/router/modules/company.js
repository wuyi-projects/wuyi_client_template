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
    }]
}
export default companyRouter