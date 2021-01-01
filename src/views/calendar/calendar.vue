<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>日历</span>
      </div>
      <!-- 日历 -->
      <FullCalendar :options="calendarOptions" />
    </el-card>
  </div>
</template>

<style>
.fc-toolbar h2 {
  display: inline;
}
</style>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhCNLocale from '@fullcalendar/core/locales/zh-cn'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        headerToolbar: {
          left: 'prevYear,prev,today,next,nextYear',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false // 设置时间为24小时
        },
        // 引入的插件，比如fullcalendar/daygrid，fullcalendar/timegrid引入后才可显示月，周，日
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        firstDay: 1, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推
        editable: true,
        selectable: true,
        locale: zhCNLocale,
        timeGridEventMinHeight: '20', // 设置事件的最小高度
        aspectRatio: 1.65, // 设置日历单元格宽度与高度的比例。
        displayEventTime: true, // 是否显示时间
        allDaySlot: true, // 周，日视图时，all-day 不显示
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        eventLimit: true,
        views: {
          timeGrid: {
            eventLimit: 2
          }
        },
        events: [
          { title: '开学安排', date: '2021-01-01' },
          { title: '课表排班', date: '2021-01-01' },
          { title: '课表排班', date: '2021-01-01' },
          { title: '课表排班', date: '2021-01-01' },
          { title: '课表排班', date: '2021-01-01' },
          { title: '课表排班', date: '2021-01-01' },
          { title: '课表排班', date: '2021-01-01' },
          { title: '课表排班', date: '2021-01-01' }
        ]
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    handleDateClick(arg) {
      // 获取当前点击日期
      console.log('当前选择日期:' + arg.dateStr)

      // this.events = [
      //     { title: '开学安排', date: '2021-01-01' },
      //     { title: '课表排班', date: '2021-01-01' }
      //   ]
      this.events = Object.assign({}, this.events, {
        title: '开学安排',
        date: '2021-01-01'
      })
      this.$forceUpdate()
    },
    handleEventClick(info) {
      alert('Event：' + info.event.title)
      info.el.style.borderColor = 'red'
      info.evnet.remove()
    }
  }
}
</script>
