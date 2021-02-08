import Layout from '@/layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  meta: {
    title: '基础设置',
    icon: 'setting2',
    roles: ['PermissionConfigAdministrator']
  },
  children: [
    {
      path: 'permission-group-info',
      component: () => import('@/views/permission/permission-group-info'),
      name: 'permission-group-info',
      meta: { title: '分组设置', roles: ['PermissionConfigAdministrator'] }
    },
    {
      path: 'permission',
      component: () => import('@/views/permission/permission'),
      name: 'permission',
      meta: { title: '权限设置', roles: ['PermissionConfigAdministrator'] }
    },
    {
      path: 'role',
      component: () => import('@/views/permission/role'),
      name: 'role',
      meta: { title: '角色权限管理', roles: ['PermissionConfigAdministrator'] }
    },
    {
      path: 'post-role',
      component: () => import('@/views/permission/post-role'),
      name: 'post-role',
      meta: {
        title: '岗位角色分配',
        roles: [
          'PermissionConfigAdministrator',
          'PermissionAssignmentAdministrator'
        ]
      }
    },
    {
      path: 'login-log',
      component: () => import('@/views/setting/login-log'),
      name: 'login-log',
      meta: { title: '系统登录日志', roles: ['PermissionConfigAdministrator'] }
    },
    {
      path: 'operate-log',
      component: () => import('@/views/setting/operate-log'),
      name: 'operate-log',
      meta: { title: '重要操作日志', roles: ['PermissionConfigAdministrator'] },
      hidden: true
    }
  ]
}
export default settingRouter
