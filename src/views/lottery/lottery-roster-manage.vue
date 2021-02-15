<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never" style="margin-bottom: 16px">
      <el-page-header :content="pageTitle" @back="goBack" />
      <el-divider />
      <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="未配置（签到）人员名单" name="unlinked">
          <el-row :style="{ height: defaultHeight }">
            <el-col>
              <vxe-grid
                ref="dataUnlinkedGrid"
                class="custom-table-scrollbar"
                v-bind="gridUnlinkedOptions"
                :height="tableHeight"
              >
                <!--工具栏按钮-->
                <template v-slot:buttons>
                  <el-button-group>
                    <!-- <el-button @click.native.prevent="handleCreate()">新增</el-button> -->
                    <el-button
                      type="primary"
                      @click.native.prevent="handleBatchLinked()"
                    >批量加入抽奖</el-button>
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
                    @click="handleLinked(row)"
                  >加入抽奖名单</el-button>
                  <!-- <el-button type="text" @click="handleUpdate(row)">修改</el-button>
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
                  </el-dropdown> -->
                </template>
                <!--自定义空数据模板-->
                <template v-slot:empty>
                  <span>
                    <p>没有找到匹配的记录</p>
                  </span>
                </template>
              </vxe-grid>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="已配置（签到）人员名单" name="linked">
          <el-row :style="{ height: defaultHeight }">
            <el-col>
              <vxe-grid
                ref="dataGrid"
                class="custom-table-scrollbar"
                v-bind="gridOptions"
                :height="tableHeight"
              >
                <!--工具栏按钮-->
                <template v-slot:buttons>
                  <el-button-group>
                    <!-- <el-button
                      @click.native.prevent="handleCreate()"
                    >新增</el-button> -->
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

                  <el-button
                    v-if="lotteryType === 1"
                    style="color:red;"
                    type="text"
                    @click="handleUserLotteryConfig(row)"
                  >个人奖券配置</el-button>
                  <el-divider
                    v-if="lotteryType === 1"
                    direction="vertical"
                  />
                  <el-button
                    type="text"
                    @click="handleUpdate(row)"
                  >修改</el-button>
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
                      <!-- <el-dropdown-item
                        :command="beforeHandleCommand('viewRow', row)"
                        divided
                      >
                        详情
                      </el-dropdown-item> -->
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
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
        label-width="120px"
        style="width: 100%; padding: 10px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="抽奖信息编号" prop="lotteryInfoId">
              <el-input
                v-model="formData.lotteryInfoId"
                placeholder="请输入抽奖信息编号"
                disabled
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户编号" prop="openId">
              <el-input
                v-model="formData.openId"
                placeholder="请输入账户编号"
                disabled
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input
                v-model="formData.phone"
                placeholder="请输入手机号码"
                disabled
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备用号码" prop="phone2">
              <el-input
                v-model="formData.phone2"
                placeholder="请输入备用号码"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入姓名"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="头像" prop="photoUrl">
              <el-input
                v-model="formData.photoUrl"
                placeholder="请输入头像"
                clearable
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
</style>

<script>
import formatTableSize from '@/utils/size'

import { getLotteryInfo } from '@/api/lottery-info'

import {
  listUnlinkedSignUp,
  listLotteryRoster,
  saveLotteryRoster,
  deleteLotteryRoster,
  batchDeleteLotteryRoster,
  updateLotteryRoster,
  batchLinkRoster
} from '@/api/lottery-roster'

export default {
  data() {
    return {
      pageTitle: '抽奖名单管理',
      lotteryInfoId: null,
      lotteryType: null,
      lotteryInfo: {},
      activeName: 'linked',
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
        lotteryInfoId: null,
        openId: null,
        phone: null,
        phone2: null,
        name: null,
        photoUrl: null,
        version: 0
      },
      initCreateData: {
        id: null,
        lotteryInfoId: null,
        openId: null,
        phone: null,
        phone2: null,
        name: null,
        photoUrl: null,
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
      gridUnlinkedOptions: {
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
            { field: 'lotteryInfoId' },
            { field: 'openId' },
            { field: 'phone' },
            { field: 'phone2' },
            { field: 'name' },
            { field: 'photoUrl' }
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
              return listUnlinkedSignUp(result)
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
          {
            field: 'lotteryInfoId',
            title: '抽奖信息编号',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'openId',
            title: '账户编号',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'phone',
            title: '手机号码',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'phone2',
            title: '备用号码',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'name',
            title: '姓名',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'photoUrl',
            title: '头像',
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
            { field: 'lotteryInfoId' },
            { field: 'openId' },
            { field: 'phone' },
            { field: 'phone2' },
            { field: 'name' },
            { field: 'photoUrl' }
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
              if (end) {
                searchData.end = this.$moment(end)
                  .add(1, 'days')
                  .format('YYYY-MM-DD')
              }
              searchData.lotteryInfoId = this.searchFormData.lotteryInfoId

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
              return listLotteryRoster(result)
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
          {
            field: 'lotteryInfoId',
            title: '抽奖信息编号',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'openId',
            title: '账户编号',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'phone',
            title: '手机号码',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'phone2',
            title: '备用号码',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'name',
            title: '姓名',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'photoUrl',
            title: '头像',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            title: '操作',
            width: 240,
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
  computed: {},
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
    const that = this
    const lotteryInfoId = that.$route.query.id
    if (lotteryInfoId) {
      this.lotteryInfoId = lotteryInfoId
      this.searchFormData.lotteryInfoId = lotteryInfoId
      this.getLotteryInfo()
    }
  },
  methods: {
    /* 自适应高度 */
    getHeight() {
      this.defaultHeight = window.innerHeight - 280 + 'px'
      this.tableHeight = window.innerHeight - 320 + 'px'
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
              const id = selectRecords[index].id
              const version = selectRecords[index].version
              const temp = {
                id: id,
                version: version
              }
              batchDeleteData.push(temp)
            }
            batchDeleteLotteryRoster(batchDeleteData)
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
    handleBatchLinked() {
      const selectRecords = this.$refs.dataUnlinkedGrid.getCheckboxRecords()
      const batchLinkedData = []
      if (
        !(
          typeof selectRecords === 'undefined' ||
          selectRecords === null ||
          selectRecords === '' ||
          selectRecords.length === 0
        )
      ) {
        this.$confirm('确认加入抽奖人员吗, 是否继续?', '提示', {
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
              const id = selectRecords[index].id
              const version = selectRecords[index].version
              const temp = {
                id: id,
                version: version,
                lotteryInfoId: this.searchFormData.lotteryInfoId
              }
              batchLinkedData.push(temp)
            }
            batchLinkRoster(batchLinkedData)
              .then((response) => {
                const result = response.data
                if (result) {
                  this.$message({
                    type: 'success',
                    message: '加入成功'
                  })
                } else {
                  this.$message.error('加入失败')
                }
                this.$refs.dataUnlinkedGrid.commitProxy('reload')
              })
              .catch((e) => {
                this.loading = false
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
      } else {
        this.$message({
          showClose: true,
          message: '请选择需要加入的记录'
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
          saveLotteryRoster(tempData)
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
          const tempData = Object.assign({}, this.formData)
          updateLotteryRoster(tempData)
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
          deleteLotteryRoster(tempData)
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
    goBack() {
      this.$router.go(-1)
    },
    handleTabClick(tab, event) {
      const name = tab.name
      switch (name) {
        case 'unlinked':
          this.$refs.dataUnlinkedGrid.commitProxy('reload')
          break
        case 'linked':
          this.$refs.dataGrid.commitProxy('reload')
          break
        default:
      }
    },
    getLotteryInfo() {
      getLotteryInfo({
        id: this.lotteryInfoId
      })
        .then((response) => {
          this.lotteryInfo = response.data
          this.lotteryType = response.data.type
          const type = response.data.type === 1 ? '普通抽奖' : response.data.type === 2 ? '超级大奖' : '抽奖'
          this.pageTitle = '【' + type + '】' + response.data.title + ' / 抽奖名单管理'
        })
        .catch((e) => {
          this.loading = false
        })
    },
    handleUserLotteryConfig(row) {
      this.$router.push({
        name: 'user-lottery-record',
        query: {
          lotteryInfoId: this.lotteryInfoId,
          lotteryRosterId: row.id
        }
      })
    }
  }
}
</script>
