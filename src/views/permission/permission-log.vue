<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never" style="margin-bottom: 16px">
      <el-form
        ref="searchForm"
        :model="searchFormData"
        :rules="rules"
        label-width="120px"
        size="small"
      >
        <el-col :span="8">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="searchFormData.username" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登录IP" prop="loginIP">
            <el-input v-model="searchFormData.loginIP" clearable />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
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
              <el-col class="line" :span="2">-</el-col>
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
          </el-col> -->
        <el-col :span="8">
          <el-form-item style="float: right" label-width="0">
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
        <!-- <template v-slot:buttons>
          <el-button-group>
            <el-button @click.native.prevent="handleCreate()">新增</el-button>
            <el-button
              type="primary"
              @click.native.prevent="handleBatchDelete()"
            >批量删除</el-button>
          </el-button-group>
        </template> -->

        <!--是否可用展示-->
        <!-- <template v-slot:available_default="{ row }">
          <template v-if="row.available === 1">
            <el-badge is-dot class="item" type="primary" />启用
          </template>
          <template v-else>
            <el-badge is-dot class="item" type="info" />停用
          </template>
        </template> -->

        <!--数据行操作-->
        <!-- <template v-slot:operate="{ row }">
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
        </template> -->
        <!--自定义空数据模板-->
        <!-- <template v-slot:empty>
          <span>
            <p>没有找到匹配的记录</p>
          </span>
        </template> -->
      </vxe-grid>
    </el-card>

    <!-- 创建/修改表单 -->
  </div>
</template>

<style scoped>
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

import { listLoginLog } from '@/api/login-log'

export default {
  data() {
    return {
      defaultHeight: '500px',
      tableHeight: '460px',
      dialogStatus: '',
      permissionGroupInfoOptions: [],
      folding: false,
      dialogFormVisible: true,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      allPermissionGroup: [],
      defaultTableHeight: 500,
      searchFormData: {
        username: '',
        loginIP: ''
      },
      rules: {
        permission: [
          { required: true, message: '请输入登录IP', trigger: 'blur' },
          { min: 5, message: '长度大于 5 个字符', trigger: 'blur' }
        ]
      },
      temp: {
        id: null,
        permission: '',
        opearateType: '',
        permissionGroupInfoId: null,
        available: 1,
        version: 0
      },
      initCreateData: {
        id: null,
        permission: '',
        description: '',
        permissionGroupInfoId: null,
        available: 1,
        version: 0
      },
      gridOptions: {
        border: 'default',
        size: formatTableSize(),
        resizable: true,
        maxHeight: this.defaultTableHeight,
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
            { field: 'groupName' },
            { field: 'ip' },
            { field: 'loginFlag' }
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
          print: true,
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
              return listLoginLog(result)
            }
          }
        },
        columns: [
          { type: 'checkbox', width: 40, align: 'center' },
          {
            field: 'id',
            title: '用户名',
            width: 140,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'createTime',
            title: '操作时间',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'permission',
            title: '登录IP',
            align: 'center',
            headerAlign: 'center',
            minWidth: 200
          },
          {
            field: 'permissionGroupInfoId',
            title: '登录状态',
            minWidth: 200,
            align: 'center',
            headerAlign: 'center'
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

        editConfig: {
          trigger: 'click',
          mode: 'row',
          showStatus: true
        }
      }
    }
  },
  computed: {},
  /*  */
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
      this.$refs[formName].validate(valid => {
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
    }
  }
}
</script>
