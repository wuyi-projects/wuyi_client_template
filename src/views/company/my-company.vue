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
          <el-form-item label="公司全称" prop="name">
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
                  style="width: 100%"
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
                  style="width: 100%"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
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
          <el-form-item label="公司规模" prop="money">
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
          <el-button-group style="margin-bottom:2px">
            <el-button @click.native.prevent="handleCreate()">新增</el-button>
            <el-button
              type="primary"
              @click.native.prevent="handleBatchDelete()"
            >批量删除</el-button>
          </el-button-group>
        </template>

        <!--是否可用展示-->
        <!-- <template v-slot:available_default="{ row }">
          <template v-if="row.available === 1">
            <el-badge is-dot class="item" type="primary" />启用
          </template>
          <template v-else>
            <el-badge is-dot class="item" type="info" />停用
          </template>
        </template> -->

        <!-- 公司logo -->
        <template v-slot:companyLogo_default="{ row }">
          <template v-if="row.companyLogo">
            <el-row>
              <el-col>
                <el-image
                  :src="row.companyLogo"
                  fit="contain"
                  style="width:80px;"
                />
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-image>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </template>
        </template>

        <!-- 公司规模 -->
        <template v-slot:scale_default="{ row }">
          <template v-if="row.scale === 0">
            <el-tag type="danger" effect="dark">0-20人</el-tag>
          </template>
          <template v-else-if="row.scale === 1">
            <el-tag type="danger" effect="dark">20-99人</el-tag>
          </template>
          <template v-else-if="row.scale === 2">
            <el-tag type="warning" effect="dark">100-499人</el-tag>
          </template>
          <template v-else-if="row.scale === 3">
            <el-tag type="" effect="dark">500-999人</el-tag>
          </template>
          <template v-else-if="row.scale === 4">
            <el-tag type="" effect="dark">1000-9999人</el-tag>
          </template>
          <template v-else-if="row.scale === 5">
            <el-tag type="success" effect="dark">10000人以上</el-tag>
          </template>
          <template v-else />
        </template>

        <!-- 融资阶段 -->
        <template v-slot:financingStage_default="{ row }">
          <template v-if="row.financingStage === 0">
            <el-tag type="" effect="dark">不需要融资</el-tag>
          </template>
          <template v-else-if="row.financingStage === 1">
            <el-tag type="warning" effect="dark">未融资</el-tag>
          </template>
          <template v-else-if="row.financingStage === 2">
            <el-tag type="success" effect="dark">天使轮</el-tag>
          </template>
          <template v-else-if="row.financingStage === 3">
            <el-tag type="success" effect="dark">A轮</el-tag>
          </template>
          <template v-else-if="row.financingStage === 4">
            <el-tag type="warning" effect="dark">B轮</el-tag>
          </template>
          <template v-else-if="row.financingStage === 5">
            <el-tag type="warning" effect="dark">C轮</el-tag>
          </template>
          <template v-else-if="row.financingStage === 6">
            <el-tag type="danger" effect="dark">D轮及以上</el-tag>
          </template>
          <template v-else-if="row.financingStage === 7">
            <el-tag type="success" effect="dark">已上市</el-tag>
          </template>
          <template v-else />
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
      width="60%"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="company"
        label-position="right"
        label-width="120px"
        style="width: 100%; padding: 10px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司全称" prop="companyName">
              <el-input v-model="company.companyName" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司简称" prop="companyShortName">
              <el-input v-model="company.companyShortName" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="融资阶段" prop="financingStage">
              <el-select
                v-model="company.financingStage"
                placeholder="请选择融资阶段"
                style="width:100%"
              >
                <el-option
                  v-for="item in postOptionData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司规模" prop="scale">
              <el-select
                v-model="company.scale"
                placeholder="请选择公司规模"
                style="width:100%"
              >
                <el-option
                  v-for="item in genderOptionData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司官网" prop="website">
              <el-input v-model="company.website" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司简介" prop="introduction">
              <el-input v-model="company.introduction" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="备注" prop="note">
              <el-input v-model="company.note" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司logo" prop="companyLogo">
              <el-button
                type="primary"
                @click.native.prevent="handleImageUpload()"
              >上传图片</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-if="dialogStatus !== 'detail'">
          <el-button @click="resetForm('dataForm')"> 重置 </el-button>
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

    <!-- 上传图片 -->
    <el-dialog
      v-if="importImageFormVisible"
      title="上传图片"
      :center="true"
      width="410px"
      :visible.sync="importImageFormVisible"
    >
      <el-form :model="images">
        <SingleUpload v-model="uploadImageLoadUrl" />
      </el-form>
      {{ fapiao.url }}
    </el-dialog>
  </div>
</template>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>

<script>
import formatTableSize from '@/utils/size'
import SingleUpload from '@/components/Upload/SingleUpload'
import {
  saveCompany4Me,
  deleteCompany4Me,
  batchDeleteCompany4Me,
  updateCompany4Me,
  listCompany4Me,
  getCompany4Me
} from '@/api/company'

export default {
  components: {
    SingleUpload
  },
  data() {
    return {
      uploadImageLoadUrl: '',
      importImageFormVisible: false,
      fapiao: {},
      images: {},
      defaultHeight: '500px',
      tableHeight: '460px',
      permissionGroupInfoOptions: [],
      folding: false,
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      allCompanyGroup: [],
      textMap: {
        update: '编辑',
        create: '创建',
        detail: '详情'
      },
      postOptionData: [
        {
          code: 0,
          name: '不需要融资'
        },
        {
          code: 1,
          name: '未融资'
        },
        {
          code: 2,
          name: '天使轮'
        },
        {
          code: 3,
          name: 'A轮'
        },
        {
          code: 4,
          name: 'B轮'
        },
        {
          code: 5,
          name: 'C轮'
        },
        {
          code: 6,
          name: 'D轮及以上'
        },
        {
          code: 7,
          name: '以上市'
        }
      ],
      genderOptionData: [
        {
          code: 0,
          name: '0~20人'
        },
        {
          code: 1,
          name: '20~99人'
        },
        {
          code: 2,
          name: '100~499人'
        },
        {
          code: 3,
          name: '500~999人'
        },
        {
          code: 4,
          name: '1000~9999人'
        },
        {
          code: 5,
          name: '10000人以上'
        }
      ],
      searchFormData: {
        id: '',
        name: '',
        money: '',
        groupName: '',
        start: '',
        end: '',
        type: [],
        resource: '',
        desc: '',
        financingStage: null,
        scale: null
      },
      rules: {
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 4, message: '公司全称不少于 4 个字符', trigger: 'blur' }
        ]
      },
      company: {
        companyName: '',
        companyShortName: '',
        companyLogo: '',
        website: '',
        note: '',
        introduction: '',
        financingStage: null,
        scale: null
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
              return listCompany4Me(result)
            }
          }
        },
        columns: [
          { type: 'checkbox', width: 40, align: 'center' },
          {
            field: 'companyName',
            title: '公司全称 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'companyShortName',
            title: '公司简称 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'companyLogo',
            title: '公司Logo ',
            width: 200,
            height: 200,
            align: 'center',
            headerAlign: 'center',
            slots: { default: 'companyLogo_default' }
          },
          {
            field: 'financingStage',
            title: '融资阶段 ',
            width: 200,
            align: 'center',
            headerAlign: 'center',
            slots: { default: 'financingStage_default' }
          },
          {
            field: 'scale',
            title: '公司规模 ',
            width: 200,
            align: 'center',
            headerAlign: 'center',
            slots: { default: 'scale_default' }
          },
          {
            field: 'website',
            title: '公司官网 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'introduction',
            title: '公司简介 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'organizationCode',
            title: '组织结构代码 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'businessLicenseUrl',
            title: '公司营业执照 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'operatorId',
            title: '操作人编号 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'operatorName',
            title: '录入人 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'operateTime',
            title: '录入时间 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'markFlag',
            title: '认证状态 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'markTime',
            title: '认证时间 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          }, /* {            field: 'auditorId',            title: '审核人编号 ',            width: 200,            align: 'center',            headerAlign: 'center'
          },
          {
            field: 'auditorName',
            title: '审核人 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'auditTime',
            title: '审核时间 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'opinion',
            title: '审核意见 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'note',
            title: '备注 ',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          } */

          {
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
  computed: {},
  watch: {
    uploadUrl: function(val) {
      if (val) {
        this.importFapiaoFormVisible = false
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        this.importFapiaoFormVisible = true
      }
    },
    uploadImageLoadUrl: function(val) {
      if (val) {
        this.importImageFormVisible = false
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        this.importImageFormVisible = true
      }
    }
  },
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },

  methods: {
    handleImageUpload() {
      this.importImageFormVisible = true
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
      this.tableHeight = window.innerHeight - 180 - 40 + 'px'
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
    handleCreate() {
      this.company = Object.assign({}, this.initCreateData)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleBatchDelete() {
      const selectRecords = this.$refs.dataGrid.getCheckboxRecords()
      const batchDeleteData = []
      if (
        !(
          typeof selectRecords === 'undefined' ||
          selectRecords === null ||
          selectRecords === '' ||
          selectRecords.length === 0
        )
      ) {
        this.$confirm('永久删除记录吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        })
          .then(() => {
            for (
              let index = 0, len = selectRecords.length;
              index < len;
              index++
            ) {
              const id = selectRecords[index]['id']
              const version = selectRecords[index]['version']
              const company = {
                id: id,
                version: version
              }
              batchDeleteData.push(company)
            }
            batchDeleteCompany4Me(batchDeleteData)
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
          })
          .catch(() => {
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
      this.company = Object.assign({}, row)
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
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.company)
          tempData.companyLogo = this.uploadImageLoadUrl
          saveCompany4Me(tempData)
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
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.company)
          tempData.companyLogo = this.uploadImageLoadUrl
          updateCompany4Me(tempData)
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
      })
        .then(() => {
          const { id, version } = row
          const tempData = Object.assign({
            id: id,
            version: version
          })
          deleteCompany4Me(tempData)
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    viewRow(row) {
      this.company = Object.assign({}, row)
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
