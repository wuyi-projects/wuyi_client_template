import Layout from '@/layout'

const customerRouter = {
    path: '/customer',
    component: Layout,
    meta: {
        title: '客户基本信息',
        icon: 'tree',
        roles: ['PermissionConfigAdministrator']
    },
    children: [
        {
            path: 'customer-info-manage',
            component: () =>
                import ('@/views/customer-info/customer-info-manage'),
            name: 'customer-info',
            meta: { title: '客户信息管理', roles: ['PermissionConfigAdministrator'] }
        },
        {
            path: 'customer-info',
            component: () =>
                import ('@/views/customer-info/customer-info'),
            name: 'customer-info',
            meta: { title: '客户信息录入', roles: ['PermissionConfigAdministrator'] }
        },
        {
            path: 'bodytype',
            component: () =>
                import ('@/views/customer-info/bodytype'),
            name: 'bodytype',
            meta: { title: '体型信息录入', roles: ['PermissionConfigAdministrator'] }
        },
        {
            path: 'customer',
            component: () =>
                import ('@/views/customer-info/customer'),
            name: 'customer',
            meta: { title: '客户信息', roles: ['PermissionConfigAdministrator'] }
        }
    ]
}
export default customerRouter