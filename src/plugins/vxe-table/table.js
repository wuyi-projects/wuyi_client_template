import Vue from 'vue'
import store from '../../store'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import XEUtils from 'xe-utils'

import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'

// 将模态窗口挂载到 vue 实例中
// Vue.prototype.$XModal = VXETable.modal

VXETable.use(VXETablePluginElement)
Vue.use(VXETable)

// 创建一个字典翻译渲染器
VXETable.renderer.add('DICT', {
  renderDefault(h, renderOpts, params) {
    const { props } = renderOpts
    const { row, column } = params
    const cellValue = row[column.property]
    const rest = store.getters.ddMap[props.code]
    const item = rest && rest.find(item => item.value === cellValue)
    return [
      h('span', {
        style: {
          color: cellValue === '1' ? 'green' : 'red'
        }
      }, item ? item.label : '')
    ]
  }
})

// 创建一个表单-按钮组渲染器
VXETable.renderer.add('FormItemButtonGroup', {
  // 项显示模板
  renderItem(h, renderOpts, params) {
    return [
      <vxe-button type='submit' status='primary'>查询</vxe-button>,
      <vxe-button type='reset'>重置</vxe-button>
    ]
  }
})

// 自定义全局的格式化处理函数
VXETable.formats.mixin({
  // 格式化性别
  formatSex({ cellValue }) {
    return cellValue === 1 ? '男' : '女'
  },
  // 格式化下拉选项
  formatSelect({ cellValue }, list) {
    const item = list.find(item => item.value === cellValue)
    return item ? item.label : ''
  },
  // 格式化日期，默认 yyyy-MM-dd HH:mm:ss
  formatDate({ cellValue }, format) {
    return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
  },
  // 格式化日期，默认 yyyy-MM-dd HH:mm:ss
  formatShortDate({ cellValue }, format) {
    return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd')
  },
  // 四舍五入金额，每隔3位逗号分隔，默认2位数
  formatAmount({ cellValue }, digits = 2) {
    return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: digits })
  },
  // 格式化银行卡，默认每4位空格隔开
  formatBankcard({ cellValue }) {
    return XEUtils.commafy(XEUtils.toString(cellValue), { spaceNumber: 4, separator: ' ' })
  },
  // 四舍五入,默认两位数
  formatFixedNumber({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits)
  },
  // 向下舍入,默认两位数
  formatCutNumber({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
  },
  // 转换 moment 类型为字符串
  toMomentString({ cellValue }, format) {
    return cellValue ? cellValue.format(format) : ''
  }
})
