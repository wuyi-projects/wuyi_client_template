<template>
  <div class="app-container">
    <el-card class="box-card" :style="{ height: defaultHeight }">
      <el-page-header content="客户信息" @back="goBack" />
      <el-divider />
      <el-row :gutter="20" style="margin-left: 40px;">
        <el-col :span="3" :offset="16">
          <span class="title">设计日期:</span>
        </el-col>
        <el-col :span="5">
          <span class="content">{{ customerInfo.designDate?customerInfo.designDate:'-' }}</span>
        </el-col>
        <el-col :span="3">
          <span class="title">姓名：</span>
        </el-col>
        <el-col :span="5">
          <span class="content">{{ customerInfo.name?customerInfo.name:'-' }}</span>
        </el-col>
        <el-col :span="3">
          <span class="title">电话：</span>
        </el-col>
        <el-col :span="5">
          <span class="content">{{ customerInfo.phone?customerInfo.phone:'-' }}</span>
        </el-col>
        <el-col :span="3">
          <span class="title">身高：</span>
        </el-col>
        <el-col :span="5">
          <span class="content">{{ customerInfo.height?customerInfo.height:'-' }}</span>
          <span style="margin-left: 10px">厘米</span>
        </el-col>
        <el-col :span="3">
          <span class="title">出生日期：</span>
        </el-col>
        <el-col :span="5">
          <span class="content">{{ customerInfo.birthday?customerInfo.birthday:'-' }}</span>
        </el-col>
        <el-col :span="3">
          <span class="title">职业：</span>
        </el-col>
        <el-col :span="5">
          <span class="content">{{ customerInfo.profession?customerInfo.profession:'-' }}</span>
        </el-col>
        <el-col :span="3">
          <span class="title">体重：</span>
        </el-col>
        <el-col :span="5">
          <span class="content">{{ customerInfo.weight?customerInfo.weight:'-' }}</span><span style="margin-left: 10px">Kg</span>
        </el-col>
        <el-col :span="3">
          <span class="title">婚姻状况：</span>
        </el-col>
        <el-col :span="5">
          <span class="content">{{
            customerInfo.maritalStatus == 0
              ? "未婚"
              : customerInfo.maritalStatus == 1
                ? "已婚"
                : "--"
          }}</span>
        </el-col>
        <el-col :span="3">
          <span class="title">备注：</span>
        </el-col>
        <el-col :span="13">
          <span class="content">{{ customerInfo.field1 ? customerInfo.field1 : "无" }}</span>
        </el-col>
        <el-col :span="3">
          <span class="title">地址：</span>
        </el-col>
        <el-col :span="21">
          <span class="content">{{ customerInfo.address?customerInfo.address:'-' }}{{ customerInfo.detailedAddress }}</span>
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

.content{
  /* font-weight:bold; */
}

.title{
  font-weight:bold;
}
</style>

<script>
import moment from 'moment'
import formatTableSize from '@/utils/size'

import { getCustomerBasicInfo } from '@/api/customer-basic-info'
import { listBodyDataRecord } from '@/api/body-data-record'

export default {
  data() {
    return {
      customerInfo: {},
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
        id: 'data_table',
        rowId: 'id',
        headerAlign: 'center',
        scrollY: { gt: -1 },
        printConfig: {
          columns: [
            { field: 'id' },
            { field: 'openId' },
            { field: 'type' },
            { field: 'times' },
            { field: 'weight' },
            { field: 'bbValue' },
            { field: 'bpLeftValue' },
            { field: 'bpRightValue' },
            { field: 'upperChestValue' },
            { field: 'underChestValue' },
            { field: 'gastricValue' },
            { field: 'waistlineValue' },
            { field: 'abdominalValue' },
            { field: 'hiplineValue' },
            { field: 'armHigh' },
            { field: 'leftThighValue' },
            { field: 'rightThighValue' },
            { field: 'recordTime' },
            { field: 'status' },
            { field: 'confirmTime' }
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
              return listBodyDataRecord(result)
            }
          }
        },
        columns: [
          { type: 'checkbox', width: 40, align: 'center', visible: false },
          {
            field: 'id',
            title: '编号',
            width: 140,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'openId',
            title: '账户编号',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'type',
            title: '类型',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center',
            formatter: this.typeFormatter,
            visible: false
          },
          {
            field: 'times',
            title: '次数',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center',
            formatter: this.timesFormatter
          },
          {
            field: 'weight',
            title: '体重',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bbValue',
            title: 'BB',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bpLeftValue',
            title: 'BP左',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bpRightValue',
            title: 'BP右',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'upperChestValue',
            title: '上胸围',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'underChestValue',
            title: '下胸围',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'gastricValue',
            title: '胃围',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'waistlineValue',
            title: '腰围',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'abdominalValue',
            title: '腹围',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'hiplineValue',
            title: '臀围',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'armHigh',
            title: '臀高',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'leftThighValue',
            title: '左大腿',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'rightThighValue',
            title: '右大腿',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'recordTime',
            title: '记录日期',
            minWidth: 100,
            align: 'center',
            headerAlign: 'center',
            formatter: 'formatShortDate'
          },
          {
            field: 'status',
            title: '状态',
            minWidth: 50,
            align: 'center',
            headerAlign: 'center',
            formatter: this.statusFormatter,
            visible: false
          },
          {
            field: 'confirmTime',
            title: '确认时间',
            minWidth: 100,
            align: 'center',
            headerAlign: 'center',
            formatter: 'formatShortDate',
            visible: false
          },
          {
            title: '操作',
            width: 140,
            align: 'center',
            headerAlign: 'center',
            fixed: 'right',
            slots: { default: 'operate' },
            visible: false
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
  created() {
    addEventListener('resize', this.getHeight)
    this.getHeight()
    const that = this
    const id = that.$route.query.id
    if (id) {
      that.customerInfo.id = id
      that.pageStatus = 'update'
      that.getCustomerBasicInfo()
    }
  },

  methods: {
    getHeight() {
      this.defaultHeight = window.innerHeight - 90 + 'px'
    },
    getCustomerBasicInfo() {
      const that = this
      const id = that.customerInfo.id
      if (id) {
        getCustomerBasicInfo({
          id: id
        })
          .then((response) => {
            const data = response.data
            if (!data) {
              return
            }
            that.customerInfo = data
            that.customerInfo.designDate = moment(data.designDate).format(
              'YYYY年M月D日'
            )
            that.customerInfo.birthday = moment(data.birthday).format(
              'YYYY年M月D日'
            )
          })
          .catch((e) => {
            that.loading = false
          })
      }
    },
    typeFormatter({ cellValue, row, column }) {
      let result
      if (!(cellValue === null || cellValue === '')) {
        if (cellValue === 0) {
          result = '目标数据'
        } else if (cellValue === 1) {
          result = '复诊数据'
        }
      } else {
        result = '未知'
      }
      return result
    },
    statusFormatter({ cellValue, row, column }) {
      let result
      if (!(cellValue === null || cellValue === '')) {
        if (cellValue === 0) {
          result = '待确认'
        } else {
          result = '已确认'
        }
      } else {
        result = '未知'
      }
      return result
    },
    timesFormatter({ cellValue, row, column }) {
      return '第' + cellValue + '次'
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
