<template>
  <div class="app-container">

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

        <!--平台账户标记-->
        <template v-slot:status_default="{ row }">
          <template v-if="row.status === 1">
            <el-tag type="success" effect="dark">成功</el-tag>
          </template>
          <template v-else-if="row.status === 2">
            <el-tag type="danger" effect="dark">失败</el-tag>
          </template>
          <template v-else-if="row.status === 3">
            <el-tag type="warning" effect="dark">停用</el-tag>
          </template>
          <template v-else-if="row.status === 4">
            <el-tag type="info" effect="dark">注销</el-tag>
          </template>
          <template v-else-if="row.status === 5">
            <el-tag type="warning" effect="dark">锁定</el-tag>
          </template>
          <template v-else />
        </template>

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

import { listLoginLog4Me } from '@/api/login-log'

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
        filterConfig: {
          remote: true
        },
        pagerConfig: {
          autoHidden: false,
          pageSize: 20,
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
              return listLoginLog4Me(result)
            }
          }
        },
        columns: [
          {
            field: 'userName',
            title: '用户',
            width: 160,
            align: 'center',
            headerAlign: 'center'
          }, {
            field: 'status',
            title: '登录状态',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center',
            slots: { default: 'status_default' }
          }, {
            field: 'ipAddress',
            title: '登录IP',
            minWidth: 160,
            align: 'center',
            headerAlign: 'center'
          }, {
            field: 'browserInfo',
            title: '浏览器',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          }, {
            field: 'os',
            title: '操作系统',
            minWidth: 140,
            align: 'center',
            headerAlign: 'center'
          }, {
            field: 'operateMessage',
            title: '登录状态',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          }, {
            field: 'loginTime',
            title: '访问时间',
            minWidth: 160,
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
      this.defaultHeight = window.innerHeight - 100 + 'px'
      this.tableHeight = window.innerHeight - 140 + 'px'
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
