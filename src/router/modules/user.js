import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  meta: {
    title: '账户管理',
    icon: 'account',
    roles: ['PermissionAdministrator', 'SuperAdministrator', 'UserAdministrator']
  },
  children: [
    {
      path: 'account',
      component: () => import('@/views/user/account'),
      name: 'account',
      meta: { title: '用户管理', roles: ['PermissionAdministrator', 'SuperAdministrator', 'UserAdministrator'] }
    },
    {
      path: 'miniprogram-account',
      component: () => import('@/views/user/miniprogram-account'),
      name: 'miniprogram-account',
      meta: { title: '微信小程序账户管理', roles: ['PermissionAdministrator', 'SuperAdministrator', 'UserAdministrator'] }
    }
  ]
}
export default userRouter
