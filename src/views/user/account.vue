<template>
  <div class="app-container">

    <!--查询条件-->
    <el-card class="box-card" shadow="never" style="margin-bottom:16px;">
      <el-form ref="searchForm" :model="searchFormData" label-width="120px" size="small">

        <el-col :span="8">
          <el-form-item label="手机号码" prop="accout">
            <el-input v-model="searchFormData.accout" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户类型" prop="accountType">
            <el-select
              v-model="searchFormData.accountType"
              style="width:100%"
              placeholder="请选择用户类型"
            >
              <el-option label="全部" value="" />
              <el-option label="平台管理" value="5" />
              <el-option label="普通用户" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="folding" :span="8">
          <el-form-item label="起止时间">
            <el-col :span="11">
              <el-form-item prop="start">
                <el-date-picker v-model="searchFormData.start" type="date" placeholder="起始日期" style="width: 100%;" :picker-options="pickerOptions" value-format="yyyy-MM-dd" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="end">
                <el-date-picker v-model="searchFormData.end" type="date" placeholder="结束时间" style="width: 100%;" :picker-options="pickerOptions" value-format="yyyy-MM-dd" />
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
          <el-form-item style="float: right;" label-width="0">
            <el-button @click="resetForm('searchForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('searchForm')">查 询</el-button>
            <el-button v-if="folding" type="text" @click="toggleFolding()">收起<i class="el-icon-arrow-up el-icon--right" /></el-button>
            <el-button v-else type="text" @click="toggleFolding()">展开<i class="el-icon-arrow-down el-icon--right" /></el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>

    <!--数据展示-->
    <el-card class="box-card" shadow="never">

      <vxe-grid ref="dataGrid" v-bind="gridOptions">

        <!--工具栏按钮-->
        <!--
        <template v-slot:buttons>
          <el-radio-group v-model="tabPosition" style="margin-bottom: 3px;">
            <el-radio-button label="add">新增</el-radio-button>
            <el-radio-button label="batchDelete">批量删除</el-radio-button>
          </el-radio-group>
        </template>
        -->

        <!--是否锁定用展示-->
        <template v-slot:locked_default="{ row }">
          <template v-if="row.locked === 100">
            <el-badge is-dot class="item" type="primary" />正常
          </template>
          <template v-else>
            <el-badge is-dot class="item" type="info" />锁定
          </template>
        </template>

        <!--数据行操作-->
        <template v-slot:operate="{ row }">
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
      </vxe-grid></el-card></div></el-card></vxe-grid></template></vxe-grid>
    </el-card>
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
import { listUser } from '@/api/user'
export default {
  data() {
    return {
      tabPosition: 'add',
      folding: false,
      searchFormData: {
        id: '',
        accout: '',
        accountType: '',
        start: '',
        end: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
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
        printConfig: {
          columns: [
            { field: 'id' },
            { field: 'role' },
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
              return listUser(result)
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
            field: 'phone',
            title: '用户名',
            minWidth: 180,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'type',
            title: '用户类型',
            minWidth: 180,
            align: 'center',
            headerAlign: 'center',
            formatter: this.typeFormatter
          },
          {
            field: 'lockedState',
            title: '是否锁定',
            width: 120,
            align: 'center',
            headerAlign: 'center',
            slots: { default: 'locked_default' }
          },
          {
            field: 'createTime',
            title: '注册时间',
            minWidth: 180,
            align: 'center',
            headerAlign: 'center'
          }
          /**
          ,
          {
            title: '操作',
            width: 140,
            align: 'center',
            fixed: 'right',
            slots: { default: 'operate' }
          }
          */
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
  created() {},
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
    typeFormatter({ cellValue, row, column }) {
      let result
      if (!(typeof cellValue === 'undefined' || cellValue === null || cellValue === '')) {
        switch (cellValue) {
          case 0:
            result = '普通用户'
            break
          case 5:
            result = '平台管理'
            break
          default:
            result = '--'
        }
      } else {
        result = '--'
      }
      return result
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
    handleUpdate(row) {
      alert('编辑' + JSON.stringify(row))
    },
    handleDelete(row) {
      alert('删除' + JSON.stringify(row))
    },
    viewRow(row) {
      alert('查看' + JSON.stringify(row))
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
