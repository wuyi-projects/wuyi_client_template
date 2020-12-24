import Layout from '@/layout'

const taskRouter = {
  path: '/task',
  component: Layout,
  meta: {
    title: '任务管理',
    icon: 'task',
    roles: ['PermissionAdministrator', 'BusinessAdmistrator']
  },
  children: [
    {
      path: 'task',
      component: () => import('@/views/task/task'),
      name: 'task',
      meta: { title: '任务管理', roles: ['PermissionAdministrator', 'BusinessAdmistrator'] }
    },
    {
      path: 'task-add',
      component: () => import('@/views/task/task-add'),
      name: 'task-add',
      meta: { title: '新增任务', roles: ['PermissionAdministrator', 'BusinessAdmistrator'] }
    },
    {
      path: 'task-detail',
      component: () => import('@/views/task/task-detail'),
      name: 'task-detail',
      meta: { title: '任务详情', roles: ['PermissionAdministrator', 'BusinessAdmistrator'] },
      hidden: true
    }
  ]
}
export default taskRouter
