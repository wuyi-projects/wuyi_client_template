import Layout from '@/layout'

const calendarRouter = {
    path: '/calendar',
    component: Layout,
    meta: {
        title: '日历详情',
        icon: 'calendar',
        roles: ['PermissionAdministrator', 'PermissionAssignmentAdministrator']
    },
    children: [{
        path: 'calendar',
        component: () =>
            import ('@/views/calendar/calendar'),
        name: 'calendar',
        meta: { title: '日历信息', roles: ['PermissionAdministrator'] }
    }]
}
export default calendarRouter