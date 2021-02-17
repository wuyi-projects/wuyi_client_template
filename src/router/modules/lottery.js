import Layout from '@/layout'

const lotteryRouter = {
  path: '/lottery',
  component: Layout,
  meta: {
    title: '抽奖管理',
    icon: 'tree',
    roles: ['PermissionConfigAdministrator', 'SuperAdministrator']
  },
  children: [
    {
      path: 'sign-up-info',
      component: () =>
        import ('@/views/signup/sign-up-info'),
      name: 'sign-up-info',
      meta: { title: '签到信息', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] }
    },
    {
      path: 'sign-up-record',
      component: () =>
        import ('@/views/signup/sign-up-record'),
      name: 'sign-up-record',
      meta: { title: '签到记录', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] },
      hidden: true
    },
    {
      path: 'lottery-info',
      component: () =>
        import ('@/views/lottery/lottery-info'),
      name: 'lottery-info',
      meta: { title: '抽奖信息', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] }
    },
    {
      path: 'lottery-record',
      component: () =>
        import ('@/views/lottery/lottery-record'),
      name: 'lottery-record',
      meta: { title: '抽奖记录', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] },
      hidden: true
    },
    {
      path: 'user-lottery-record',
      component: () =>
        import ('@/views/lottery/user-lottery-record'),
      name: 'user-lottery-record',
      meta: { title: '个人奖券配置', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] },
      hidden: true
    },
    {
      path: 'lottery-use',
      component: () =>
        import ('@/views/lottery/lottery-use'),
      name: 'lottery-use',
      meta: { title: '奖券核销', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] }
    },
    {
      path: 'lottery-record-detail',
      component: () =>
        import ('@/views/lottery/lottery-record-detail'),
      name: 'lottery-record-detail',
      meta: { title: '抽奖记录详情', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] },
      hidden: true
    },
    {
      path: 'lottery-roster',
      component: () =>
        import ('@/views/lottery/lottery-roster'),
      name: 'lottery-roster',
      meta: { title: '抽奖名单', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] },
      hidden: true
    },
    {
      path: 'lottery-roster-manage',
      component: () =>
        import ('@/views/lottery/lottery-roster-manage'),
      name: 'lottery-roster-manage',
      meta: { title: '抽奖名单管理', roles: ['PermissionConfigAdministrator', 'SuperAdministrator'] },
      hidden: true
    }
  ]
}
export default lotteryRouter
