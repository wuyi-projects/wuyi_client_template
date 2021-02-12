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
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="searchFormData.phone" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
            <el-col style="text-align: center;" :span="2">-</el-col>
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
        <el-col :span="8">
          <el-form-item style="float: right;" label-width="0">
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

        <!--插槽使用示例:是否可用展示-->
        <template v-slot:solutionVersion_default="{ row }">
          <template v-for="item in solutionVersionOptions">
            <!-- <el-tag
              v-if="row.solutionVersion == item.value"
              :key="item.value"
              type="warning"
              effect="plain"
            >
              {{ item.name }}
            </el-tag> -->
            <span
              v-if="row.solutionVersion == item.value"
              :key="item.value"
            >{{ item.name }}</span>
          </template>
        </template>

        <!--数据行操作-->
        <template v-slot:operate="{ row }">
          <el-button type="text" @click="handleServiceEvaluationCreate(row)">添加服务记录</el-button>
          <!-- <el-button type="text" style="color:red;" @click="viewCustomerDetailInfo(row)">查看客户数据</el-button>
          <el-divider direction="vertical" />
          <el-button type="text" @click="handleInputBodyData(row)">录入复诊数据</el-button>
          <el-divider direction="vertical" />
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
            </el-dropdown-menu>
          </el-dropdown> -->
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
        :model="formData"
        label-position="right"
        label-width="80px"
        style="width: 100%; padding:10px;"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="账户编号" prop="openId">
              <el-input
                v-model="formData.openId"
                placeholder="请输入账户编号"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入姓名"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="微信绑定手机号码" prop="phone">
              <el-input
                v-model="formData.phone"
                placeholder="请输入微信绑定手机号码"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备用号码" prop="phone2">
              <el-input
                v-model="formData.phone2"
                placeholder="请输入备用号码"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="身高" prop="height">
              <el-input
                v-model="formData.height"
                placeholder="请输入身高"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="出生日期" prop="birthday">
              <el-input
                v-model="formData.birthday"
                placeholder="请输入出生日期"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="职业" prop="profession">
              <el-input
                v-model="formData.profession"
                placeholder="请输入职业"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="体重" prop="weight">
              <el-input
                v-model="formData.weight"
                placeholder="请输入体重"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-input
                v-model="formData.maritalStatus"
                placeholder="请输入婚姻状况"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input
                v-model="formData.address"
                placeholder="请输入地址"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细地址" prop="detailedAddress">
              <el-input
                v-model="formData.detailedAddress"
                placeholder="请输入详细地址"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属区域" prop="regionalId">
              <el-input
                v-model="formData.regionalId"
                placeholder="请输入所属区域"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="方案版本" prop="solutionVersion">
              <el-input
                v-model="formData.solutionVersion"
                placeholder="请输入方案版本"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="设计日期" prop="designDate">
              <el-input
                v-model="formData.designDate"
                placeholder="请输入设计日期"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="体型" prop="bodyType">
              <el-input
                v-model="formData.bodyType"
                placeholder="请输入体型"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="胸型" prop="breastShape">
              <el-input
                v-model="formData.breastShape"
                placeholder="请输入胸型"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备用字段1" prop="field1">
              <el-input
                v-model="formData.field1"
                placeholder="请输入备用字段1"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备用字段2" prop="field2">
              <el-input
                v-model="formData.field2"
                placeholder="请输入备用字段2"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备用字段3" prop="field3">
              <el-input
                v-model="formData.field3"
                placeholder="请输入备用字段3"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备用字段4" prop="field4">
              <el-input
                v-model="formData.field4"
                placeholder="请输入备用字段4"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备用字段5" prop="field5">
              <el-input
                v-model="formData.field5"
                placeholder="请输入备用字段5"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="操作人编号" prop="operatorId">
              <el-input
                v-model="formData.operatorId"
                placeholder="请输入操作人编号"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="操作人名称" prop="operatorName">
              <el-input
                v-model="formData.operatorName"
                placeholder="请输入操作人名称"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="操作时间" prop="operateTime">
              <el-input v-model="formData.operateTime" clearable />
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

    <!-- 创建/修改表单 -->
    <el-dialog
      v-if="dialogServiceEvaluationFormVisible"
      :title="textMap[dialogServiceEvaluationStatus]"
      :center="true"
      width="40%"
      :visible.sync="dialogServiceEvaluationFormVisible"
    >
      <el-form
        ref="dataServiceEvaluationForm"
        :rules="rules"
        :model="serviceEvaluationFormData"
        label-position="right"
        label-width="80px"
        style="width: 100%; padding:10px;"
      >
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="账户编号" prop="openId">
              <el-input
                v-model="serviceEvaluationFormData.openId"
                placeholder="请输入账户编号"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="serviceEvaluationFormData.name"
                placeholder="请输入账户编号"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="方案版本" prop="solutionVersion">
              <el-select
                v-model="serviceEvaluationFormData.solutionVersion"
                placeholder="选择方案版本"
                style="width: 100%"
              >
                <el-option
                  v-for="item in solutionVersionOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="使用阶段" prop="stage">
              <el-select
                v-model="serviceEvaluationFormData.stage"
                placeholder="选择使用阶段"
                style="width: 100%"
              >
                <el-option
                  v-for="item in stageOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="note">
              <el-input
                v-model="serviceEvaluationFormData.note"
                type="textarea"
                placeholder="请输入备注"
                maxlength="100"
                rows="3"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-if="dialogServiceEvaluationStatus !== 'detail'">
          <el-button @click="resetForm('dataForm')">
            重置
          </el-button>
          <el-button
            type="primary"
            :loading="loadingSubmitButton"
            :disabled="loadingSubmitButton"
            @click="dialogServiceEvaluationStatus === 'create' ? createServiceEvaluationData() : updateServiceEvaluationData()"
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

import { listCustomerBasicInfoForService, saveCustomerBasicInfo, deleteCustomerBasicInfo, batchDeleteCustomerBasicInfo, updateCustomerBasicInfo } from '@/api/customer-basic-info'
import { saveServiceEvaluation, updateServiceEvaluation } from '@/api/service-evaluation'

export default {
  data() {
    return {
      defaultHeight: '500px',
      tableHeight: '460px',
      permissionGroupInfoOptions: [],
      folding: false,
      dialogFormVisible: false,
      dialogServiceEvaluationFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      textMap: {
        update: '编辑',
        create: '创建',
        detail: '详情'
      },
      searchFormData: {
        id: '',
        start: '',
        end: '',
        phone: ''
      },
      rules: {
        permission: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 5, message: '长度大于 5 个字符', trigger: 'blur' }
        ]
      },
      formData: {
        id: null,
        openId: null,
        name: null,
        phone: null,
        phone2: null,
        height: null,
        birthday: null,
        profession: null,
        weight: null,
        maritalStatus: null,
        address: null,
        detailedAddress: null,
        regionalId: null,
        solutionVersion: null,
        designDate: null,
        bodyType: null,
        breastShape: null,
        field1: null,
        field2: null,
        field3: null,
        field4: null,
        field5: null,
        operatorId: null,
        operatorName: null,
        operateTime: null,
        version: 0
      },
      initCreateData: {
        id: null,
        openId: null,
        name: null,
        phone: null,
        phone2: null,
        height: null,
        birthday: null,
        profession: null,
        weight: null,
        maritalStatus: null,
        address: null,
        detailedAddress: null,
        regionalId: null,
        solutionVersion: null,
        designDate: null,
        bodyType: null,
        breastShape: null,
        field1: null,
        field2: null,
        field3: null,
        field4: null,
        field5: null,
        operatorId: null,
        operatorName: null,
        operateTime: null,
        version: 0
      },
      serviceEvaluationFormData: {
        id: null,
        openId: null,
        name: null,
        solutionVersion: null,
        stage: null,
        note: null,
        version: 0
      },
      initEvaluationCreateData: {
        id: null,
        openId: null,
        name: null,
        solutionVersion: null,
        stage: null,
        note: null,
        version: 0
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
      solutionVersionOptions: [
        { name: '显效版',
          value: 1
        },
        {
          name: '有效版',
          value: 2
        },
        {
          name: '健康版',
          value: 3
        },
        {
          name: '标准版',
          value: 4
        },
        {
          name: '完美版',
          value: 5
        },
        {
          name: '精致版',
          value: 6
        }
      ],
      stageOptions: [
        { name: '第1阶段',
          value: 1
        },
        {
          name: '第2阶段',
          value: 2
        },
        {
          name: '第3阶段',
          value: 3
        },
        {
          name: '第4阶段',
          value: 4
        },
        {
          name: '第5阶段',
          value: 5
        },
        {
          name: '第6阶段',
          value: 6
        }
      ],
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
            { field: 'name' },
            { field: 'phone' },
            { field: 'phone2' },
            { field: 'height' },
            { field: 'birthday' },
            { field: 'profession' },
            { field: 'weight' },
            { field: 'maritalStatus' },
            { field: 'address' },
            { field: 'detailedAddress' },
            { field: 'regionalId' },
            { field: 'solutionVersion' },
            { field: 'bodyType' },
            { field: 'breastShape' },
            { field: 'field1' },
            { field: 'field2' },
            { field: 'field3' },
            { field: 'field4' },
            { field: 'field5' },
            { field: 'operatorId' },
            { field: 'operatorName' },
            { field: 'operateTime' }
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
              return listCustomerBasicInfoForService(result)
            }
          }
        },
        columns: [
          { type: 'checkbox',
            width: 40,
            align: 'center'
          },
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
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'name',
            title: '姓名',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'solutionVersion',
            title: '方案版本',
            minWidth: 100,
            align: 'center',
            headerAlign: 'center',
            slots: { default: 'solutionVersion_default' }
          },
          {
            field: 'phone',
            title: '手机号码',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'phone2',
            title: '备用号码',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'height',
            title: '身高',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'birthday',
            title: '出生日期',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'profession',
            title: '职业',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'weight',
            title: '体重',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'maritalStatus',
            title: '婚姻状况',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'address',
            title: '地址',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'detailedAddress',
            title: '详细地址',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'regionalName',
            title: '所属区域',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'bodyType',
            title: '体型',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'breastShape',
            title: '胸型',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'field1',
            title: '备用字段1',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'field2',
            title: '备用字段2',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'field3',
            title: '备用字段3',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'field4',
            title: '备用字段4',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'field5',
            title: '备用字段5',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'operatorId',
            title: '操作人编号',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'operatorName',
            title: '操作人名称',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'operateTime',
            title: '操作时间',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center'
          },
          {
            title: '操作',
            width: 320,
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
        }
      }
    }
  },
  computed: {
  },
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
      this.$router.push('/customer/customer-info-edit')
      // this.formData = Object.assign({}, this.initCreateData)
      // this.dialogStatus = 'create'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
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
            const id = selectRecords[index].id
            const version = selectRecords[index].version
            const temp = {
              id: id,
              version: version
            }
            batchDeleteData.push(temp)
          }
          batchDeleteCustomerBasicInfo(batchDeleteData)
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
          message: '请选择需要删除的记录'
        })
      }
    },
    handleUpdate(row) {
      this.$router.push({
        name: 'customer-info-edit',
        query: {
          id: row.id
        }
      })
      // this.formData = Object.assign({}, row)
      // this.dialogStatus = 'update'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
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
          const tempData = Object.assign({}, this.formData)
          saveCustomerBasicInfo(tempData)
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
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.formData)
          updateCustomerBasicInfo(tempData)
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
        deleteCustomerBasicInfo(tempData)
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
    },
    viewRow(row) {
      this.formData = Object.assign({}, row)
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
    },
    handleInputBodyData(row) {
      this.$router.push({
        name: 'body-data-edit',
        query: {
          customerId: row.id
        }
      })
    },
    viewCustomerDetailInfo(row) {
      this.$router.push({
        name: 'customer-detail',
        query: {
          id: row.id
        }
      })
    },
    createServiceEvaluationData() {
      this.$refs['dataServiceEvaluationForm'].validate((valid) => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.serviceEvaluationFormData)
          saveServiceEvaluation(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
                this.dialogServiceEvaluationFormVisible = false
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
    updateServiceEvaluationData() {
      this.$refs['dataServiceEvaluationForm'].validate((valid) => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.serviceEvaluationFormData)
          updateServiceEvaluation(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '修改操作成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
                this.dialogServiceEvaluationFormVisible = false
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
    handleServiceEvaluationCreate(row) {
      console.log(JSON.stringify(row))
      this.serviceEvaluationFormData = Object.assign({}, this.initEvaluationCreateData)
      // this.$set(this.serviceEvaluationFormData, 'openId', row.openId)
      // this.$set(this.serviceEvaluationFormData, 'name', row.name)
      this.serviceEvaluationFormData.openId = row.openId
      this.serviceEvaluationFormData.name = row.name
      this.dialogServiceEvaluationStatus = 'create'
      this.dialogServiceEvaluationFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataServiceEvaluationForm'].clearValidate()
      })
    }
  }
}
</script>
