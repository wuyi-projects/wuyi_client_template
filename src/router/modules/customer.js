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
      path: 'customer-info-edit',
      component: () =>
        import ('@/views/customer/customer-info-edit'),
      name: 'customer-info-edit',
      meta: { title: '客户信息录入', roles: ['PermissionConfigAdministrator'] },
      hidden: true
    },
    {
      path: 'body-data-edit',
      component: () =>
        import ('@/views/customer/body-data-edit'),
      name: 'body-data-edit',
      meta: { title: '体型信息录入', roles: ['PermissionConfigAdministrator'] },
      hidden: true
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
      path: 'customer-detail',
      component: () =>
        import ('@/views/customer/customer-detail'),
      name: 'customer-detail',
      meta: { title: '客户信息', roles: ['PermissionConfigAdministrator'] },
      hidden: true
    }
  ]
}
export default customerRouter
