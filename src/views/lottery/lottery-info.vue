<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never" style="margin-bottom: 16px">
      <el-form
        ref="searchForm"
        :model="searchFormData"
        :rules="searchRules"
        label-width="120px"
        size="small"
      >
        <el-col :span="8">
          <el-form-item label="抽奖名称" prop="title">
            <el-input v-model="searchFormData.title" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="抽奖类型" prop="type">
            <el-select
              v-model="formData.type"
              placeholder="选择抽奖类型"
              style="width:100%"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.value"
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
                  style="width: 100%"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col style="text-align: center" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="end">
                <el-date-picker
                  v-model="searchFormData.end"
                  type="date"
                  placeholder="结束时间"
                  style="width: 100%"
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
        <el-col v-if="folding" :span="8">
          <el-form-item />
        </el-col>
        <el-col :span="8">
          <el-form-item style="float: right" label-width="0">
            <el-button @click="resetForm('searchForm')">重 置</el-button>
            <el-button
              type="primary"
              @click="submitForm('searchForm')"
            >查 询</el-button>
            <el-button
              v-if="folding"
              type="text"
              @click="toggleFolding()"
            >收起<i
              class="el-icon-arrow-up el-icon--right"
            /></el-button>
            <el-button
              v-else
              type="text"
              @click="toggleFolding()"
            >展开<i
              class="el-icon-arrow-down el-icon--right"
            /></el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>

    <!--数据展示-->
    <el-card class="box-card" shadow="never" :style="{ height: defaultHeight }">
      <vxe-grid
        ref="dataGrid"
        class="custom-table-scrollbar"
        v-bind="gridOptions"
        :height="tableHeight"
      >
        <!--工具栏按钮-->
        <template v-slot:buttons>
          <el-button-group>
            <el-button @click.native.prevent="handleCreate()">新增</el-button>
            <!-- <el-button
              type="primary"
              @click.native.prevent="handleBatchDelete()"
            >批量删除</el-button> -->
          </el-button-group>
        </template>

        <!--插槽使用示例:是否可用展示-->
        <!-- <template v-slot:available_default="{ row }">
          <template v-if="row.available === 1">
            <el-badge is-dot class="item" type="primary" />启用
          </template>
          <template v-else>
            <el-badge is-dot class="item" type="info" />停用
          </template>
        </template> -->

        <!--数据行操作-->
        <template v-slot:operate="{ row }">
          <el-button
            type="text"
            style="color: red"
            @click="handleSettingLottery(row)"
          >抽奖管理</el-button>
          <el-divider direction="vertical" />
          <el-button
            type="text"
            @click="handleViewLotteryRecord(row)"
          >抽奖记录</el-button>
          <el-divider direction="vertical" />
          <el-button type="text" @click="handleUpdate(row)">修改</el-button>
          <!-- <el-divider direction="vertical" />
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
          </el-dropdown> -->
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
      width="60%"
      custom-class="custom-dialog"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="formData"
        label-position="right"
        label-width="120px"
        style="width: 100%; padding: 10px"
      >
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="抽奖编号" prop="uniqueNumber">
              <el-input
                v-model="formData.uniqueNumber"
                placeholder="请输入抽奖编号"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="抽奖类型" prop="type">
              <el-radio-group v-model="formData.type">
                <el-radio :label="1">普通抽奖</el-radio>
                <el-radio :label="2">终极大奖</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签到名称" prop="signUpInfoId">
              <el-select
                v-model="formData.signUpInfoId"
                placeholder="选择签到信息"
                style="width: 100%"
              >
                <el-option
                  v-for="item in currentSignUpInfoOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="抽奖名称" prop="title">
              <el-input
                v-model="formData.title"
                placeholder="请输入抽奖名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="奖金金额"
              prop="amount"
              :rules="
                formData.type === 2
                  ? rules.amount
                  : [
                    {
                      required: false,
                      message: '请填写奖金金额',
                      trigger: 'blur',
                    },
                  ]
              "
            >
              <el-input
                v-model="formData.amount"
                placeholder="请输入奖金金额"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="抽奖日期" prop="lotteryDate">
              <el-date-picker
                v-model="formData.lotteryDate"
                placeholder="选择抽奖日期"
                type="date"
                style="width: 100%"
                :picker-options="lotteryDatepickerOptions"
                value-format="yyyy-MM-dd"
                @focus="clickLotteryDateDatepicker"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否开启" prop="onOff">
              <el-radio-group v-model="formData.onOff">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="抽奖截止时间" prop="deadline">
              <el-date-picker
                v-model="formData.deadline"
                placeholder="选择抽奖截止时间"
                type="date"
                style="width: 100%"
                :picker-options="deadlineDatepickerOptions"
                value-format="yyyy-MM-dd"
                @focus="clickDeadlineDatepicker"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="奖券过期时间" prop="expirationTime">
              <el-date-picker
                v-model="formData.expirationTime"
                placeholder="选择奖券过期时间"
                type="date"
                style="width: 100%"
                :picker-options="expirationTimeDatepickerOptions"
                value-format="yyyy-MM-dd"
                @focus="clickExpirationTimeDatepicker"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-if="dialogStatus !== 'detail'">
          <el-button @click="resetForm('dataForm')"> 重置 </el-button>
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
.custom-dialog {
  min-width: 695px;
}
</style>

<script>
import formatTableSize from '@/utils/size'

import {
  listCurrentSignUpInfo
} from '@/api/sign-up-info'

import {
  listLotteryInfo,
  saveLotteryInfo,
  deleteLotteryInfo,
  batchDeleteLotteryInfo,
  updateLotteryInfo
} from '@/api/lottery-info'

export default {
  data() {
    return {
      currentSignUpInfoOptions: [],
      defaultHeight: '500px',
      tableHeight: '460px',
      permissionGroupInfoOptions: [],
      folding: false,
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      textMap: {
        update: '编辑',
        create: '创建',
        detail: '详情'
      },
      searchFormData: {
        id: '',
        start: '',
        end: ''
      },
      rules: {
        type: [{ required: true, message: '请选择抽奖类型', trigger: 'blur' }],
        signUpInfoId: [{ required: true, message: '请选择签到信息', trigger: 'blur' }],
        title: [
          { required: true, message: '请选择抽奖名称', trigger: 'blur' },
          { min: 5, message: '长度不少于 5 个字符', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请填写奖金金额', trigger: 'blur' }
        ],
        onOff: [{ required: true, message: '请选择抽奖开关', trigger: 'blur' }],
        lotteryDate: [
          { required: true, message: '请选择抽奖日期', trigger: 'blur' }
        ],
        deadline: [
          { required: true, message: '请选择抽奖截止日期', trigger: 'blur' }
        ],
        expirationTime: [
          { required: true, message: '请选择奖券过期日期', trigger: 'blur' }
        ]
      },
      searchRules: {},
      formData: {
        id: null,
        uniqueNumber: null,
        type: null,
        title: null,
        amount: null,
        onOff: null,
        lotteryDate: null,
        deadline: null,
        expirationTime: null,
        version: 0
      },
      initCreateData: {
        id: null,
        uniqueNumber: null,
        type: null,
        title: null,
        amount: null,
        onOff: null,
        lotteryDate: null,
        deadline: null,
        expirationTime: null,
        version: 0
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      // 抽奖日期
      lotteryDatepickerOptions: {},
      // 抽奖截止时间
      deadlineDatepickerOptions: {},
      // 奖券过期时间
      expirationTimeDatepickerOptions: {},
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
        id: 'data_table',
        rowId: 'id',
        headerAlign: 'center',
        scrollY: { gt: -1 },
        printConfig: {
          columns: [
            { field: 'id' },
            { field: 'uniqueNumber' },
            { field: 'type' },
            { field: 'signUpInfoId' },
            { field: 'signUpName' },
            { field: 'title' },
            { field: 'amount' },
            { field: 'onOff' },
            { field: 'lotteryDate' },
            { field: 'deadline' },
            { field: 'expirationTime' }
          ]
        },
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
          autoHidden: false,
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
          print: false,
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
                if (
                  !(
                    typeof value === 'undefined' ||
                    value === null ||
                    value === ''
                  )
                ) {
                  searchData[key] = value
                }
              }
              const end = this.searchFormData.end
              console.log(JSON.stringify(end))
              if (end) {
                searchData.end = this.$moment(end)
                  .add(1, 'days')
                  .format('YYYY-MM-DD')
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
              return listLotteryInfo(result)
            }
          }
        },
        columns: [
          { type: 'checkbox', width: 40, align: 'center' },
          {
            field: 'id',
            title: '编号',
            width: 140,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          // {
          //   field: 'uniqueNumber',
          //   title: '抽奖编号',
          //   minWidth: 120,
          //   align: 'center',
          //   headerAlign: 'center'
          // },
          {
            field: 'type',
            title: '抽奖类型',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            formatter: this.typeFormatter
          },
          {
            field: 'signUpInfoId',
            title: '关联签到信息编号',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'signUpName',
            title: '关联签到名称',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'title',
            title: '抽奖名称',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'amount',
            title: '奖金金额',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'onOff',
            title: '是否开启',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            formatter: this.onOffFormatter
          },
          {
            field: 'lotteryDate',
            title: '抽奖日期',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            formatter: 'formatShortDate'
          },
          {
            field: 'deadline',
            title: '抽奖截止时间',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            formatter: 'formatShortDate'
          },
          {
            field: 'expirationTime',
            title: '奖券过期时间',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            formatter: 'formatShortDate'
          },
          {
            title: '操作',
            width: 220,
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
        }
      },
      typeOptions: [
        { name: '普通抽奖',
          value: 1
        },
        { name: '终极大奖',
          value: 2
        }
      ]
    }
  },
  computed: {},
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  methods: {
    /* 自适应高度 */
    getHeight() {
      this.defaultHeight = window.innerHeight - 180 + 'px'
      this.tableHeight = window.innerHeight - 220 + 'px'
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
      this.listCurrentSignUpInfo()
      this.formData = Object.assign({}, this.initCreateData)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleBatchDelete() {
      const selectRecords = this.$refs.dataGrid.getCheckboxRecords()
      const batchDeleteData = []
      if (
        !(
          typeof selectRecords === 'undefined' ||
          selectRecords === null ||
          selectRecords === '' ||
          selectRecords.length === 0
        )
      ) {
        this.$confirm('永久删除记录吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        })
          .then(() => {
            for (
              let index = 0, len = selectRecords.length;
              index < len;
              index++
            ) {
              const id = selectRecords[index]['id']
              const version = selectRecords[index]['version']
              const temp = {
                id: id,
                version: version
              }
              batchDeleteData.push(temp)
            }
            batchDeleteLotteryInfo(batchDeleteData)
              .then((response) => {
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
              .catch((e) => {
                this.loading = false
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$message({
          showClose: true,
          message: '请选择需要删除的记录'
        })
      }
    },
    handleUpdate(row) {
      this.listCurrentSignUpInfo()
      this.formData = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleSettingLottery(row) {
      this.$router.push({
        name: 'lottery-roster-manage',
        query: {
          id: row.id
        }
      })
    },
    handleViewLotteryRecord(row) {
      this.$router.push({
        name: 'lottery-record-detail',
        query: {
          id: row.id
        }
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
          const tempData = Object.assign({}, this.formData)
          saveLotteryInfo(tempData)
            .then((response) => {
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
            .catch((e) => {
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
          const formData = this.formData
          if (formData && formData.amount === '') {
            formData.amount = 0
          }
          const tempData = Object.assign({}, formData)
          updateLotteryInfo(tempData)
            .then((response) => {
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
            .catch((e) => {
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
      })
        .then(() => {
          const { id, version } = row
          const tempData = Object.assign({
            id: id,
            version: version
          })
          deleteLotteryInfo(tempData)
            .then((response) => {
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
            .catch((e) => {
              this.loading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    viewRow(row) {
      this.formData = Object.assign({}, row)
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
    clickLotteryDateDatepicker() {
      this.lotteryDatepickerOptions.disabledDate = (time) => {
        if (this.formData.deadline) {
          if (time.getTime() > new Date(this.formData.deadline).getTime()) {
            return true
          }
          if (time.getTime() < Date.now() - 8.64e7) {
            return true
          }
        } else {
          if (time.getTime() < Date.now() - 8.64e7) {
            return true
          }
        }
      }
    },
    clickDeadlineDatepicker() {
      this.deadlineDatepickerOptions.disabledDate = (time) => {
        if (this.formData.lotteryDate) {
          return time.getTime() < new Date(this.formData.lotteryDate).getTime()
        } else {
          return time.getTime() < Date.now()
        }
      }
    },
    clickExpirationTimeDatepicker() {
      this.expirationTimeDatepickerOptions.disabledDate = (time) => {
        if (this.formData.lotteryDate) {
          return time.getTime() < new Date(this.formData.lotteryDate).getTime()
        } else {
          return time.getTime() < Date.now()
        }
      }
    },
    typeFormatter({ cellValue, row, column }) {
      let result
      if (!(cellValue === null || cellValue === '')) {
        if (cellValue === 1) {
          result = '普通抽奖'
        } else if (cellValue === 2) {
          result = '超级大奖'
        }
      } else {
        result = '未知'
      }
      return result
    },
    onOffFormatter({ cellValue, row, column }) {
      let result
      if (!(cellValue === null || cellValue === '')) {
        if (cellValue === 0) {
          result = '关闭'
        } else if (cellValue === 1) {
          result = '开启'
        }
      } else {
        result = '未知'
      }
      return result
    },
    listCurrentSignUpInfo() {
      const that = this
      listCurrentSignUpInfo({
        page: 1,
        size: 100
      })
        .then((response) => {
          const data = response.data
          that.currentSignUpInfoOptions = data
        })
        .catch((e) => {
          that.loading = false
        })
    }
  }
}
</script>
