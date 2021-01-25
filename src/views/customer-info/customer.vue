<template>
  <div class="app-container">
    <el-card class="box-card" :style="{ height: defaultHeight }">
      <div slot="header" class="clearfix">
        <span>客户信息</span>
      </div>
      <el-row type="flex" class="row-bg" justify="end">
        <el-col
          :span="6"
        ><div>设计日期:{{ year }} 年{{ month }} 月{{ day }} 日</div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin:50px 0">
        <el-col :span="6">
          <div class="grid-content"><span>姓名：</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>电话：</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>身高：</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>出生日期：</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>职业：</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>体重：</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span>婚姻状况：</span><span>{{ marital ? '已婚' : '未婚' }}</span>
          </div>
        </el-col>
        <el-col :span="15">
          <div><span>备注：</span></div>
        </el-col>
        <el-col :span="24">
          <div><span>地址：</span></div>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <vxe-grid
        ref="dataGrid"
        class="custom-table-scrollbar"
        v-bind="gridOptions"
        :height="tableHeight"
      >
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
.title-border {
  padding: 20px;
  border: 1px solid #e9e9e9;
  margin-bottom: 20px;
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
      resource: '',
      marital: true,
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
          autoHidden: true,
          pageSize: 100,
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
          refresh: true
          // print: true,
          // zoom: true,
          // custom: true
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
              return listLoginLog4Me(result)
            }
          }
        },
        columns: [
          {
            field: 'time',
            title: '次数',
            width: 80,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'date',
            title: '日期',
            width: 80,
            minWidth: 80,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'weight',
            title: '体重',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bb',
            title: 'BB',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bpLeft',
            title: 'BP左',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bpright',
            title: 'BP右',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'up',
            title: '上胸围',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'down',
            title: '下胸围',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'craw',
            title: '胃围',
            align: 'center',
            minWidth: 80,
            headerAlign: 'center'
          },
          {
            field: 'waiStline',
            title: '腰围',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'armGirth',
            title: '臂围',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'abdoMinal',
            title: '腹围',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'armHeight',
            title: '臂高',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center',
            formatter: this.operateStatusFormatter
          },
          {
            field: 'leftThigh',
            title: '左大腿',
            minWidth: 80,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'rightThigh',
            title: '右大腿',
            minWidth: 80,
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
  created() {
    addEventListener('resize', this.getHeight)
    this.getHeight()
  },

  methods: {
    getHeight() {
      this.defaultHeight = window.innerHeight - 90 + 'px'
    }
  }
}
</script>
