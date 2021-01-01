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
            name: 'fapiao-info',
            meta: {
                title: '发票详情',
                roles: ['PermissionAdministrator']
            },
            hidden: true,
        },
        {
            path: 'smart-parsing',
            component: () =>
                import ('@/views/fapiao/smart-parsing'),
            name: 'smart-parsing',
            meta: {
                title: '智能解析',
                roles: ['PermissionAdministrator']
            }
        },
        {
            path: 'smart-info',
            component: () =>
                import ('@/views/fapiao/smart-info'),
            name: 'smart-info',
            meta: {
                title: '解析详情',
                roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
            },
            hidden: true,
        }
    ]
}
export default fapiaoRouter