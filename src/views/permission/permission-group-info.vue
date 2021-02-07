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
          <el-form-item label="分组名称" prop="name">
            <el-input v-model="searchFormData.name" clearable />
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
        <el-col :span="8">
          <el-form-item style="float: right;" label-width="0">
            <el-button @click="resetForm('searchForm')">重 置</el-button>
            <el-button
              type="primary"
              @click="submitForm('searchForm')"
            >查 询</el-button>
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
            <el-button
              type="primary"
              @click.native.prevent="handleBatchDelete()"
            >批量删除</el-button>
          </el-button-group>
        </template>

        <!--是否可用展示-->
        <template v-slot:available_default="{ row }">
          <template v-if="row.available === 1">
            <el-badge is-dot class="item" type="primary" />启用
          </template>
          <template v-else>
            <el-badge is-dot class="item" type="info" />停用
          </template>
        </template>

        <!--数据行操作-->
        <template v-slot:operate="{ row }">
          <el-button type="text" @click="handleUpdate(row)">修改</el-button>
          <el-divider direction="vertical" />
          <el-button
            type="text"
            @click="handleManagePermissionGroup(row)"
          >权限分组管理</el-button>
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
        label-width="100px"
        style="width: 100%; padding:10px;"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="权限分组名" prop="groupName">
              <el-input v-model="temp.groupName" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="权限描述" prop="description">
              <el-input
                v-model="temp.description"
                type="textarea"
                rows="5"
                maxlength="100"
                show-word-limit
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

    <!--权限分组管理-->
    <el-drawer
      v-if="permissionGroupDetailDrawer"
      :title="currentGroupInfo.groupName"
      :visible.sync="permissionGroupDetailDrawer"
      direction="rtl"
      size="50%"
    >
      <el-row>
        <el-col :span="24" style="padding:0 20px 20px;">
          <el-row>
            <el-col :span="24">
              <span style="font-size:16px;font-weight:bold;">权限列表</span>
              <el-button
                v-if="currentGroupAllPermissions.length > 0"
                type="text"
                style="margin-left:10px;"
                @click="test()"
              >[清除全部]</el-button>
            </el-col>
            <el-col
              v-if="currentGroupAllPermissions.length < 1"
              :span="24"
              style="margin-top: 10px"
            >
              <el-alert title="暂无下属权限" type="info" :closable="false" />
            </el-col>
            <el-col
              v-for="permission in currentGroupAllPermissions"
              :key="permission.id"
              :span="8"
              style="margin-top: 10px"
            >
              <el-tag closable @close="handleClearGroupInfo(permission)">{{
                permission.description
              }}</el-tag>
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;">
            <el-col :span="24">
              <vxe-grid
                ref="permissionGrid"
                class="custom-table-scrollbar"
                v-bind="permissionGridOptions"
              >
                <!--工具栏按钮-->
                <template v-slot:toolbar_buttons>
                  <el-button
                    type="primary"
                    @click="handleBatchSetGroupInfo"
                  >批量加入分组</el-button>
                </template>

                <template v-slot:tools>
                  <el-form
                    ref="permissionForm"
                    :inline="true"
                    :model="formInline"
                    class="demo-form-inline"
                  >
                    <el-form-item style="margin-bottom: 0;">
                      <el-input
                        v-model="searchPermissionFormData.permission"
                        placeholder="输入权限名或代码模糊查询"
                        clearable
                      />
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0;">
                      <el-button
                        type="primary"
                        @click="submitPermissionForm('permissionForm')"
                      >查询</el-button>
                    </el-form-item>
                  </el-form>
                </template>

                <!--数据行操作-->
                <template v-slot:operate="{ row }">
                  <el-button
                    type="text"
                    @click="handleSetGroupInfo(row)"
                  >加入分组</el-button>
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
        </el-col>
      </el-row>
    </el-drawer>
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
.el-drawer.rtl {
  overflow: scroll;
}
</style>

<script>
import formatTableSize from '@/utils/size'
import { listPermissionGroupInfoByPage, savePermissionGroupInfo, batchDeletePermissionGroupInfo, deletePermissionGroupInfo, updatePermissionGroupInfo, listPermissions4UngroupedWithPage, listAllPermissions4Group, setGroupInfo4Permission, setGroupInfo4Permissions, clearGroupInfo4AllPermissions, clearGroupInfo4Permission } from '@/api/permission'

export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      permissionGroupDetailDrawer: false,
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      textMap: {
        update: '编辑',
        create: '创建',
        detail: '详情'
      },
      activeName: 'first',
      rules: {
        groupName: [
          { required: true, message: '权限分组名称必填', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }]
      },
      temp: {
        id: undefined,
        groupName: '',
        description: '',
        version: 0
      },
      currentGroupInfo: {},
      currentGroupAllPermissions: [],
      tabPosition: 'add',
      folding: false,
      searchFormData: {
        id: '',
        name: '',
        group: '',
        start: '',
        end: '',
        type: [],
        resource: '',
        desc: ''
      },
      searchPermissionFormData: {
        permission: ''
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
      permissionGridOptions: {
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
        height: 500,
        headerAlign: 'center',
        scrollY: { gt: -1 },
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
              const searchFormData = this.searchPermissionFormData
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
              result.permissionGroupInfoId = this.currentGroupInfo.id
              return listPermissions4UngroupedWithPage(result)
            }
          }
        },
        toolbar: {
          slots: {
            buttons: 'toolbar_buttons'
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
            field: 'permission',
            title: '权限名称',
            width: 160,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'description',
            title: '权限描述',
            align: 'left',
            headerAlign: 'center',
            minWidth: 200
          },
          {
            title: '操作',
            width: 120,
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
          groupName: [
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
              return listPermissionGroupInfoByPage(result)
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
            field: 'groupName',
            title: '权限分组名称',
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'description',
            title: '描述',
            align: 'left',
            headerAlign: 'center',
            minWidth: 200,
            showOverflow: false
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
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleManagePermissionGroup(row) {
      this.currentGroupInfo = row
      this.listAllPermissions4Group(row.id)
      this.permissionGroupDetailDrawer = true
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
        deletePermissionGroupInfo(tempData)
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
        case 'viewRow':
          this.viewRow(command.row)
          break
        default:
      }
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
          batchDeletePermissionGroupInfo(batchDeleteData)
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
          savePermissionGroupInfo(tempData)
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
          updatePermissionGroupInfo(tempData)
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
    handleClick() {
    },
    handleDownload() {
    },
    handleImport() {
    },
    submitPermissionForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.permissionGrid.commitProxy('reload')
        } else {
          return false
        }
      })
    },
    listAllPermissions4Group(currentGroupid) {
      listAllPermissions4Group({
        permissionGroupInfoId: currentGroupid
      })
        .then(response => {
          const data = response.data
          this.currentGroupAllPermissions = data
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleBatchSetGroupInfo() {
      const selectRecords = this.$refs.permissionGrid.getCheckboxRecords()
      const batchSetGroupInfoData = []
      if (!(typeof selectRecords === 'undefined' || selectRecords === null || selectRecords === '' || selectRecords.length === 0)) {
        this.$confirm('批量加入分组吗, 是否继续?', '提示', {
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
              permissionGroupInfoId: this.currentGroupInfo.id,
              version: version
            }
            batchSetGroupInfoData.push(temp)
          }

          setGroupInfo4Permissions(batchSetGroupInfoData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  type: 'success',
                  message: '批量加入分组成功'
                })
                this.listAllPermissions4Group(this.currentGroupInfo.id)
                this.$refs.permissionGrid.commitProxy('reload')
              } else {
                this.$message.error('批量加入分组失败')
              }
            })
            .catch(e => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
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
    handleSetGroupInfo(row) {
      setGroupInfo4Permission({
        id: row.id,
        permissionGroupInfoId: this.currentGroupInfo.id,
        version: row.version
      })
        .then(response => {
          const result = response.data
          if (result) {
            this.$message({
              type: 'success',
              message: '加入分组成功'
            })
            this.listAllPermissions4Group(this.currentGroupInfo.id)
            this.$refs.permissionGrid.commitProxy('reload')
          } else {
            this.$message.error('加入分组失败')
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleClearGroupInfo(permission) {
      if (!(typeof permission === 'undefined' || permission === null || permission === '')) {
        this.$confirm('清除 <strong style="color:red;">' + permission.description + '</strong> 权限分组信息吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          clearGroupInfo4Permission(permission)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  type: 'success',
                  message: '清除权限分组信息成功'
                })
                this.listAllPermissions4Group(this.currentGroupInfo.id)
                this.$refs.permissionGrid.commitProxy('reload')
              } else {
                this.$message.error('清除权限分组信息失败')
              }
            })
            .catch(e => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    }, test() {
      const temp = this.currentGroupInfo
      if (!(typeof temp === 'undefined' || temp === null || temp === '')) {
        this.$confirm('清除 <strong style="color:red;">' + temp.groupName + '</strong> 分组下属全部权限的分组信息吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          clearGroupInfo4AllPermissions({
            permissionGroupInfoId: temp.id
          })
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  type: 'success',
                  message: '清除下属权限全部分组信息成功'
                })
                this.listAllPermissions4Group(this.currentGroupInfo.id)
                this.$refs.permissionGrid.commitProxy('reload')
              } else {
                this.$message.error('清除下属权限全部分组信息失败')
              }
            })
            .catch(e => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    }

  }
}
</script>
