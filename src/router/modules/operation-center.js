import Layout from '@/layout'

const operationCenterRouter = {
  path: '/operation-center',
  component: Layout,
  meta: {
    title: '运营中心',
    icon: 'setting2',
    roles: ['PermissionConfigAdministrator', 'SuperAdministrator', 'PermissionAssignmentAdministrator']
  },
  children: [
    {
      path: 'system-login-log',
      component: () =>
        import ('@/views/operation-center/login-log'),
      name: 'system-login-log',
      meta: { title: '用户登录日志', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] }
    },
    {
      path: 'permission-importance',
      component: () =>
        import ('@/views/operation-center/permission-importance'),
      name: 'permission-importance',
      meta: { title: '用户操作日志', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] }
    }]
}
export default operationCenterRouter
