import Layout from '@/layout'

const lotteryRouter = {
  path: '/lottery',
  component: Layout,
  meta: {
    title: '抽奖管理',
    icon: 'tree',
    roles: ['PermissionConfigAdministrator']
  },
  children: [
    {
      path: 'sign-up-info',
      component: () =>
        import ('@/views/signup/sign-up-info'),
      name: 'sign-up-info',
      meta: { title: '签到信息', roles: ['PermissionConfigAdministrator'] }
    },
    {
      path: 'sign-up-record',
      component: () =>
        import ('@/views/signup/sign-up-record'),
      name: 'sign-up-record',
      meta: { title: '签到记录', roles: ['PermissionConfigAdministrator'] },
      hidden: true
    },
    {
      path: 'lottery-info',
      component: () =>
        import ('@/views/lottery/lottery-info'),
      name: 'lottery-info',
      meta: { title: '抽奖信息', roles: ['PermissionConfigAdministrator'] }
    },
    {
      path: 'lottery-record',
      component: () =>
        import ('@/views/lottery/lottery-record'),
      name: 'lottery-record',
      meta: { title: '抽奖记录', roles: ['PermissionConfigAdministrator'] }
    },
    {
      path: 'lottery-roster',
      component: () =>
        import ('@/views/lottery/lottery-roster'),
      name: 'lottery-roster',
      meta: { title: '抽奖人员名单', roles: ['PermissionConfigAdministrator'] }
    }
  ]
}
export default lotteryRouter
