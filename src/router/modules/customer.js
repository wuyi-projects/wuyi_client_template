import Layout from '@/layout'

const customerRouter = {
  path: '/customer',
  component: Layout,
  meta: {
    title: '客户信息',
    icon: 'tree',
    roles: ['PermissionConfigAdministrator']
  },
  children: [
    {
      path: 'customer-basic-info',
      component: () =>
        import ('@/views/customer/customer-basic-info'),
      name: 'customer-basic-info',
      meta: { title: '客户信息管理', roles: ['PermissionConfigAdministrator'] }
    },
    {
      path: 'body-data-record',
      component: () =>
        import ('@/views/customer/body-data-record'),
      name: 'body-data-record',
      meta: { title: '体型数据', roles: ['PermissionConfigAdministrator'] }
    },
    {
      path: 'service-evaluation',
      component: () =>
        import ('@/views/customer/service-evaluation'),
      name: 'service-evaluation',
      meta: { title: '服务评价', roles: ['PermissionConfigAdministrator'] }
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
