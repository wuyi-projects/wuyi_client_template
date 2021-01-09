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
            path: 'fapiao-audit',
            component: () =>
                import ('@/views/fapiao/fapiao-audit'),
            name: 'fapiao-audit',
            meta: {
                title: '发票审核',
                roles: ['PermissionAdministrator']
            },
            hidden: true
        },
        {
            path: 'fapiao-input',
            component: () =>
                import ('@/views/fapiao/fapiao-input'),
            name: 'fapiao-input',
            meta: {
                title: '发票录入',
                roles: ['PermissionAdministrator']
            },
            hidden: true
        },
        {
            path: 'me-fapiao',
            component: () =>
                import ('@/views/fapiao/me-fapiao'),
            name: 'me-fapiao',
            meta: {
                title: '我的发票',
                roles: ['PermissionAdministrator']
            }
        },
        {
            path: 'fapiaoreview',
            component: () =>
                import ('@/views/fapiao/fapiaoreview'),
            name: 'fapiaoreview',
            meta: {
                title: '待审核发票',
                roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
            }
        }
    ]
}
export default fapiaoRouter