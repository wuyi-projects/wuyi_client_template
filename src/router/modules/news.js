import Layout from '@/layout'

const newsRouter = {
  path: '/news',
  component: Layout,
  meta: {
    title: '新闻管理',
    icon: 'news',
    roles: ['PermissionAdministrator', 'BusinessAdmistrator']
  },
  children: [
    {
      path: 'news',
      component: () => import('@/views/news/news'),
      name: 'news',
      meta: { title: '新闻管理', roles: ['PermissionAdministrator', 'BusinessAdmistrator'] }
    },
    {
      path: 'news-edit',
      component: () => import('@/views/news/news-edit'),
      name: 'news-edit',
      meta: { title: '编辑新闻', roles: ['PermissionAdministrator', 'BusinessAdmistrator'] }
    },
    {
      path: 'news-detail',
      component: () => import('@/views/news/news-detail'),
      name: 'news-detail',
      meta: { title: '新闻详情', roles: ['PermissionAdministrator', 'BusinessAdmistrator'] },
      hidden: true
    }
  ]
}
export default newsRouter
