import Layout from '@/layout'

const fileRouter = {
  path: '/file',
  component: Layout,
  meta: {
    title: '文件管理',
    icon: 'file',
    roles: ['PermissionAdministrator', 'BusinessAdmistrator']
  },
  children: [{
    path: 'file-management',
    component: () =>
      import ('@/views/file/file-management'),
    name: 'file-management',
    meta: { title: '文件管理', roles: ['PermissionAdministrator'] }
  }]
}
export default fileRouter
