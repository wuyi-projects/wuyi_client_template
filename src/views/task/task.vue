<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never" style="margin-bottom:16px;">
      <el-form
        ref="searchForm"
        :model="searchFormData"
        label-width="120px"
        size="small"
      >
        <el-col :span="8">
          <el-form-item label="任务名称" prop="taskName">
            <el-input v-model="searchFormData.taskName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="任务类型" prop="taskType">
            <el-select
              v-model="searchFormData.taskType"
              placeholder="请选择任务类型"
              style="width:100%"
            >
              <el-option
                v-for="item in taskTypeOptionData"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="folding" :span="8">
          <el-form-item label="任务状态" prop="status">
            <el-select
              v-model="searchFormData.status"
              placeholder="请选择任务状态"
              style="width:100%"
            >
              <el-option
                v-for="item in statusOptionData"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="folding" :span="8">
          <el-form-item label="起止时间">
            <el-col :span="11">
              <el-form-item prop="start">
                <el-date-picker
                  v-model="searchFormData.start"
                  type="date"
                  placeholder="起始日期"
                  style="width: 100%;"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="end">
                <el-date-picker
                  v-model="searchFormData.end"
                  type="date"
                  placeholder="结束时间"
                  style="width: 100%;"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col v-if="folding" :span="8">
          <el-form-item />
        </el-col>
        <el-col :span="8">
          <el-form-item style="float: right;" label-width="0">
            <el-button @click="resetForm('searchForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('searchForm')">
              查 询
            </el-button>
            <el-button v-if="folding" type="text" @click="toggleFolding()">
              收起<i class="el-icon-arrow-up el-icon--right" />
            </el-button>
            <el-button v-else type="text" @click="toggleFolding()">
              展开<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>

    <!--数据展示-->
    <el-card class="box-card" shadow="never">
      <vxe-grid
        ref="dataGrid"
        class="custom-table-scrollbar"
        v-bind="gridOptions"
      >
        <!--工具栏按钮-->
        <template v-slot:buttons>
          <el-button-group>
            <el-button @click.native.prevent="handleCreate()">新增</el-button>
            <!--
            <el-button
              type="primary"
              @click.native.prevent="handleBatchDelete()"
            >批量删除</el-button>
            -->
          </el-button-group>
        </template>

        <!--任务类型-->
        <template v-slot:taskType_default="{ row }">
          <template v-if="row.taskType === 1">
            <el-tag type="success" effect="dark">重点工作</el-tag>
          </template>
          <template v-else-if="row.taskType === 2">
            <el-tag type="danger" effect="dark">会议事项</el-tag>
          </template>
          <template v-else-if="row.taskType === 3">
            <el-tag type="warning" effect="dark">领导交办</el-tag>
          </template>
          <template v-else />
        </template>

        <!--预计进度-->
        <template v-slot:status_default="{ row }">
          <template v-if="row.status === 0">
            <el-progress :percentage="10" :color="customColors" />
          </template>
          <template v-else-if="row.status === 1">
            <el-progress :percentage="30" :color="customColors" />
          </template>
          <template v-else-if="row.status === 2">
            <el-progress :percentage="70" :color="customColors" />
          </template>
          <template v-else-if="row.status === 3">
            <el-progress :percentage="100" :color="customColors" />
          </template>
          <template v-else-if="row.status === 4">
            <el-progress :percentage="70" :color="customColors" />
          </template>
          <template v-else />
        </template>

        <!--数据行操作-->
        <template v-slot:operate="{ row }">
          <el-button type="text" @click="viewRow(row)">查看详情</el-button>
          <!--
          <el-button type="text" @click="handleUpdate(row)">修改</el-button>
          <el-divider direction="vertical" />
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="beforeHandleCommand('handleDelete', row)"
              >
                删除
              </el-dropdown-item>
              <el-dropdown-item
                :command="beforeHandleCommand('viewRow', row)"
                divided
              >
                详情
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          -->
        </template>
        <!--自定义空数据模板-->
        <template v-slot:empty>
          <span>
            <p>没有找到匹配的记录</p>
          </span>
        </template>
      </vxe-grid>
    </el-card>

    <!-- 创建/修改表单 -->
    <el-dialog
      v-if="dialogFormVisible"
      :title="textMap[dialogStatus]"
      :center="true"
      width="45%"
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
            <el-form-item label="任务类型" prop="taskType">
              <el-radio-group v-model="temp.taskType">
                <el-radio
                  v-for="item in taskTypeRadioOptionData"
                  :key="item.code"
                  :label="item.code"
                >
                  {{ item.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="任务名称" prop="taskName">
              <el-input v-model="temp.taskName" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="任务描述" prop="taskDescribe">
              <el-input v-model="temp.taskDescribe" type="textarea" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="截止日期" prop="endTime">
              <el-date-picker
                v-model="temp.endTime"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分配任务">
              <el-col :span="12">
                <el-form-item prop="departmentId">
                  <el-select
                    v-model="temp.departmentId"
                    placeholder="请选择部门"
                    style="width:100%;"
                    @change="handleChangeDepartment"
                  >
                    <el-option
                      v-for="item in departmentOptionData"
                      :key="item.id"
                      :label="item.departmentName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="receiverId">
                  <el-select
                    v-model="temp.receiverId"
                    placeholder="请选择人员"
                    style="width:100%;"
                    @change="handleChangePerson"
                  >
                    <el-option
                      v-for="item in personOptionData"
                      :key="item.openId"
                      :label="item.name"
                      :value="item.openId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-if="dialogStatus !== 'detail'">
          <el-button @click="resetForm('dataForm')">
            重置
          </el-button>
          <el-button
            type="primary"
            :loading="loadingSubmitButton"
            :disabled="loadingSubmitButton"
            @click="dialogStatus === 'create' ? createData() : updateData()"
          >
            {{ submitButtonText }}
          </el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.item {
  margin-top: 10px;
  margin-right: 5px;
}
</style>

<script>
import formatTableSize from '@/utils/size'

import {
  listTask,
  saveTask,
  deleteTask,
  batchDeleteTask,
  updateTask
}
  from '@/api/task'

import {
  listAllDepartment
}
  from '@/api/department'

import {
  listAllPerson4Department
}
  from '@/api/person'

export default {
  data() {
    return {
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      departmentOptionData: [],
      personOptionData: [],
      optionsData: [],
      folding: false,
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      allTaskGroup: [],
      textMap: {
        update: '编辑',
        create: '创建',
        detail: '详情'
      },
      searchFormData: {
        id: '',
        start: '',
        end: '',
        taskType: null,
        taskName: '',
        status: null
      },
      rules: {
        taskType: [
          { required: true, message: '请选择任务类型', trigger: 'change' }
        ],
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 5, max: 50, message: '长度 5-50 个字符', trigger: 'blur' }
        ],
        taskDescribe: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 5, max: 200, message: '长度 5-200 个字符', trigger: 'blur' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        receiverId: [
          { required: true, message: '请选择人员', trigger: 'change' }
        ]
      },
      statusOptionData: [
        { code: null,
          name: '全部' },
        { code: 0,
          name: '待签收' },
        { code: 1,
          name: '已签收' },
        { code: 2,
          name: '已处理' },
        { code: 3,
          name: '已完成' },
        { code: 4,
          name: '已驳回' }],
      taskTypeOptionData: [
        { code: null,
          name: '全部' },
        { code: 1,
          name: '重点工作' },
        { code: 2,
          name: '会议事项' },
        { code: 3,
          name: '领导交办' }],
      taskTypeRadioOptionData: [
        { code: 1,
          name: '重点工作' },
        { code: 2,
          name: '会议事项' },
        { code: 3,
          name: '领导交办' }],
      temp: {
        id: null,
        taskType: null,
        taskName: null,
        taskDescribe: null,
        endTime: null,
        departmentId: null,
        receiverId: null,
        sponsorId: null,
        version: 0
      },
      initCreateData: {
        id: null,
        taskType: null,
        taskName: null,
        taskDescribe: null,
        endTime: null,
        departmentId: null,
        receiverId: null,
        sponsorId: 999,
        version: 0
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      gridOptions: {
        border: 'default',
        size: formatTableSize(),
        resizable: true,
        autoResize: true,
        showHeaderOverflow: true,
        showOverflow: true,
        highlightHoverRow: true,
        highlightHoverColumn: true,
        highlightCurrentColumn: true,
        keepSource: true,
        id: 'full_edit_1',
        rowId: 'id',
        headerAlign: 'center',
        scrollY: { gt: -1 },
        sortConfig: {
          trigger: 'cell',
          defaultSort: {
            field: 'name',
            order: 'desc'
          }
        },
        filterConfig: {
          remote: true
        },
        pagerConfig: {
          autoHidden: true,
          pageSize: 10,
          pageSizes: [10, 20, 50, 80, 100],
          layouts: [
            'Total',
            'Sizes',
            'PrevJump',
            'PrevPage',
            'Number',
            'NextPage',
            'NextJump',
            'FullJump'
          ]
        },
        toolbar: {
          refresh: true,
          zoom: true,
          custom: true
        },
        radioConfig: {
          range: true,
          reserve: true,
          highlight: true
        },
        proxyConfig: {
          seq: true, // 启用动态序号代理
          sort: true, // 启用排序代理
          filter: true, // 启用筛选代理
          form: true, // 启用表单代理
          props: {
            result: 'rows',
            total: 'total'
          },
          ajax: {

            query: ({ page, sort, filters }) => {
              // 查询条件
              const searchData = {}
              const searchFormData = this.searchFormData
              for (var key in searchFormData) {
                const value = searchFormData[key]
                if (!(typeof value === 'undefined' || value === null || value === '')) {
                  searchData[key] = value
                }
              }

              // 处理排序条件
              const sortParams = Object.assign({
                sort: sort.property,
                order: sort.order
              })
              // 处理筛选条件
              filters.forEach(({ property, values, column }) => {
                if (values) {
                  if (column.filterMultiple) {
                    sortParams[property] = values
                  } else {
                    sortParams[property] = values[0]
                  }
                }
              })
              const pageData = Object.assign({
                offset:
                  page.currentPage >= 0
                    ? (page.currentPage - 1) * page.pageSize
                    : 0,
                limit: page.pageSize
              })
              const result = Object.assign(pageData, searchData, sortParams)
              return listTask(result)
            }
          }
        },
        columns: [
          { type: 'checkbox',
            width: 40,
            align: 'center' },
          {
            field: 'id',
            title: '编号',
            width: 140,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'taskType',
            title: '任务类型',
            width: 140,
            align: 'center',
            headerAlign: 'center',
            slots: { default: 'taskType_default' }
          },
          {
            field: 'taskName',
            title: '任务名称',
            align: 'left',
            headerAlign: 'center',
            minWidth: 280
          },
          {
            field: 'taskDescribe',
            title: '任务描述',
            minWidth: 200,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'sponsorName',
            title: '任务发起人',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'receiverName',
            title: '任务接收人',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            title: '任务状态',
            minWidth: 100,
            align: 'center',
            headerAlign: 'center',
            formatter: this.formatStatus
          },
          {
            field: 'status',
            title: '预计进度',
            width: 160,
            align: 'center',
            headerAlign: 'center',
            slots: { default: 'status_default' }
          },
          {
            field: 'endTime',
            title: '截止时间',
            minWidth: 160,
            align: 'center',
            headerAlign: 'center',
            formatter: 'formatShortDate'
          },
          {
            field: 'publishTime',
            title: '发布时间',
            minWidth: 200,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            title: '操作',
            width: 140,
            align: 'center',
            headerAlign: 'center',
            fixed: 'right',
            slots: { default: 'operate' }
          }
        ],
        importConfig: {
          remote: true,
          importMethod: this.importMethod,
          types: ['xlsx'],
          modes: ['insert']
        },
        exportConfig: {
          // 默认选中类型
          type: 'csv',
          // 局部自定义类型
          types: ['xlsx', 'csv', 'html', 'xml', 'txt'],
          // 自定义数据量列表
          modes: ['current', 'all']
        },
        checkboxConfig: {
          reserve: true,
          highlight: true,
          range: true
        },
        editRules: {
          name: [
            { required: true, message: 'app.body.valid.rName' },
            { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
          ],
          email: [{ required: true, message: '邮件必须填写' }],
          role: [{ required: true, message: '角色必须填写' }]
        },
        editConfig: {
          trigger: 'click',
          mode: 'row',
          showStatus: true
        }
      }
    }
  },
  computed: {
  },
  created() {
    this.listAllDepartment()
  },

  methods: {
    checkColumnMethod({ column }) {
      if (['nickname', 'role'].includes(column.property)) {
        return false
      }
      return true
    },
    importMethod({ file }) {
      return false
    },
    exportMethod({ options }) {
      return false
    },
    toggleFolding() {
      this.folding = !this.folding
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.dataGrid.commitProxy('reload')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleCreate() {
      this.$router.push('/task/task-add')
      return
      /*
      this.temp = Object.assign({}, this.initCreateData)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      */
    },
    handleBatchDelete() {
      const selectRecords = this.$refs.dataGrid.getCheckboxRecords()
      const batchDeleteData = []
      if (!(typeof selectRecords === 'undefined' || selectRecords === null || selectRecords === '' || selectRecords.length === 0)) {
        this.$confirm('永久删除记录吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          for (let index = 0, len = selectRecords.length; index < len; index++) {
            const id = selectRecords[index].['id']
            const version = selectRecords[index].['version']
            const temp = {
              id: id,
              version: version
            }
            batchDeleteData.push(temp)
          }
          batchDeleteTask(batchDeleteData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              } else {
                this.$message.error('删除失败')
              }
              this.$refs.dataGrid.commitProxy('reload')
            })
            .catch(e => {
              this.loading = false
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          showClose: true,
          message: '请先选择需要删除的记录'
        })
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    initFormSafeSubmitConfig() {
      this.loadingSubmitButton = false
      this.submitButtonText = '提交'
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.temp)
          saveTask(tempData)
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
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.temp)
          updateTask(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '修改操作成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
                this.dialogFormVisible = false
                this.$refs.dataGrid.commitProxy('reload')
              } else {
                this.$message.error('修改操作失败')
                this.initFormSafeSubmitConfig()
              }
            })
            .catch(e => {
              this.loading = false
              this.initFormSafeSubmitConfig()
            })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('永久删除该条记录吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        const { id, version } = row
        const tempData = Object.assign({
          id: id,
          version: version
        })
        deleteTask(tempData)
          .then(response => {
            const result = response.data
            if (result) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message.error('删除失败')
            }
            this.$refs.dataGrid.commitProxy('reload')
          })
          .catch(e => {
            this.loading = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    viewRow(row) {
      this.$router.push({
        name: 'task-detail',
        query: {
          id: row.id
        }
      })
      return
    },
    beforeHandleCommand(command, row) {
      return {
        command: command,
        row: row
      }
    },
    handleCommand(command) {
      switch (command.command) {
        case 'handleDelete':
          this.handleDelete(command.row)
          break
        case 'viewRow':
          this.viewRow(command.row)
          break
        default:
      }
    },
    listAllDepartment() {
      listAllDepartment()
        .then(response => {
          const data = response.data
          this.departmentOptionData = data
        })
        .catch(e => {
          this.loading = false
        })
    },
    listAllPerson4Department(departmentId) {
      listAllPerson4Department({
        departmentId: departmentId
      })
        .then(response => {
          const data = response.data
          this.personOptionData = data
          this.receiverId = ''
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleChangeDepartment(val) {
      console.log(val)
      this.listAllPerson4Department(val)
    },
    handleChangePerson(val) {

    },
    formatStatus({ cellValue, row, column }) {
      let result = ''
      const status = row.status
      switch (status) {
        case 0:
          result = '待签收'
          break
        case 1:
          result = '已签收'
          break
        case 2:
          result = '已处理'
          break
        case 3:
          result = '已完成'
          break
        case 4:
          result = '已驳回'
          break
        default:
      }
      return result
    }
  }
}
</script>
