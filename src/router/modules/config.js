import Layout from '@/layout'

const configRouter = {
  path: '/config',
  component: Layout,
  meta: {
    title: '产品配置',
    icon: 'setting2',
    roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
  },
  children: [
    {
      path: 'platform-product',
      component: () => import('@/views/config/platform-product'),
      name: 'platform-product',
      meta: { title: '产品信息管理', roles: ['PermissionAdministrator'] }
    }
  ]
}
export default configRouter
