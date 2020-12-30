import Layout from '@/layout'

const permissionRouter = {
    path: '/permission',
    component: Layout,
    meta: {
        title: '基础设置',
        icon: 'setting2',
        roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
    },
    children: [{
            path: 'permission-group-info',
            component: () =>
                import ('@/views/permission/permission-group-info'),
            name: 'permission-group-info',
            meta: { title: '分组设置', roles: ['PermissionAdministrator'] }
        },
        {
            path: 'permission',
            component: () =>
                import ('@/views/permission/permission'),
            name: 'permission',
            meta: { title: '权限设置', roles: ['PermissionAdministrator'] }
        },
        {
            path: 'role',
            component: () =>
                import ('@/views/permission/role'),
            name: 'role',
            meta: { title: '角色权限管理', roles: ['PermissionAdministrator'] }
        },
        {
            path: 'post-role',
            component: () =>
                import ('@/views/permission/post-role'),
            name: 'post-role',
            meta: { title: '岗位角色分配', roles: ['PermissionAdministrator'] }
        },
        {
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
        },

        {
            path: 'basics',
            component: () =>
                import ('@/views/permission/basics'),
            name: 'basics',
            meta: {
                title: '个人中心',
                roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
            }
        },
        {
            path: 'new-test',
            component: () =>
                import ('@/views/permission/new-test'),
            name: 'new-test',
            meta: { title: '表格', roles: ['PermissionAdministrator'] }
        },
        {
            path: 'pdf',
            component: () =>
                import ('@/views/permission/pdf'),
            name: 'pdf',
            meta: {
                title: 'PDF预览',
                roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
            }
        }
    ]
}
export default permissionRouter