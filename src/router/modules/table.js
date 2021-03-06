import Layout from '@/layout'

const tableRouter = {
    path: '/customer',
    component: Layout,
    meta: {
        title: 'G2图表',
        icon: 'tree',
        roles: ['PermissionConfigAdministrator']
    },
    children: [{
        path: 'table',
        component: () =>
            import ('@/views/table/table'),
        name: 'table',
        meta: { title: 'G2图表', roles: ['PermissionConfigAdministrator'] }
    }]
}
export default tableRouter