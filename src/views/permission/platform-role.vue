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
          <el-form-item label="编号" prop="id">
            <el-input v-model="searchFormData.id" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input v-model="searchFormData.phoneNumber" clearable />
          </el-form-item>
        </el-col>
        <el-col v-if="folding" :span="8">
          <el-form-item label="短信类型" prop="smsType">
            <el-select
              v-model="searchFormData.smsType"
              style="width:100%"
              placeholder="请选择活动区域"
            >
              <el-option label="全部" value="" />
              <el-option label="验证码类" value="1" />
              <el-option label="通知类" value="2" />
              <el-option label="营销类" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="folding" :span="8">
          <el-form-item label="起止时间">
            <el-col :span="11">
              <el-form-item>
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
              <el-form-item>
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
    <el-card class="box-card" shadow="never">
      <vxe-grid
        ref="dataGrid"
        class="custom-table-scrollbar"
        v-bind="gridOptions"
      >
        <!--工具栏按钮-->
        <template v-slot:buttons>
          <el-radio-group v-model="tabPosition" style="margin-bottom: 3px;">
            <el-radio-button label="add">新增</el-radio-button>
            <el-radio-button label="batchDelete">批量删除</el-radio-button>
          </el-radio-group>
          <el-radio-group
            v-model="tabPosition"
            style="margin-left:10px;margin-bottom: 3px;"
          >
            <el-radio-button label="templetDown">模板下载</el-radio-button>
            <el-radio-button label="importExcel">Excel导入</el-radio-button>
          </el-radio-group>
          <el-dropdown style="margin-left:10px;">
            <el-button>
              操作<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="remove">删除选中</el-dropdown-item>
              <el-dropdown-item command="export">导出数据</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>

        <!--是否可用展示-->
        <template v-slot:available_default="{ row }">
          <template v-if="row.available">
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
      width="40%"
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
            <el-form-item label="角色名称" prop="role">
              <el-input v-model="temp.role" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="temp.description" type="textarea" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否可用" prop="available">
              <el-switch v-model="temp.available" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
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
      </div>
    </el-dialog>
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

import { listRole } from '@/api/permission'

export default {
  data() {
    return {
      tabPosition: 'add',
      folding: false,
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      searchFormData: {
        id: '',
        name: '',
        phoneNumber: '',
        start: '',
        end: '',
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      temp: {
        id: '',
        role: '',
        description: '',
        available: '',
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
              return listRole(result)
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
            field: 'role',
            title: '角色名',
            width: 350,
            align: 'left',
            headerAlign: 'center'
          },
          {
            field: 'description',
            title: '角色描述',
            align: 'left',
            headerAlign: 'center',
            minWidth: 320
          },
          {
            field: 'available',
            title: '是否可用',
            width: 120,
            align: 'center',
            headerAlign: 'center',
            filters: [
              { label: '启用', value: true },
              { label: '停用', value: false }
            ],
            filterMultiple: false,
            slots: { default: 'available_default' }
          },
          {
            title: '操作',
            width: 140,
            align: 'center',
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
  computed: {},
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
