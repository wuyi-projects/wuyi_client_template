import Layout from '@/layout'

const wechatMiniprogramConfigRouter = {
  path: '/wechat-miniprogram-config',
  component: Layout,
  meta: {
    title: '微信小程序配置',
    icon: 'file',
    roles: ['PermissionAdministrator']
  },
  children: [{
    path: 'miniprogram-config',
    component: () =>
      import ('@/views/wechat-miniprogram-config/miniprogram-config'),
    name: 'miniprogram-config',
    meta: { title: '小程序密钥配置', roles: ['PermissionAdministrator'] }
  }]
}
export default wechatMiniprogramConfigRouter
