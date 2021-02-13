import Layout from '@/layout'

const customerRouter = {
  path: '/customer',
  component: Layout,
  meta: {
    title: '客户信息',
    icon: 'tree',
    roles: ['PermissionConfigAdministrator', 'SuperAdministrator', 'RegionalManager', 'BusinessAdmistrator', 'ServiceSupplier']
  },
  children: [
    {
      path: 'customer-basic-info',
      component: () => import('@/views/customer/customer-basic-info'),
      name: 'customer-basic-info',
      meta: { title: '客户信息管理', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] }
    },
    {
      path: 'custom-customer-info',
      component: () => import('@/views/customer/custom-customer-info'),
      name: 'custom-customer-info',
      meta: { title: '我的服务客户', roles: ['ServiceSupplier'] }
    },
    {
      path: 'service-evaluation',
      component: () => import('@/views/customer/service-evaluation'),
      name: 'service-evaluation',
      meta: { title: '客户服务记录', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] }
    },
    {
      path: 'my-service-evaluation',
      component: () => import('@/views/customer/my-service-evaluation'),
      name: 'my-service-evaluation',
      meta: { title: '我的服务记录', roles: ['ServiceSupplier'] }
    },
    {
      path: 'my-customer-info',
      component: () => import('@/views/customer/my-customer-info'),
      name: 'my-customer-info',
      meta: { title: '我的关联客户', roles: ['BusinessAdmistrator'] }
    },
    {
      path: 'owner-customer-info',
      component: () => import('@/views/customer/owner-customer-info'),
      name: 'owner-customer-info',
      meta: { title: '我的区域客户', roles: ['RegionalManager'] }
    },
    {
      path: 'customer-info-edit',
      component: () => import('@/views/customer/customer-info-edit'),
      name: 'customer-info-edit',
      meta: { title: '客户信息录入', roles: ['PermissionConfigAdministrator', 'SuperAdministrator', 'RegionalManager', 'BusinessAdmistrator'] },
      hidden: true
    },
    {
      path: 'body-data-edit',
      component: () => import('@/views/customer/body-data-edit'),
      name: 'body-data-edit',
      meta: { title: '体型信息录入', roles: ['PermissionConfigAdministrator', 'SuperAdministrator', 'RegionalManager', 'BusinessAdmistrator'] },
      hidden: true
    },
    {
      path: 'body-data-record',
      component: () => import('@/views/customer/body-data-record'),
      name: 'body-data-record',
      meta: { title: '体型数据', roles: ['PermissionConfigAdministrator'] }
    },
    {
      path: 'customer-detail',
      component: () => import('@/views/customer/customer-detail'),
      name: 'customer-detail',
      meta: { title: '客户信息', roles: ['PermissionConfigAdministrator', 'SuperAdministrator', 'RegionalManager', 'BusinessAdmistrator'] },
      hidden: true
    }
  ]
}
export default customerRouter
