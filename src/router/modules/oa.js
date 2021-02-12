import Layout from '@/layout'

const oaRouter = {
  path: '/oa',
  component: Layout,
  meta: {
    title: '组织架构',
    icon: 'organization3',
    roles: ['PermissionConfigAdministrator', 'HumanAdministrator']
  },
  children: [
    {
      path: 'regional',
      component: () => import('@/views/regional/regional'),
      name: 'regional',
      meta: { title: '区域管理', roles: ['PermissionConfigAdministrator', 'HumanAdministrator'] }
    },
    {
      path: 'department',
      component: () => import('@/views/oa/department'),
      name: 'department',
      meta: { title: '部门管理', roles: ['PermissionConfigAdministrator', 'HumanAdministrator'] }
    },
    {
      path: 'post',
      component: () => import('@/views/oa/post'),
      name: 'post',
      meta: { title: '岗位配置', roles: ['PermissionConfigAdministrator', 'HumanAdministrator'] }
    },
    {
      path: 'person',
      component: () => import('@/views/oa/person'),
      name: 'person',
      meta: { title: '人员管理', roles: ['PermissionConfigAdministrator', 'HumanAdministrator'] }
    },
    {
      path: 'user-regional-manage',
      component: () => import('@/views/regional/user-regional-manage'),
      name: 'user-regional-manage',
      meta: { title: '人员区域管理', roles: ['PermissionConfigAdministrator', 'HumanAdministrator'] },
      hidden: true
    }

  ]
}
export default oaRouter
