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
          <el-form-item label="发票名称" prop="name">
            <el-input v-model="searchFormData.name" clearable />
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
            <el-col class="line" :span="2" align="center">-</el-col>
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
          <el-form-item label="金额" prop="money">
            <el-input v-model="searchFormData.money" />
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
        auto-resize
        :height="tableHeight"
      >
        <!--工具栏按钮-->
        <template v-slot:buttons>
          <el-button-group>
            <el-button @click.native.prevent="handleCreate()">新增</el-button>
            <el-button
              type="primary"
              @click.native.prevent="handleBatchDelete()"
            >批量删除</el-button>
            <el-button
              type="primary"
              @click.native.prevent="handleUpload()"
            >上传文件</el-button>
          </el-button-group>
        </template>

        <!--是否可用展示-->
        <template v-slot:available_default="{ row }">
          <template v-if="row.available === 1">
            <el-badge is-dot class="item" type="primary" />启用
          </template>
          <template v-else>
            <el-badge is-dot class="item" type="info" />停用
          </template>
        </template>

        <!--数据行操作-->
        <template v-slot:operate="{ row }">
          <el-button
            type="text"
            :command="beforeHandleCommand('handleDelete', row)"
          >删除</el-button>
          <el-divider direction="vertical" />
          <el-button type="text" @click="handleViewDetail(row)">详情</el-button>
          <el-upload
            ref="upload"
            action=""
            :http-request="Upload"
            list-type="picture-card"
            :data="dataOss"
            :multiple="true"
            :limit="imageSizeLimit"
            :class="{ hide: hideUploadAdd }"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in" />
                </span>

                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleFileRemove(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
          </el-upload>
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
            <el-form-item label="权限名称" prop="permission">
              <el-input v-model="temp.permission" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="权限描述" prop="description">
              <el-input v-model="temp.description" type="textarea" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="权限分组" prop="permissionGroupInfoId">
              <el-select
                v-model="temp.permissionGroupInfoId"
                placeholder="请选择权限分组"
                style="width:100%"
              >
                <el-option
                  v-for="item in permissionGroupInfoOptions"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否可用" prop="available">
              <el-switch
                v-model="temp.available"
                :active-value="1"
                :inactive-value="0"
              />
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

    <!-- 导入表单 -->
    <el-dialog
      v-if="importFapiaoFormVisible"
      title="上传发票"
      :center="true"
      width="410px"
      :visible.sync="importFapiaoFormVisible"
    >
      <el-upload
        ref="upload"
        class="upload-demo"
        drag
        action=""
        :show-file-list="false"
        :headers="uploadHeaders"
        accept="*"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :before-upload="beforeUpload"
        :http-request="Upload"
        :data="dataOss"
        :multiple="false"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">
          只能上传Excel文件，且不超过500kB
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<style></style>

<script>
import formatTableSize from '@/utils/size'
import { date2YearMonthDay } from '@/utils/util.js'
import { client } from '@/utils/aliyun.oss.client'

import { saveFapiaoManagement, deleteFapiaoManagement, batchDeleteFapiaoManagement, updateFapiaoManagement, listFapiaoManagement } from '@/api/fapiao-management'
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
import { getSmartParsing } from '@/api/smart-parsing'

export default {
  data() {
    return {
      uploadHeaders: {
      },
      ossConfig: {
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAI4FbewSnGUUvEXhG5hJff',
        accessKeySecret: 'CwB9sLy6cuq51ZGHQpTSM1hAX9tmYR',
        bucket: 'dichong-wuhan',
        secure: true
      },
      imageSizeLimit: 20,
      dataOss: {},
      hideUploadAdd: false,
      importFapiaoFormVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      defaultHeight: '500px',
      tableHeight: '460px',
      permissionGroupInfoOptions: [],
      folding: false,
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      allFapiaoManagementGroup: [],
      textMap: {
        update: '编辑',
        create: '创建',
        detail: '详情'
      },
      searchFormData: {
        id: '',
        name: '',
        money: '',
        groupName: '',
        start: '',
        end: '',
        type: [],
        resource: '',
        desc: ''
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
                if (!(typeof value === 'undefined' || value === null || value === '')) {
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
              return listFapiaoManagement(result)
            }
          }
        },
        columns: [
          { type: 'checkbox',
            width: 40,
            align: 'center' },
          {
            field: 'companyId',
            title: '公司编号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherType',
            title: '凭证分类',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherTypeCode',
            title: '凭证类型代码',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherName',
            title: '凭证名称',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherCode',
            title: '发票代码',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherNumber',
            title: '发票号码',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherDate',
            title: '开票日期',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'hash',
            title: '密码区',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'checkCode',
            title: '校验码',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'machineNumber',
            title: '机器编号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'purchaserName',
            title: '购买方名称',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'purchaserRegistrationNumber',
            title: '购买方纳税人识别号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'purchaserAddressPhone',
            title: '购买方地址、电话',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'purchaserAddress',
            title: '购买方地址',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'purchaserPhone',
            title: '购买方电话',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'paymentIdentification',
            title: '电子支付标识',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherContent',
            title: '凭证明细',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'taxRate',
            title: '税率',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'taxAmount',
            title: '税额',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'totalAmount',
            title: '价税合计',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'sellerName',
            title: '销售方名称',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'sellerRegistrationNumber',
            title: '销售方纳税人识别号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'sellerAddressPhone',
            title: '销售方地址、电话',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'sellerAddress',
            title: '销售方地址',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'sellerPhone',
            title: '销售方电话',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'sellerDepositBank',
            title: '销售方开户行及账号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherNote',
            title: '发票备注',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherPayeeName',
            title: '发票收款人',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherAuditorName',
            title: '发票复核人',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherOperatorName',
            title: '发票开票人',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherFileType',
            title: '发票格式',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherUrl',
            title: '凭证URL',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'reimbursementFlag',
            title: '是否报销',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'reimbursementTime',
            title: '报销日期',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'reimbursementBatchNumber',
            title: '报销批次号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'accountingFlag',
            title: '是否记账',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'accountingTime',
            title: '记账日期',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'accountingInfoId',
            title: '记账编号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'voucherStatus',
            title: '凭证状态',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'operatorId',
            title: '操作人编号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'operatorName',
            title: '录入人',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'operateTime',
            title: '录入时间',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'auditorId',
            title: '审核人编号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'auditorName',
            title: '审核人名称',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'auditTime',
            title: '审核时间',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'opinion',
            title: '审核意见',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'note',
            title: '备注',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          }, {
            title: '操作',
            width: 140,
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
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },

  methods: {
    handleUpload() {
      this.importFapiaoFormVisible = true
    },
    handleViewDetail(row) {
      this.$router.push({
        name: 'fapiao-info',
        query: {
          id: row.id
        }
      })
    },
    getHeight() {
      this.defaultHeight = window.innerHeight - 180 + 'px'
      this.tableHeight = (window.innerHeight - 180 - 40) + 'px'
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
      this.temp = Object.assign({}, this.initCreateData)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
            const id = selectRecords[index].['id']
            const version = selectRecords[index].['version']
            const temp = {
              id: id,
              version: version
            }
            batchDeleteData.push(temp)
          }
          batchDeleteFapiaoManagement(batchDeleteData)
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
          message: '请先选择需要删除的记录'
        })
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
          const tempData = Object.assign({}, this.temp)
          saveFapiaoManagement(tempData)
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
          const tempData = Object.assign({}, this.temp)
          updateFapiaoManagement(tempData)
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
        deleteFapiaoManagement(tempData)
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
    },
    // http-request属性来覆盖默认的上传行为（即action="url"），自定义上传的实现
    Upload(file) {
      const that = this
      async function multipartUpload() {
        const temporary = file.file.name.lastIndexOf('.')
        const fileNameLength = file.file.name.length
        const fileType = file.file.name.substring(
          temporary,
          fileNameLength
        )
        const dir = 'dichong/file/' + date2YearMonthDay(new Date()) + '/'
        const fileName = new Date().getTime() + Math.floor(Math.random() * 150) + fileType
        const aliyunFileKey = dir + fileName
        client(that.ossConfig)
          .multipartUpload(aliyunFileKey, file.file, {
            progress: function(p) {
              // console.log(p)
              // that.showProgress = true
              // that.progress = Math.floor(p * 100)
            }
          })
          .then(result => {
            console.log('上传成功:' + JSON.stringify(result))
            const protocol = that.ossConfig.secure ? 'https://' : 'http://'
            const host = protocol + that.ossConfig.bucket + '.' + that.ossConfig.region + '.aliyuncs.com/'
            const fileUrl = host + result.name
            console.log('上传文件路径:' + fileUrl)
            that.files.push(fileUrl)
            console.log('上传文件数组:' + JSON.stringify(that.files))
          })
          .catch(err => {
            console.log('err:', err)
          })
      }
      multipartUpload()
    },
    handleUploadSuccess: function(response, file, fileList) {
      const code = response.code
      if (code === 0) {
        const result = response.data
        if (result) {
          this.$message.success('上传成功')
          this.$refs.dataGrid.commitProxy('reload')
        } else {
          this.$message.error('上传失败')
        }
      } else {
        this.$message.error('请稍后重试')
      }
      this.importFapiaoFormVisible = false
    },
    handleUploadError: function(err, file, fileList) {
      this.$message.error(err)
      this.importFapiaoFormVisible = false
    },
    beforeUpload: function(file) {
      const isLt500K = file.size / 1024 / 100 <= 5
      if (!isLt500K) {
        this.$message.error('导入文件超过 500kB')
      }
      return isLt500K
    }
  }
}
</script>
