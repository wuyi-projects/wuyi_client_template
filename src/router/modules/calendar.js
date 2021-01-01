import Layout from '@/layout'

const calendarRouter = {
    path: '/calendar',
    component: Layout,
    meta: {
        title: '日历详情',
        icon: 'tree',
        roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
    },
    children: [{
        path: 'platform-product',
        component: () =>
            import ('@/views/calendar/calendar'),
        name: 'calendar',
        meta: { title: '日历信息', roles: ['PermissionAdministrator'] }
    }]
}
export default calendarRouter