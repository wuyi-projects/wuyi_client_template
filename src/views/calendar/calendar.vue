/*
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>日历</span>
      </div>
      <!-- 日历 -->
      <FullCalendar ref="calendarTest" :options="calendarOptions" />
    </el-card>

    <el-dialog
      v-if="dialogFormVisible"
      :title="textMap[dialogStatus]"
      :center="true"
      width="60%"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="80px"
        style="width: 100%; padding:10px;"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="temp.title" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="起始时间" prop="start">
              <el-date-picker
                v-model="temp.start"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="日程内容" prop="content">
              <el-input v-model="temp.content" type="textarea" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-if="dialogStatus === 'create'">
          <el-button @click="resetForm('dataForm')">
            重置
          </el-button>
          <el-button type="primary" @click="createData()">
            {{ submitButtonText }}
          </el-button>
        </template>
      </div>
    </el-dialog>
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
import { clear } from 'xe-utils/methods'

import formatTableSize from '@/utils/size'

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      textMap: {
        create: '创建日程事件'
      },
      dialogFormVisible: false,
      temp: {
        title: '',
        start: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入主题名称', trigger: 'blur' },
          { min: 8, message: '长度大于 8 个字符', trigger: 'blur' }
        ]
      },
      dialogStatus: '',
      submitButtonText: '提交',
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
        displayEventEnd: true, // 显示起始时间
        locale: zhCNLocale,
        timeGridEventMinHeight: '20', // 设置事件的最小高度
        aspectRatio: 1.65, // 设置日历单元格宽度与高度的比例。
        // displayEventTime: true, // 是否显示时间
        allDaySlot: true, // 周，日视图时，all-day 不显示
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        select: this.handleDateSelect, // 选择日期事件，可响应一个新建日程的事件
        eventLimit: true,
        dayMaxEventRows: true,
        views: {
          timeGrid: {
            eventLimit: 2,
            dayMaxEventRows: 5
          },
          timeGridFourDay: {
            type: 'timeGrid',
            dayCount: 4
          }
        },
        events: [
          {
            title: '发票接口开发',
            start: '2021-01-05',
            classNames: ['cal']
          },
          {
            title: '发票接口开发',
            start: '2021-01-05',
            classNames: ['cal']
          },
          {
            title: '发票接口开发',
            start: '2021-01-05',
            classNames: ['cal']
          },
          {
            title: '发票接口开发',
            start: '2021-01-05',
            classNames: ['cal']
          },
          {
            title: '发票接口开发',
            start: '2021-01-05',
            classNames: ['cal']
          }
        ]
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    initFormSafeSubmitConfig() {
      this.loadingSubmitButton = false
      this.submitButtonText = '提交'
    },
    createData() {
      console.log('@@@' + this.temp.title)

      console.log('@@@' + this.temp.start)

      console.log('@@@' + this.temp.content)

      const startEnd = this.temp.start
      const size = startEnd.length

      let start
      let end
      if (size >= 1) {
        start = startEnd[0]
      } else if (size >= 2) {
        end = startEnd[1]
      }
      if (start || end) {
        this.calendarOptions.events.push({
          title: this.temp.title,
          start: start,
          end: end,
          content: this.temp.content
        })
      }

      //   隐藏弹出框
      this.dialogFormVisible = false
      /*  //   刷新日历
      this.calendarApi.refetchEvents() */
      /* this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.temp)
          savePermission(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
                this.dialogFormVisible = false
                this.$refs.dataGrid.commitProxy('reload')
              } else {
                this.$message.error('新增失败')
                this.initFormSafeSubmitConfig()
              }
            })
            .catch(e => {
              this.loading = false
              this.initFormSafeSubmitConfig()
            })
        }
      }) */
    },
    handleDateClick(arg) {
      (this.dialogFormVisible = true), (this.dialogStatus = 'create')
      /* const data = {
        title: 'New Event',
        start: arg.dateStr,
        classNames: ['cal'],
        flag: 0
      }
      if (data.flag === 0) {
        data.backgroundColor = 'red'
        data.borderColor = 'red'
        data.textColor = 'white'
      }
      console.log(arg.dateStr)
      this.calendarOptions.events.push(data) */
    },
    handleEventClick(info) {}
  }
}
</script>
