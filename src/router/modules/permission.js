import Layout from '@/layout'

const permissionRouter = {
  path: '/permission',
  component: Layout,
  meta: {
    title: '基础设置',
    icon: 'setting2',
    roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
  },
  children: [
    {
      path: 'permission-group-info',
      component: () => import('@/views/permission/permission-group-info'),
      name: 'permission-group-info',
      meta: { title: '分组设置', roles: ['PermissionAdministrator'] }
    },
    {
      path: 'permission',
      component: () => import('@/views/permission/permission'),
      name: 'permission',
      meta: { title: '权限设置', roles: ['PermissionAdministrator'] }
    },
    {
      path: 'role',
      component: () => import('@/views/permission/role'),
      name: 'role',
      meta: { title: '角色权限管理', roles: ['PermissionAdministrator'] }
    },
    {
      path: 'post-role',
      component: () => import('@/views/permission/post-role'),
      name: 'role',
      meta: { title: '岗位角色分配', roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator'] }
    }
  ]
}
export default permissionRouter
