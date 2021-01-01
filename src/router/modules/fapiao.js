import Layout from '@/layout'

const fapiaoRouter = {
    path: '/fapiao',
    component: Layout,
    meta: {
        title: '发票管理',
        icon: 'fapiao',
        roles: ['PermissionAdministrator', 'BusinessAdmistrator']
    },
    children: [{
            path: 'fapiao-management',
            component: () =>
                import ('@/views/fapiao/fapiao-management'),
            name: 'fapiao-management',
            meta: { title: '发票管理', roles: ['PermissionAdministrator'] }
        },
        {
            path: 'fapiao-info',
            component: () =>
                import ('@/views/fapiao/fapiao-info'),
            name: 'fapiaoinfo',
            meta: {
                title: '发票详情',
                roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
            }
        }
    ]
}
export default fapiaoRouter