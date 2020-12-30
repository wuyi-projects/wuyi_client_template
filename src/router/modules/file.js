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
    }, {
        path: 'file-management2',
        component: () =>
            import ('@/views/file/file-management2'),
        name: 'file-management2',
        meta: { title: '文件管理2', roles: ['PermissionAdministrator'] }
    }, ]
}
export default fileRouter