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
        <el-col :span="8">
          <el-form-item label="所属部门" prop="departmentId">
            <el-select
              v-model="searchFormData.departmentId"
              placeholder="请选择部门"
              style="width:100%"
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
        <el-col :span="8">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="searchFormData.email" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="岗位" prop="postId">
            <el-select
              v-model="searchFormData.postId"
              placeholder="请选择岗位"
              style="width:100%"
            >
              <el-option
                v-for="item in postOptionData"
                :key="item.id"
                :label="item.postName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="folding" :span="8">
          <el-form-item label="性别" prop="gender">
            <el-select
              v-model="searchFormData.gender"
              placeholder="请选择性别"
              style="width:100%"
            >
              <el-option
                v-for="item in genderOptionData"
                :key="item.id"
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
            <el-button
              type="primary"
              @click="submitForm('searchForm')"
            >查 询</el-button>
            <el-button
              v-if="folding"
              type="text"
              @click="toggleFolding()"
            >收起
              <i class="el-icon-arrow-up el-icon--right" />
            </el-button>
            <el-button
              v-else
              type="text"
              @click="toggleFolding()"
            >展开
              <i class="el-icon-arrow-down el-icon--right" />
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
            <!--<el-button
              type="primary"
              @click.native.prevent="handleBatchDelete()"
            >批量删除</el-button>-->
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
          <el-button type="text" @click="handleRegionalManage(row)">所属区域管理</el-button>
          <el-divider direction="vertical" />
          <el-button type="text" @click="handleUpdate(row)">修改</el-button>
          <el-divider direction="vertical" />
          <el-button type="text" @click="handleView(row)">详情</el-button>
          <!--<el-dropdown @command="handleCommand">
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
          </el-dropdown>-->
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
        :model="temp"
        label-position="right"
        label-width="80px"
        style="width: 100%; padding:10px;"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="temp.name" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="temp.gender"
                placeholder="请选择性别"
                style="width:100%"
              >
                <el-option
                  v-for="item in genderOptionData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="temp.phone" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="departmentId">
              <el-select
                v-model="temp.departmentId"
                placeholder="请选择部门"
                style="width:100%"
                :disabled="!(dialogStatus == 'create')"
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
            <el-form-item label="岗位" prop="postId">
              <el-select
                v-model="temp.postId"
                placeholder="请选择岗位"
                style="width:100%"
                :disabled="!(dialogStatus == 'create')"
              >
                <el-option
                  v-for="item in postOptionData"
                  :key="item.id"
                  :label="item.postName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="temp.email" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="直属上级">
              <el-select v-model="currSelectedSuperiorID" placeholder="请选择">
                <template v-for="item in allPersonData">
                  <el-option
                    v-if="!item.target"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </template>
              </el-select>
              <el-button @click="handleSelected()">
                添加
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="">
              <template v-for="item in allPersonData">
                <el-tag
                  v-if="item.target"
                  :key="item.id"
                  closable
                  style="margin-right:10px;"
                  @close="handleClearSelected(item)"
                >
                  {{ item.name }}
                </el-tag>
              </template>
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

import { listPerson, savePerson, deletePerson, batchDeletePerson, updatePerson, listAllPerson, listAllSuperior4Person } from '@/api/person'
import { listAllDepartment } from '@/api/department'
import { listAllPost } from '@/api/post'

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
      currSelectedSuperiorID: null,
      allPersonData: [],
      optionsData: [],
      folding: false,
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      allPersonGroup: [],
      departmentOptionData: [],
      postOptionData: [],
      textMap: {
        update: '编辑',
        create: '创建',
        detail: '详情'
      },
      genderOptionData: [
        {
          code: 1,
          name: '男'
        }, {
          code: 0,
          name: '女'
        }
      ],
      searchFormData: {
        id: null,
        start: null,
        end: null,
        name: null,
        gender: null,
        departmentId: null,
        postId: null,
        phone: null,
        email: null
      },
      rules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 2, message: '长度大于等于 2 个字符', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }],
        departmentId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
        postId: [{ required: true, message: '请选择岗位', trigger: 'blur' }]
      },
      temp: {
        id: null,
        openId: null,
        name: '',
        gender: null,
        departmentId: null,
        postId: null,
        phone: '',
        email: '',
        version: 0,
        superiorCreateList: [],
        superiorDeleteList: []
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
              return listPerson(result)
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
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'phone',
            title: '手机号码',
            minWidth: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'gender',
            title: '性别',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            formatter: 'formatSex'
          },
          {
            field: 'departmentName',
            title: '部门名称',
            align: 'center',
            headerAlign: 'center',
            minWidth: 200
          },
          {
            field: 'postName',
            title: '岗位',
            minWidth: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'email',
            title: '邮箱',
            minWidth: 200,
            align: 'center',
            headerAlign: 'center',
            visible: false
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
    this.listAllDepartment()
    this.listAllPost()
    this.listAllPerson()
    this.initCreateData = this.lodash.cloneDeep(this.createData)
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
          batchDeletePerson(batchDeleteData)
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

      this.listAllSuperior4Person(row.openId)

      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleRegionalManage(row) {
      this.$router.push({
        name: 'user-regional-manage',
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
          this.temp.superiorCreateList = this.handleSuperiorCreateList()
          this.temp.superiorDeleteList = this.handleSuperiorDeleteList()
          const tempData = Object.assign({}, this.temp)
          savePerson(tempData)
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
                this.listAllPerson()
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
    handleSuperiorCreateList() {
      const superiorCreateList = []
      if (this.allPersonData && this.allPersonData.length > 0) {
        for (var index = 0, len = this.allPersonData.length; index < len; index++) {
          const temp = this.allPersonData[index]
          if (!temp.orig && temp.target) {
            superiorCreateList.push(temp.id)
          }
        }
      }
      return superiorCreateList
    },
    handleSuperiorDeleteList() {
      const superiorDeleteList = []
      if (this.allPersonData && this.allPersonData.length > 0) {
        for (var index = 0, len = this.allPersonData.length; index < len; index++) {
          const temp = this.allPersonData[index]
          if (temp.orig && !temp.target) {
            superiorDeleteList.push(temp.id)
          }
        }
      }
      return superiorDeleteList
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          this.temp.superiorCreateList = this.handleSuperiorCreateList()
          this.temp.superiorDeleteList = this.handleSuperiorDeleteList()
          const tempData = Object.assign({}, this.temp)
          updatePerson(tempData)
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
                this.listAllPerson()
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
        deletePerson(tempData)
          .then(response => {
            const result = response.data
            if (result) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.listAllPerson()
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
    handleView(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'detail'

      this.listAllSuperior4Person(row.openId)

      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    viewRow(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'detail'

      this.listAllSuperior4Person(row.openId)

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
    listAllPost() {
      listAllPost()
        .then(response => {
          const data = response.data
          this.postOptionData = data
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleSelected() {
      for (var index = 0, len = this.allPersonData.length; index < len; index++) {
        const temp = this.allPersonData[index]
        if (temp.id === this.currSelectedSuperiorID) {
          this.$set(temp, 'target', true)
        }
      }
      this.currSelectedSuperiorID = null
    },
    handleClearSelected(person) {
      for (var index = 0, len = this.allPersonData.length; index < len; index++) {
        const temp = this.allPersonData[index]
        if (temp.id === person.id) {
          this.$set(temp, 'target', false)
        }
      }
    },
    listAllPerson() {
      listAllPerson()
        .then(response => {
          const data = response.data
          if (data && data.length > 0) {
            for (var index = 0, len = data.length; index < len; index++) {
              data[index].orig = false
              data[index].target = false
            }
            this.allPersonData = data
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    listAllSuperior4Person(openId) {
      listAllSuperior4Person({
        openId: openId })
        .then(response => {
          const data = response.data
          this.resetAllPersonData()
          if (data && data.length > 0) {
            for (var index = 0, len = data.length; index < len; index++) {
              for (var index2 = 0, len2 = this.allPersonData.length; index2 < len2; index2++) {
                if (data[index].id === this.allPersonData[index2].id) {
                  this.$set(this.allPersonData[index2], 'orig', true)
                  this.$set(this.allPersonData[index2], 'target', true)
                  continue
                }
              }
            }
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    resetAllPersonData() {
      for (var index = 0, len = this.allPersonData.length; index < len; index++) {
        this.$set(this.allPersonData[index], 'orig', false)
        this.$set(this.allPersonData[index], 'target', false)
      }
    }
  }
}
</script>
