/*
<template>
  <div class="app-container">
    <el-card class="box-card" :style="{ height: defaultHeight }">
      <el-row slot="header" class="clearfix" style="font-size:20px">
        <span>日历</span>
      </el-row>
      <el-row>
        <el-col :span="4" justify="center" align="middle">
          <div
            class="left-title-box"
            style="text-align:center;font-weight:700;font-size:18px;color:black"
          >
            日程详情
          </div>
        </el-col>
        <el-col :span="20">
          <!-- 日历 -->
          <FullCalendar
            ref="calendarTest"
            :options="calendarOptions"
            :height="tableHeight"
          />
          <el-dialog
            v-if="dialogFormVisible"
            :title="textMap[dialogStatus]"
            :center="true"
            width="40%"
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
                  <el-form-item label="日程等级" prop="bgColor">
                    <el-select
                      v-model="temp.bgColor"
                      placeholder="请选择日程的等级"
                      style="width:100%"
                    >
                      <el-option
                        v-for="item in calendarBgColor"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

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
                      first-day-of-week="1"
                      style="width:100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="日程内容" prop="content">
                    <el-input
                      v-model="temp.content"
                      type="textarea"
                      clearable
                    />
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
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style>
.left-title-box {
  position: relative;
  border-radius: 4px 0 0 0px;
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
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
      defaultHeight: '1000px',
      tableHeight: '460px',
      textMap: {
        create: '创建日程事件'
      },
      dialogFormVisible: false,
      temp: {
        bgColor: '',
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
      calendarBgColor: [
        {
          code: 0,
          name: '重要'
        },
        {
          code: 1,
          name: '普通'
        },
        {
          code: 2,
          name: '一般'
        },
        {
          code: 3,
          name: '特殊'
        }
      ],
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
        contentHeight: 710, // 设置查看日历的高度
        views: {
          timeGrid: {
            eventLimit: 2
            // dayMaxEventRows: 5
          },
          timeGridFourDay: {
            type: 'timeGrid',
            dayCount: 4
          }
        },
        eventTimeFormat: {
          // like '14:30:00'
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          meridiem: false
        },
        events: []
      }
    }
  },
  computed: {},
  created() {
    addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  methods: {
    getHeight() {
      this.defaultHeight = window.innerHeight - 70 + 'px'
      this.tableHeight = window.innerHeight - 220 + 'px'
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    initFormSafeSubmitConfig() {
      this.loadingSubmitButton = false
      this.submitButtonText = '提交'
    },
    createData() {
      const startEnd = this.temp.start
      const size = startEnd.length

      const bgColor = ['red', 'orange', 'skyblue', 'purple']
      let start
      let end
      if (size >= 1) {
        start = startEnd[0]
      } else if (size >= 2) {
        end = startEnd[1]
      }
      if (start || end) {
        this.calendarOptions.events.push({
          backgroundColor: bgColor[this.temp.bgColor],
          title: this.temp.title,
          start: start,
          end: end,
          content: this.temp.content,
          display: 'block',
          borderColor: bgColor[this.temp.bgColor]
        })
      }
      //   隐藏弹出框
      this.dialogFormVisible = false
      this.temp.title = ''
      this.temp.start = ''
      this.temp.content = ''
      this.temp.bgColor = ''
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
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
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
