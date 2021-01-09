import Layout from '@/layout'

const settingRouter = {
    path: '/permission',
    component: Layout,
    meta: {
        title: '基础设置',
        icon: 'setting2',
        roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
    },
    children: [{
            path: 'permission-log',
            component: () =>
                import ('@/views/permission/permission-log'),
            name: 'permission-log',
            meta: { title: '系统登录日志', roles: ['PermissionAdministrator'] }
        },
        {
            path: 'permission-importance',
            component: () =>
                import ('@/views/permission/permission-importance'),
            name: 'permission-importance',
            meta: { title: '重要操作日志', roles: ['PermissionAdministrator'] }
        }
    ]
}
export default settingRouter