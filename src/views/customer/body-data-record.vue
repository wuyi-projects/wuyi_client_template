<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never" style="margin-bottom:16px;">
      <el-form
        ref="searchForm"
        :model="searchFormData"
        :rules="rules"
        label-width="120px"
        size="small"
      >
        <el-col :span="8">
          <el-form-item label="数据编号" prop="id">
            <el-input v-model="searchFormData.id" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
            <el-col style="text-align: center;" :span="2">-</el-col>
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
        <el-col :span="8">
          <el-form-item style="float: right;" label-width="0">
            <el-button @click="resetForm('searchForm')">重 置</el-button>
            <el-button
              type="primary"
              @click="submitForm('searchForm')"
            >查 询</el-button>
            <!--<el-button
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
            /></el-button>-->
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>

    <!--数据展示-->
    <el-card class="box-card" shadow="never" :style="{height:defaultHeight}">
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
            <el-button
              type="primary"
              @click.native.prevent="handleBatchDelete()"
            >批量删除</el-button>
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
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="formData"
        label-position="right"
        label-width="80px"
        style="width: 100%; padding:10px;"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="账户编号" prop="openId">
              <el-input
                v-model="formData.openId"
                placeholder="请输入账户编号"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型" prop="type">
              <el-input
                v-model="formData.type"
                placeholder="请输入类型"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="次数" prop="times">
              <el-input
                v-model="formData.times"
                placeholder="请输入次数"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="体重" prop="weight">
              <el-input
                v-model="formData.weight"
                placeholder="请输入体重"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="BB" prop="bbValue">
              <el-input
                v-model="formData.bbValue"
                placeholder="请输入BB"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="BP左" prop="bpLeftValue">
              <el-input
                v-model="formData.bpLeftValue"
                placeholder="请输入BP左"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="BP右" prop="bpRightValue">
              <el-input
                v-model="formData.bpRightValue"
                placeholder="请输入BP右"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上胸围" prop="upperChestValue">
              <el-input
                v-model="formData.upperChestValue"
                placeholder="请输入上胸围"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下胸围" prop="underChestValue">
              <el-input
                v-model="formData.underChestValue"
                placeholder="请输入下胸围"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="胃围" prop="gastricValue">
              <el-input
                v-model="formData.gastricValue"
                placeholder="请输入胃围"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="腰围" prop="waistlineValue">
              <el-input
                v-model="formData.waistlineValue"
                placeholder="请输入腰围"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="腹围" prop="abdominalValue">
              <el-input
                v-model="formData.abdominalValue"
                placeholder="请输入腹围"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="臀围" prop="hiplineValue">
              <el-input
                v-model="formData.hiplineValue"
                placeholder="请输入臀围"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="臀高" prop="armHigh">
              <el-input
                v-model="formData.armHigh"
                placeholder="请输入臀高"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="左大腿" prop="leftThighValue">
              <el-input
                v-model="formData.leftThighValue"
                placeholder="请输入左大腿"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="右大腿" prop="rightThighValue">
              <el-input
                v-model="formData.rightThighValue"
                placeholder="请输入右大腿"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="记录日期" prop="recordTime">
              <el-input
                v-model="formData.recordTime"
                placeholder="请输入记录日期"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="status">
              <el-input
                v-model="formData.status"
                placeholder="请输入状态"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认时间" prop="confirmTime">
              <el-input
                v-model="formData.confirmTime"
                placeholder="请输入确认时间"
                clearable
              />
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

import { listBodyDataRecord, saveBodyDataRecord, deleteBodyDataRecord, batchDeleteBodyDataRecord, updateBodyDataRecord } from '@/api/body-data-record'

export default {
  data() {
    return {
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
        permission: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 5, message: '长度大于 5 个字符', trigger: 'blur' }
        ]
      },
      formData: {
        id: null,
        openId: null,
        type: null,
        times: null,
        weight: null,
        bbValue: null,
        bpLeftValue: null,
        bpRightValue: null,
        upperChestValue: null,
        underChestValue: null,
        gastricValue: null,
        waistlineValue: null,
        abdominalValue: null,
        hiplineValue: null,
        armHigh: null,
        leftThighValue: null,
        rightThighValue: null,
        recordTime: null,
        status: null,
        confirmTime: null,
        version: 0
      },
      initCreateData: {
        id: null,
        openId: null,
        type: null,
        times: null,
        weight: null,
        bbValue: null,
        bpLeftValue: null,
        bpRightValue: null,
        upperChestValue: null,
        underChestValue: null,
        gastricValue: null,
        waistlineValue: null,
        abdominalValue: null,
        hiplineValue: null,
        armHigh: null,
        leftThighValue: null,
        rightThighValue: null,
        recordTime: null,
        status: null,
        confirmTime: null,
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
        id: 'data_table',
        rowId: 'id',
        headerAlign: 'center',
        scrollY: { gt: -1 },
        printConfig: {
          columns: [
            { field: 'id' },
            { field: 'openId' },
            { field: 'type' },
            { field: 'times' },
            { field: 'weight' },
            { field: 'bbValue' },
            { field: 'bpLeftValue' },
            { field: 'bpRightValue' },
            { field: 'upperChestValue' },
            { field: 'underChestValue' },
            { field: 'gastricValue' },
            { field: 'waistlineValue' },
            { field: 'abdominalValue' },
            { field: 'hiplineValue' },
            { field: 'armHigh' },
            { field: 'leftThighValue' },
            { field: 'rightThighValue' },
            { field: 'recordTime' },
            { field: 'status' },
            { field: 'confirmTime' }
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
                if (!(typeof value === 'undefined' || value === null || value === '')) {
                  searchData[key] = value
                }
              }
              const end = this.searchFormData.end
              console.log(JSON.stringify(end))
              if (end) {
                searchData.end = this.$moment(end).add(1, 'days').format('YYYY-MM-DD')
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
              return listBodyDataRecord(result)
            }
          }
        },
        columns: [
          { type: 'checkbox',
            width: 40,
            align: 'center'
          },
          {
            field: 'id',
            title: '编号',
            width: 140,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'openId',
            title: '账户编号',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'type',
            title: '类型',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            formatter: this.typeFormatter
          },
          {
            field: 'times',
            title: '次数',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            formatter: this.timesFormatter
          },
          {
            field: 'weight',
            title: '体重',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bbValue',
            title: 'BB',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bpLeftValue',
            title: 'BP左',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bpRightValue',
            title: 'BP右',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'upperChestValue',
            title: '上胸围',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'underChestValue',
            title: '下胸围',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'gastricValue',
            title: '胃围',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'waistlineValue',
            title: '腰围',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'abdominalValue',
            title: '腹围',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'hiplineValue',
            title: '臀围',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'armHigh',
            title: '臀高',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'leftThighValue',
            title: '左大腿',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'rightThighValue',
            title: '右大腿',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'recordTime',
            title: '记录日期',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'status',
            title: '状态',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            formatter: this.statusFormatter
          },
          {
            field: 'confirmTime',
            title: '确认时间',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
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
        }
      }
    }
  },
  computed: {
  },
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
          batchDeleteBodyDataRecord(batchDeleteData)
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
          message: '请选择需要删除的记录'
        })
      }
    },
    handleUpdate(row) {
      this.formData = Object.assign({}, row)
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
          const tempData = Object.assign({}, this.formData)
          saveBodyDataRecord(tempData)
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
          const tempData = Object.assign({}, this.formData)
          updateBodyDataRecord(tempData)
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
        deleteBodyDataRecord(tempData)
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
    typeFormatter({ cellValue, row, column }) {
      let result
      if (!(cellValue === null || cellValue === '')) {
        if (cellValue === 0) {
          result = '目标数据'
        } else if (cellValue === 1) {
          result = '复诊数据'
        }
      } else {
        result = '未知'
      }
      return result
    },
    statusFormatter({ cellValue, row, column }) {
      let result
      if (!(cellValue === null || cellValue === '')) {
        if (cellValue === 0) {
          result = '待确认'
        } else {
          result = '已确认'
        }
      } else {
        result = '未知'
      }
      return result
    },
    timesFormatter({ cellValue, row, column }) {
      return '第' + cellValue + '次'
    }
  }
}
</script>
