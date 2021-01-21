import Layout from '@/layout'

const customerRouter = {
    path: '/customer',
    component: Layout,
    meta: {
        title: '客户基本信息',
        icon: 'tree',
        roles: ['FapiaoUser']
    },
    children: [{
            path: 'customer-info',
            component: () =>
                import ('@/views/customer-info/customer-info'),
            name: 'clientinfo',
            meta: { title: '客户信息录入', roles: ['FapiaoUser'] }
        },
        {
            path: 'bodytype',
            component: () =>
                import ('@/views/customer-info/bodytype'),
            name: 'bodytype',
            meta: { title: '体型信息录入', roles: ['FapiaoUser'] }
        },
        {
            path: 'customer',
            component: () =>
                import ('@/views/customer-info/customer'),
            name: 'customer',
            meta: { title: '客户信息', roles: ['FapiaoUser'] }
        }
    ]
}
export default customerRouter