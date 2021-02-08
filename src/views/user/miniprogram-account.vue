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
          <el-form-item label="姓名" prop="name">
            <el-input v-model="searchFormData.name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="searchFormData.phone" clearable />
          </el-form-item>
        </el-col>
        <el-col v-if="folding" :span="8">
          <el-form-item label="账号状态" prop="accountStatus">
            <el-select
              v-model="searchFormData.accountStatus"
              placeholder="请选择账号状态"
              style="width:100%"
            >
              <el-option
                v-for="item in accountStatusOptionData"
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
            <!--
            <el-button @click.native.prevent="handleCreate()">新增</el-button>
            <el-button
              type="primary"
              @click.native.prevent="handleBatchDelete()"
            >批量删除</el-button>
            -->
          </el-button-group>
        </template>

        <!--是否可用展示-->
        <template v-slot:accountStatus_default="{ row }">
          <template v-if="row.accountStatus === 0">
            <el-badge is-dot class="item" type="primary" />初始化
          </template>
          <template v-else-if="row.accountStatus === 1">
            <el-badge is-dot class="item" type="success" />正常
          </template>
          <template v-else-if="row.accountStatus === 2">
            <el-badge is-dot class="item" type="info" />停用
          </template>
          <template v-else>
            <el-badge is-dot class="item" type="warning" />未知
          </template>
        </template>

        <!--数据行操作-->
        <template v-slot:operate="{ row }">
          <el-button v-if="row.accountStatus !== 2" type="text" style="color:red;" @click="handleDisable(row)">停用</el-button>
          <el-button v-else type="text" @click="handleEnable(row)">启用</el-button>
          <el-divider direction="vertical" />
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <!--<el-dropdown-item
                :command="beforeHandleCommand('handleDelete', row)"
              >
                删除
              </el-dropdown-item>-->
              <el-dropdown-item
                :command="beforeHandleCommand('handleChangePhone', row)"
              >
                更换手机号码
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
      width="35%"
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
            <el-form-item label="姓名" prop="name">
              <el-input v-model="temp.name" clearable :disabled="dialogStatus == 'changePhone'" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="temp.phone" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="账号状态" prop="accountStatus">
              <el-select
                v-model="temp.accountStatus"
                placeholder="请选择账户状态"
                style="width:100%"
                :disabled="dialogStatus == 'changePhone'"
              >
                <el-option
                  v-for="item in accountStatusOptionData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
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
            @click="dialogStatus === 'create' ? createData() :dialogStatus === 'changePhone'?changePhone(): updateData()"
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
  listMiniProgramBindAccount,
  saveMiniProgramBindAccount,
  deleteMiniProgramBindAccount,
  batchDeleteMiniProgramBindAccount,
  updateMiniProgramBindAccount,
  disableMiniProgramBindAccount,
  enableMiniProgramBindAccount,
  changePhone4MiniProgramBindAccount
} from '@/api/miniprogram'

const validatePhone = (rule, value, callback) => { // 手机正则验证
  if (/^(13[0-9]|14[05679]|15[012356789]|16[2567]|17[012356789]|18[0-9]|19[189])[0-9]{8}$/.test(value) === false
  ) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

export default {
  data() {
    return {
      optionsData: [],
      folding: false,
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      allMiniProgramBindAccountGroup: [],
      textMap: {
        update: '编辑',
        create: '创建',
        detail: '详情',
        changePhone: '更换手机号码'
      },
      searchFormData: {
        id: '',
        name: '',
        phone: '',
        accountStatus: null,
        start: '',
        end: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 2, message: '长度大于等于 2 个字符', trigger: 'blur' }
        ],
        accountStatus: [
          { required: true, message: '请选择账号状态', trigger: 'change' }
        ]
      },
      accountStatusOptionData: [
        {
          code: null,
          name: '全部'
        },
        {
          code: 0,
          name: '初始化'
        }, {
          code: 1,
          name: '正常'
        }, {
          code: 2,
          name: '停用'
        }],
      temp: {
        id: null,
        phone: '',
        name: '',
        accountStatus: null,
        version: 0
      },
      initCreateData: {},
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
        printConfig: {
          columns: [
            { field: 'id' },
            { field: 'permission' },
            { field: 'description' },
            { field: 'available' }
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
              return listMiniProgramBindAccount(result)
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
            field: 'name',
            title: '姓名',
            align: 'center',
            headerAlign: 'center',
            minWidth: 200
          },
          {
            field: 'phone',
            title: '手机号码',
            minWidth: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'accountStatus',
            title: '账号状态',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            filters: [
              { label: '初始化', value: 0 },
              { label: '正常', value: 1 },
              { label: '停用', value: 2 }
            ],
            filterMultiple: false,
            slots: { default: 'accountStatus_default' }
          },
          {
            field: 'miniProgramOpenid',
            title: '微信小程序OpenID',
            minWidth: 200,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'openId',
            title: '统一编号',
            minWidth: 200,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'registrationTime',
            title: '注册时间',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bindTime',
            title: '绑定时间',
            width: 200,
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
    this.initCreateData = this.lodash.cloneDeep(this.temp)
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
      this.temp = Object.assign({}, this.initCreateData)
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
          batchDeleteMiniProgramBindAccount(batchDeleteData)
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
    handleDisable(row) {
      this.$confirm('停用[ <span style="color:red;font-weight:bold;">' + row.name + '(' + row.phone + ')' + '</span> ]微信小程序账号吗, 是否继续?', '提示', {
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
        disableMiniProgramBindAccount(tempData)
          .then(response => {
            const result = response.data
            if (result) {
              this.$message({
                type: 'success',
                message: '停用账号操作成功'
              })
            } else {
              this.$message.error('停用账号操作失败')
            }
            this.$refs.dataGrid.commitProxy('reload')
          })
          .catch(e => {
            this.loading = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    handleEnable(row) {
      const { id, version } = row
      const tempData = Object.assign({
        id: id,
        version: version
      })
      enableMiniProgramBindAccount(tempData)
        .then(response => {
          const result = response.data
          if (result) {
            this.$message({
              type: 'success',
              message: '停用账号操作成功'
            })
          } else {
            this.$message.error('停用账号操作失败')
          }
          this.$refs.dataGrid.commitProxy('reload')
        })
        .catch(e => {
          this.loading = false
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
          saveMiniProgramBindAccount(tempData)
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
          updateMiniProgramBindAccount(tempData)
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
    changePhone() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.temp)
          changePhone4MiniProgramBindAccount(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '更换手机号码操作成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
                this.dialogFormVisible = false
                this.$refs.dataGrid.commitProxy('reload')
              } else {
                this.$message.error('更换手机号码操作失败')
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
        deleteMiniProgramBindAccount(tempData)
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
      this.temp = Object.assign({}, row)
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
        case 'handleChangePhone':
          this.handleChangePhone(command.row)
          break
        case 'viewRow':
          this.viewRow(command.row)
          break
        default:
      }
    },
    handleChangePhone(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'changePhone'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>
