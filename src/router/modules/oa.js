import Layout from '@/layout'

const oaRouter = {
  path: '/oa',
  component: Layout,
  meta: {
    title: '组织架构',
    icon: 'organization3',
    roles: ['PermissionAdministrator', 'HumanAdministrator']
  },
  children: [
    {
      path: 'department',
      component: () => import('@/views/oa/department'),
      name: 'department',
      meta: { title: '部门管理', roles: ['PermissionAdministrator', 'HumanAdministrator'] }
    },
    {
      path: 'post',
      component: () => import('@/views/oa/post'),
      name: 'post',
      meta: { title: '岗位配置', roles: ['PermissionAdministrator', 'HumanAdministrator'] }
    },
    {
      path: 'person',
      component: () => import('@/views/oa/person'),
      name: 'person',
      meta: { title: '人员管理', roles: ['PermissionAdministrator', 'HumanAdministrator'] }
    }
  ]
}
export default oaRouter
