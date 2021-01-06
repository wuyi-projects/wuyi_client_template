<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never">

      <el-row :gutter="10">
        <el-col :span="12">
          <el-card shadow="never">
            <el-row>
              <el-col>
                <span style="font-size:18px;font-weight:bold;color:#1890ff;">基本信息</span>
              </el-col>
            </el-row>
            <el-row style="margin-top:10px;">
              <el-col :span="4">任务类型</el-col>
              <el-col :span="8">{{ taskInfo.taskTypeDesc }}</el-col>
              <el-col :span="4">截止日期</el-col>
              <el-col :span="8">{{ taskInfo.endTime }}</el-col>
            </el-row>
            <el-row style="margin-top:10px;">
              <el-col :span="4">任务名称</el-col>
              <el-col :span="20">{{ taskInfo.taskName }}</el-col>
            </el-row>
            <el-row style="margin-top:10px;">
              <el-col :span="4">任务描述</el-col>
              <el-col :span="20">{{ taskInfo.taskDescribe }}</el-col>
            </el-row>
            <el-row style="margin-top:10px;">
              <el-col :span="4">
                <span style="font-size:16px;font-weight:bold;">附件信息</span>
              </el-col>
              <el-col :span="20" />
            </el-row>
            <el-row :gutter="10" style="margin-top:10px;">
              <template v-if="taskInfo.pictureUrl">
                <el-col v-for="(url,index) in taskInfo.pictureUrl" :key="index" style="margin:5px 0;" :span="6">
                  <el-image :src="url" lazy :preview-src-list="taskInfo.pictureUrl" />
                </el-col>
              </template>
              <template v-else>
                <el-col>
                  <span>无</span>
                </el-col>
              </template>
            </el-row>
          </el-card>

          <template v-for="(record,index) in taskInfo.records">
            <template v-if="record.type === 3">
              <el-card :key="index" shadow="hover" style="margin-top:10px;">

                <el-row :key="index" class="border-bottom" style="padding-bottom:10px;">
                  <el-col :span="4">
                    <span style="font-size:16px;font-weight:bold;">反馈信息</span>
                  </el-col>
                  <el-col :span="20" />
                </el-row>
                <el-row :key="index" style="margin-top:10px;">
                  <el-col :span="4">反馈人</el-col>
                  <el-col :span="20">
                    <span>{{ record.operatorName }}</span>
                    <span>【</span>
                    <span>{{ record.departmentName }}</span>
                    <span>】</span>
                  </el-col>
                </el-row>
                <el-row :key="index" style="margin-top:10px;">
                  <el-col :span="4">反馈结果</el-col>
                  <el-col :span="8">{{ record.result===0?'无法完成':'已完成' }}</el-col>
                  <el-col :span="4">反馈时间</el-col>
                  <el-col :span="8">{{ record.operateTime }}</el-col>
                </el-row>
                <el-row :key="index" style="margin-top:10px;">
                  <el-col>内容</el-col>
                  <el-col>{{ record.description }}
                  </el-col>
                </el-row>
                <el-row :key="index" style="margin-top:10px;">
                  <el-col>附件</el-col>
                </el-row>
                <el-row :key="index" :gutter="10" style="margin-top:10px;">
                  <template v-if="record.pictureUrl">
                    <el-col v-for="(recordUrl,recordIndex) in record.pictureUrl" :key="recordIndex" style="margin:5px 0;" :span="6">
                      <el-image :src="recordUrl" lazy :preview-src-list="record.pictureUrl" />
                    </el-col>
                  </template>
                  <template v-else>
                    <el-col>
                      <span>无</span>
                    </el-col>
                  </template>
                </el-row>
              </el-card>
            </template>
            <template v-if="record.type === 6">
              <el-card :key="index" shadow="hover" style="margin-top:10px;">
                <el-row :key="index" class="border-bottom" style="padding-bottom:10px;">
                  <el-col :span="4">
                    <span style="font-size:16px;font-weight:bold;">驳回信息</span>
                  </el-col>
                  <el-col :span="20" />
                </el-row>
                <el-row :key="index" style="margin-top:10px;">
                  <el-col :span="4">驳回人</el-col>
                  <el-col :span="20">
                    <span>{{ record.operatorName }}</span>
                    <span>【</span>
                    <span>{{ record.departmentName }}</span>
                    <span>】</span>
                  </el-col>
                </el-row>
                <el-row :key="index" style="margin-top:10px;">
                  <el-col :span="4">驳回时间</el-col>
                  <el-col :span="20">{{ record.operateTime }}</el-col>
                </el-row>
                <el-row :key="index" style="margin-top:10px;">
                  <el-col>内容</el-col>
                  <el-col>{{ record.reason }}
                  </el-col>
                </el-row>
              </el-card>
            </template>
          </template>

        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="12" style="padding:20px 0;background-color:#1890ff;color:white; border-right:1px solid white;" align="center">
              <div style="font-size:16px;font-weight:bold;">{{ taskInfo.statusDesc?taskInfo.statusDesc:'未知' }}</div>
              <div>目前进度</div>
            </el-col>
            <el-col :span="12" style="padding:20px 0;background-color:#1890ff;color:white;" align="center">
              <div class="text-nowrap" style="font-size:16px;font-weight:bold;">{{ taskInfo.receiverName?taskInfo.receiverName:'无' }}【{{ taskInfo.departmentName?taskInfo.departmentName:'无' }}】</div>
              <div>执行人</div>
            </el-col>
          </el-row>

          <el-row style="margin-top:10px;">
            <el-col style="padding:15px 0;background-color:#FAFAFA">
              <span style="font-weight:bold;padding-left:20px;">任务进度情况</span>
            </el-col>
          </el-row>
          <el-row style="margin:20px 0 40px;">
            <el-col>
              <el-steps :active="taskInfo.stepIndex" align-center>
                <el-step title="任务发布" />
                <el-step title="待签收" />
                <el-step title="已签收" />
                <el-step title="处理完成" />
                <el-step title="已完成" />
              </el-steps>
            </el-col>
          </el-row>

          <el-row style="margin-top:10px;">
            <el-col style="padding:15px 0;background-color:#FAFAFA">
              <span style="font-weight:bold;padding-left:20px;">任务追踪</span>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col>
              <el-timeline>
                <template v-for="(recordGroup,index) in timelineData">
                  <el-timeline-item :key="index" :timestamp="recordGroup[0].date" placement="top" :color="index==0?'#1890ff':''">
                    <template v-for="(record,recordIndex) in recordGroup">
                      <div :key="recordIndex" style="padding:10px 0;">
                        <el-col :offset="2" :span="4" style="padding:10px 0;">
                          <span>{{ record.dateText }}</span>
                          <span style="padding-left:10px;">{{ record.time }}</span>
                        </el-col>
                        <el-col :span="18" style="padding:10px 0;">
                          <span v-if="record.type === 0">发布任务</span>
                          <span v-else-if="record.type === 1">签收任务</span>
                          <span v-else-if="record.type === 2">任务分配给 {{ record.description?record.description.name:'' }}-{{ record.description?record.description.departmentName:'' }}</span>
                          <span v-else-if="record.type === 3">已处理完成</span>
                          <span v-else-if="record.type === 4">领导催办</span>
                          <span v-else-if="record.type === 5">任务已完成</span>
                          <span v-else-if="record.type === 6">任务驳回</span>
                          <span>【</span>
                          <span>{{ record.departmentName }}</span>
                          <span>-</span>
                          <span>{{ record.operatorName }}</span>
                          <span>】</span>
                        </el-col>
                      </div>
                    </template>
                  </el-timeline-item>
                </template>
              </el-timeline>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>

.padding-right {
  padding-right:10px;
}

.text-nowrap{
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.border-bottom {
  border-bottom:1px dotted #ccc;
}

</style>

<script>
import { getTaskDetail } from '@/api/task'
import { text2MonthDay, text2DateText, text2HourMinute } from '@/utils/util'

export default {
  data() {
    return {
      timelineData: [],
      taskInfo: {
      },
      stepIndex: 0
    }
  },
  computed: {},
  created() {
    const that = this
    const id = that.$route.query.id
    if (id) {
      that.id = id
      that.getTaskDetail()
    }
  },
  methods: {
    getTaskDetail() {
      const that = this
      const id = that.id
      if (id) {
        getTaskDetail({
          id: id
        })
          .then(response => {
            const data = response.data
            if (!data) {
              return
            }
            data.statusDesc = that.handleStatus(data.status)
            data.taskTypeDesc = that.handleTaskType(data.taskType)
            data.stepIndex = that.handleStep(data.status)
            const pictureUrl = data.pictureUrl
            if (pictureUrl) {
              const pictureUrlArray = pictureUrl.split(',')
              data.pictureUrl = pictureUrlArray
            }
            data.records.reverse()
            const records = data.records
            if (records && records.length > 0) {
              for (var index = 0, len = records.length; index < len; index++) {
                const recordPictureUrl = records[index].pictureUrl
                if (recordPictureUrl) {
                  const recordRictureUrlArray = recordPictureUrl.split(',')
                  records[index].pictureUrl = recordRictureUrlArray
                }

                const description = records[index].description
                const type = records[index].type
                if (description && type === 2) {
                  records[index].description = JSON.parse(description)
                }
              }
              console.log(JSON.stringify(records))
              that.handleRecord4Date(records)
            }
            that.taskInfo = data
          })
          .catch(e => {
            that.loading = false
          })
      }
    },
    handleTaskType(value) {
      var json = {
        '1': '重点工作',
        '2': '会议事项',
        '3': '领导交办'
      }
      return json['' + value + '']
    },
    handleStatus(value) {
      var json = {
        '0': '待签收',
        '1': '已签收',
        '2': '处理完成',
        '3': '已完成',
        '4': '已驳回'
      }
      return json['' + value + '']
    },
    handleStep(status) {
      let stepIndex = 0
      switch (status) {
        case 0: stepIndex = 1; break
        case 1: stepIndex = 3; break
        case 2: stepIndex = 4; break
        case 3: stepIndex = 5; break
        case 4: stepIndex = 3; break
        default:
      }
      return stepIndex
    },
    handleRecord4Date(data) {
      if (data.length > 0) {
        let groupDate = null
        const taskRecordGroup = [[]]
        let currGroupIndex = 0
        for (var index = 0, len = data.length; index < len; index++) {
          let temp = data[index]

          const date = text2MonthDay(temp.operateTime)
          console.log(date)
          if (groupDate === null) {
            groupDate = date
            temp = this.handleRecordTime(temp)
            taskRecordGroup[currGroupIndex].push(temp)
          } else if (groupDate === date) {
            temp = this.handleRecordTime(temp)
            taskRecordGroup[currGroupIndex].push(temp)
          } else {
            currGroupIndex++
            temp = this.handleRecordTime(temp)
            taskRecordGroup.push([])
            taskRecordGroup[currGroupIndex].push(temp)
          }
        }
        console.log('****' + JSON.stringify(taskRecordGroup))
        this.timelineData = taskRecordGroup
      }
      return data
    },
    handleRecordTime(value) {
      const operateTime = value.operateTime
      value['date'] = text2MonthDay(operateTime)
      value['dateText'] = text2DateText(operateTime)
      value['time'] = text2HourMinute(operateTime)
      return value
    }
  }
}
</script>
