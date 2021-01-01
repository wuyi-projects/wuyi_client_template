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

<style></style>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhCNLocale from '@fullcalendar/core/locales/zh-cn'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },

        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        locale: zhCNLocale,
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick
      },
      events: [
        { title: '开学安排', date: '2021-01-01' },
        { title: '课表排班', date: '2021-01-01' }
      ]
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
