import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import '@/styles/vxe-table-variable.scss' // global css

import '@/plugins/vxe-table/utils'
import '@/plugins/vxe-table/table'

// lottery used
import '@/assets/style/index.scss'
import '@/assets/lib/tagcanvas.js'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import 'font-awesome/css/font-awesome.css'

import lodash from 'lodash'
import formCreate from '@form-create/element-ui' // form generator

import moment from 'moment'

Vue.prototype.lodash = lodash
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// form generator
Vue.use(formCreate)

Vue.config.productionTip = false

moment.locale('zh-cn') // 设置语言 或 moment.lang('zh-cn');
Vue.prototype.$moment = moment// 赋值使用

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
