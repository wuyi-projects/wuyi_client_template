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
          <el-form-item label="权限名称" prop="name">
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
        <el-col :span="8">
          <el-form-item style="float: right" label-width="0">
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
    <el-card class="box-card" shadow="never" :style="{ height: defaultHeight }">
      <vxe-grid
        ref="dataGrid"
        class="custom-table-scrollbar"
        v-bind="gridOptions"
        auto-resize
        :height="tableHeight"
      >
        <!--工具栏按钮-->
        <!-- <template v-slot:buttons>
          <el-button-group>
            <el-button @click.native.prevent="
        handle-create-
      >新增</el-button>
        <el-button
          type="primary"
          @click.native.prevent="handleBatchDelete()"
        >批量删除</el-button>
        </el-button-group>
      </vxe-grid></el-card></div></el-card></vxe-grid></template> -->

        <!--是否可用展示-->
        <!--  <template v-slot:available_default="{ row }">
          <template v-if="row.available === 1">
            <el-badge is-dot class="item" type="primary" />启用
          </template>
          <template v-else>
            <el-badge is-dot class="item" type="info" />停用
          </template>
        </template> -->

        <!--文件类型转换-->
        <template v-slot:mimeType_default="{ row }">
          <template v-if="row.mimeType === 'application/pdf'">
            <el-tag type="success" effect="dark">PDF</el-tag>
          </template>
          <template v-else-if="row.mimeType.substring(0, 6) == 'image/'">
            <el-tag type="danger" effect="dark">图片</el-tag>
          </template>
          <template v-else />
        </template>

        <!--数据行操作-->
        <template v-slot:operate="{ row }">
          <!-- <el-button type="text" @click="handleUpdate(row)">修改</el-button> -->

          <el-button
            type="text"
            :command="beforeHandleCommand('handleDelete', row)"
          >
            删除
          </el-button>
          <el-divider direction="vertical" />
          <el-button type="text" @click="handleViewDetail(row)">
            详情
          </el-button>
          <!-- <el-dropdown  divided @command="handleCommand">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
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

    <!-- 侧边栏 -->
    <el-drawer
      v-if="fileInfoDetailDrawerVisable"
      title="文件信息"
      :visible.sync="fileInfoDetailDrawerVisable"
      direction="rtl"
      size="50%"
    >
      <!-- <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content" /></el-col>
        <el-col
          :span="16"
        ><div class="grid-content">
          <pdf ref="pdf" :src="currentFileUrl" /></div></el-col>
        <el-col :span="4"><div class="grid-content" /></el-col>
      </el-row>
       -->
      <el-container>
        <el-main>
          <el-row>
            <el-col>
              <template v-if="currentGroupInfo.mimeType === 'application/pdf'">
                <pdf ref="pdf" :src="currentFileUrl" />
              </template>
              <template
                v-else-if="
                  currentGroupInfo.mimeType.substring(0, 6) == 'image/'
                "
              >
                <el-row>
                  <el-col>
                    <el-image
                      :src="currentFileUrl"
                      fit="contain"
                      style="width:100%"
                    />
                  </el-col>
                </el-row>
              </template>
              <templet v-else>
                <el-image>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
              </templet>
            </el-col>
          </el-row>
          <el-row>
            <div style="height:40px;color:#72767b">
              <el-row :span="4">
                <span style="font-weight:bold">文件详情</span>
              </el-row>
            </div>
            <div style="padding:0 40px;">
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">bucket</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.bucket }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">etag</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.etag }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">文件名</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.filename }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">文件大小</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.size }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">mimeType</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.mimeType }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">format</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.format }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">高度</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.height }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">宽度</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.width }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">OpenID</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.openId }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">产品代码</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.productCode }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">渠道编号</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.channelId }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">类型编号</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.typeId }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="4">
                  <span style="font-weight:bold;">子类型编号</span>
                </el-col>
                <el-col :span="20">
                  {{ currentFileInfo.subtypeId }}
                </el-col>
              </el-row>
            </div>
          </el-row>
        </el-main>
      </el-container>
    </el-drawer>
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
.el-drawer.rtl {
  overflow: scroll;
}
</style>

<script>
import formatTableSize from '@/utils/size'
import pdf from 'vue-pdf'
import {
  listFileInfo,
  saveFileInfo,
  deleteFileInfo,
  updateFileInfo
} from '@/api/file-mangement'
import Templet from '../templet/templet.vue'
export default {
  components: {
    pdf
  },
  data() {
    return {
      FileInfoGroupInfoOptions: [],
      defaultHeight: '500px',
      tableHeight: '460px',
      folding: false,
      currentFileInfo: null,
      fileInfoDetailDrawerVisable: false,
      currentFileUrl: '',
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      allFileInfoGroup: [],
      textMap: {
        update: '编辑',
        create: '创建',
        detail: '详情'
      },
      currentGroupInfo: {},
      searchFormData: {
        id: '',
        name: '',
        groupName: '',
        start: '',
        end: '',
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        FileInfo: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 5, message: '长度大于 5 个字符', trigger: 'blur' }
        ]
      },
      temp: {
        id: null,
        FileInfo: '',
        description: '',
        FileInfoGroupInfoId: null,
        available: 1,
        version: 0
      },
      initCreateData: {
        id: null,
        FileInfo: '',
        description: '',
        FileInfoGroupInfoId: null,
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
            { field: 'FileInfo' },
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
              return listFileInfo(result)
            }
          }
        },
        columns: [
          { type: 'checkbox', width: 40, align: 'center' },
          {
            title: '文件类型',
            width: 200,
            align: 'center',
            headerAlign: 'center',
            slots: { default: 'mimeType_default' }
          },
          {
            field: 'bucket',
            title: 'bucket',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'etag',
            title: 'etag',
            width: 200,
            align: 'center',
            headerAlign: 'center',
            visible: false
          },
          {
            field: 'filename',
            title: '文件名',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'size',
            title: '文件大小',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'mimeType',
            title: 'mimeType',
            width: 200,
            align: 'left',
            headerAlign: 'center'
          },
          {
            field: 'format',
            title: 'format',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'height',
            title: '高度',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'width',
            title: '宽度',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'openId',
            title: 'OpenID',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'productCode',
            title: '产品代码',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'channelId',
            title: '渠道编号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'typeId',
            title: '类型编号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
          {
            field: 'subtypeId',
            title: '子类型编号',
            width: 200,
            align: 'center',
            headerAlign: 'center'
          },
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
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  methods: {
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
    initFormSafeSubmitConfig() {
      this.loadingSubmitButton = false
      this.submitButtonText = '提交'
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.temp)
          saveFileInfo(tempData)
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
          const tempData = Object.assign({}, this.temp)
          updateFileInfo(tempData)
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
          deleteFileInfo(tempData)
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
    handleViewDetail(row) {
      
      this.currentGroupInfo = row
      this.currentFileInfo = row
      this.currentFileUrl =
        'https://' +
        row.bucket +
        '.oss-cn-hangzhou.aliyuncs.com/' +
        row.filename
      this.fileInfoDetailDrawerVisable = true
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
    mimeTypeFormatter({ cellValue, row, column }) {
      let result
      if (!(cellValue === null || cellValue === '')) {
        if (cellValue === 'application/pdf') {
          result = 'PDF'
        } else if (cellValue.substring(0, 6) === 'image/') {
          result = '图片'
        } else {
          result = '--'
        }
      } else {
        result = '--'
      }
      return result
    }
  }
}
</script>
