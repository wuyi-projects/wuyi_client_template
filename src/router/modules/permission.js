import Layout from '@/layout'

const settingRouter = {
    path: '/setting',
    component: Layout,
    meta: {
        title: '基础设置',
        icon: 'setting2',
        roles: ['FapiaoUser']
    },
    children: [{
            path: 'login-log',
            component: () =>
                import ('@/views/setting/login-log'),
            name: 'login-log',
            meta: { title: '系统登录日志', roles: ['FapiaoUser'] }
        },
        {
            path: 'operate-log',
            component: () =>
                import ('@/views/setting/operate-log'),
            name: 'operate-log',
            meta: { title: '重要操作日志', roles: ['FapiaoUser'] }
        }
    ]
}
export default settingRouter