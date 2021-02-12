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
          <el-form-item label="用户名" prop="id">
            <el-input v-model="searchFormData.id" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户IP" prop="userIp">
            <el-input v-model="searchFormData.userIp" clearable />
          </el-form-item>
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
        <el-col v-if="folding" :span="8">
          <el-form-item label="起止时间">
            <!-- <el-date-picker
              class="date"
              v-model="range[0]"
              :picker-options="startDatePicker"
              type="date"
              placeholder="开始时间"
            >
            </el-date-picker>
            <el-date-picker
              class="date"
              v-model="range[1]"
              :picker-options="endDatePicker"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束时间"
            >
            </el-date-picker> -->

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
        <!--是否可用展示-->
        <template v-slot:available_default="{ row }">
          <template v-if="row.available === 1">
            <el-badge is-dot class="item" type="primary" />已通过
          </template>
          <template v-else>
            <el-badge is-dot class="item" type="info" />未通过
          </template>
        </template>

        <!--自定义空数据模板-->
        <template v-slot:empty>
          <span>
            <p>没有找到匹配的记录</p>
          </span>
        </template>
      </vxe-grid>
    </el-card>
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

import { listImportancelog } from '@/api/importance-log'

export default {
  data() {
    return {
      /* range: [],
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(), */
      defaultHeight: '500px',
      tableHeight: '460px',
      permissionGroupInfoOptions: [],
      folding: false,
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      allPermissionGroup: [],
      searchFormData: {
        id: '',
        startTime: '',
        endTime: '',
        loginIp: ''
      },
      rules: {
        permission: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 5, message: '长度大于 5 个字符', trigger: 'blur' }
        ]
      },
      temp: {
        id: null,
        permission: '',
        description: '',
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
              return listImportancelog(result)
            }
          }
        },
        columns: [
          { type: 'checkbox', width: 40, align: 'center' },
          {
            field: 'operateType',
            title: '操作类型',
            width: 140,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'username',
            title: '用户名',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'operateTime',
            title: '操作时间',
            align: 'center',
            headerAlign: 'center',
            minWidth: 200
          },
          {
            field: 'id',
            title: '用户IP',
            minWidth: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'result',
            title: '操作结果',
            width: 120,
            align: 'center',
            headerAlign: 'center',
            filters: [
              { label: '已通过', value: 1 },
              { label: '未通过', value: 0 }
            ],
            filterMultiple: false,
            slots: { default: 'available_default' }
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
            { min: 3, max: 20, message: '名称长度在 3 到 20 个字符' }
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
  computed: {},
  created() {
    addEventListener('resize', this.getHeight)
    this.getHeight()
  },

  methods: {
    getHeight() {
      this.defaultHeight = window.innerHeight - 180 + 'px'
      this.tableHeight = window.innerHeight - 200 + 'px'
    },
    /* beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          let endTime = self.range[1];
          if (endTime) {
            // 如果结束时间不为空，则小于结束时间
            endTime = endTime.replace(/-/g, "/"); // 正则匹配转换，例如‘2020-01-01’ 转成 ‘2020/01/01’
            return time.getTime() > new Date(endTime).getTime();
          }
        },
      };
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          let startTime = self.range[0];
          if (startTime) {
            // 如果开始时间不为空，则结束时间大于开始开始时间
            startTime = startTime.replace(/-/g, "/"); // 正则匹配转换，例如‘2020-01-01’ 转成 ‘2020/01/01’
            return time.getTime() < new Date(startTime).getTime();
          }
        },
      };
    },
  },
  watch: {
    range(val) {
      let endTime = val[1];
      if (endTime) {
        endTime = endTime.replace(/-/g, "/");
        val1[1] = new Date(
          new Date(endTime).getTime() + (3600 * 1000 * 24 - 1)
        );
        // 手动将日期设置endTime为当天的23:59:59
      }
    }, */
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
    /* 重置 */
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
