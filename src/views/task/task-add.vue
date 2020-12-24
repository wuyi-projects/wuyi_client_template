<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never">
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
            <el-form-item label="任务类型" prop="taskType">
              <el-radio-group v-model="temp.taskType">
                <el-radio
                  v-for="item in taskTypeRadioOptionData"
                  :key="item.code"
                  :label="item.code"
                >
                  {{ item.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务名称" prop="taskName">
              <el-input v-model="temp.taskName" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止日期" prop="endTime">
              <el-date-picker
                v-model="temp.endTime"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发起任务" required>
              <el-col :span="12">
                <el-form-item prop="sponsorDepartmentId">
                  <el-select
                    v-model="temp.sponsorDepartmentId"
                    placeholder="请选择部门"
                    style="width:100%;"
                    @change="handleChangeSponsorDepartment"
                  >
                    <el-option
                      v-for="item in departmentOptionData"
                      :key="item.id"
                      :label="item.departmentName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="sponsorId">
                  <el-select
                    v-model="temp.sponsorId"
                    placeholder="请选择人员"
                    style="width:100%;"
                    @change="handleChangeSponsorPerson"
                  >
                    <el-option
                      v-for="item in personOptionData"
                      :key="item.openId"
                      :label="item.name"
                      :value="item.openId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分配任务" required>
              <el-col :span="12">
                <el-form-item prop="departmentId">
                  <el-select
                    v-model="temp.departmentId"
                    placeholder="请选择部门"
                    style="width:100%;"
                    @change="handleChangeDepartment"
                  >
                    <el-option
                      v-for="item in departmentOptionData"
                      :key="item.id"
                      :label="item.departmentName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="receiverId">
                  <el-select
                    v-model="temp.receiverId"
                    placeholder="请选择人员"
                    style="width:100%;"
                    @change="handleChangePerson"
                  >
                    <el-option
                      v-for="item in personOptionData"
                      :key="item.openId"
                      :label="item.name"
                      :value="item.openId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="任务描述" prop="taskDescribe">
              <el-input
                v-model="temp.taskDescribe"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 8 }"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="附件">
              <el-upload
                ref="upload"
                action=""
                :http-request="Upload"
                list-type="picture-card"
                :data="dataOss"
                :multiple="true"
                :limit="imageSizeLimit"
                :on-remove="handleRemove"
                :on-preview="handlePreview"
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
                    <!--
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download" />
                    </span>
                    -->
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

              <el-progress
                v-show="showProgress"
                :text-inside="true"
                :stroke-width="15"
                :percentage="progress"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="horizontal-center">
            <el-button @click="resetForm('dataForm')">
              重置
            </el-button>
            <el-button
              type="primary"
              :loading="loadingSubmitButton"
              :disabled="loadingSubmitButton"
              @click="pageStatus === 'create' ? createData() : updateData()"
            >
              {{ submitButtonText }}
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<style>
.horizontal-center {
  text-align: center;
}

.hide .el-upload--picture-card {
  display: none;
}
</style>

<script>
import { saveTask, updateTask } from '@/api/task'
import { listAllDepartment } from '@/api/department'
import { listAllPerson4Department } from '@/api/person'
import { client } from '@/utils/aliyun.oss.client'

import { date2YearMonthDay } from '@/utils/util.js'

export default {
  data() {
    return {
      files: [],
      addressOss: '',
      dataOss: {},
      submitButtonText: '提交',
      imageLimit: 20,
      imageSizeLimit: 20,
      pageStatus: 'create',
      textMap: {
        update: '编辑',
        create: '创建',
        detail: '详情'
      },
      ossConfig: {
        region: 'oss-cn-hangzhou',
        accessKeyId: 'LTAI4FbewSnGUUvEXhG5hJff',
        accessKeySecret: 'CwB9sLy6cuq51ZGHQpTSM1hAX9tmYR',
        bucket: 'dichong-wuhan',
        secure: true
      },
      showProgress: false,
      progress: 0,
      loading: false,
      loadingSubmitButton: false,
      hideUploadAdd: false,
      departmentOptionData: [],
      personOptionData: [],
      rules: {
        taskType: [
          { required: true, message: '请选择任务类型', trigger: 'change' }
        ],
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 5, max: 50, message: '长度 5-50 个字符', trigger: 'blur' }
        ],
        taskDescribe: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 5, max: 200, message: '长度 5-200 个字符', trigger: 'blur' }
        ],
        endTime: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        departmentId: [
          { required: true, message: '请选择接收人部门', trigger: 'change' }
        ],
        sponsorDepartmentId: [
          { required: true, message: '请选择发起人部门', trigger: 'change' }
        ],
        receiverId: [
          { required: true, message: '请选择接收人', trigger: 'change' }
        ],
        sponsorId: [
          { required: true, message: '请选择发起人', trigger: 'change' }
        ]
      },
      taskTypeRadioOptionData: [
        { code: 1, name: '重点工作' },
        { code: 2, name: '会议事项' },
        { code: 3, name: '领导交办' }
      ],
      temp: {
        id: null,
        taskType: null,
        taskName: null,
        taskDescribe: null,
        endTime: null,
        departmentId: null,
        receiverId: null,
        sponsorDepartmentId: null,
        sponsorId: null,
        version: 0
      },
      initCreateData: {
        id: null,
        taskType: null,
        taskName: null,
        taskDescribe: null,
        endTime: null,
        departmentId: null,
        receiverId: null,
        sponsorId: null,
        version: 0
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  computed: {
  },
  created() {
    this.listAllDepartment()
  },

  methods: {
    listAllDepartment() {
      listAllDepartment()
        .then(response => {
          const data = response.data
          this.departmentOptionData = data
        })
        .catch(e => {
          this.loading = false
        })
    },
    listAllPerson4Department(departmentId) {
      listAllPerson4Department({
        departmentId: departmentId
      })
        .then(response => {
          const data = response.data
          this.personOptionData = data
          this.receiverId = ''
        })
        .catch(e => {})
    },
    handleChangeDepartment(val) {
      this.temp.receiverId = ''
      this.listAllPerson4Department(val)
    },
    handleChangePerson(val) {},
    handleChangeSponsorDepartment(val) {
      this.temp.sponsorId = ''
      this.listAllPerson4Department(val)
    },
    handleChangeSponsorPerson(val) {},
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const files = this.files
          if (files && files.length > 0) {
            this.temp.pictureUrl = files.join(',')
          }
          const tempData = Object.assign({}, this.temp)
          saveTask(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
              } else {
                this.$message({
                  message: '新增失败',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
              }
              loading.close()
              this.$router.push('/task/task')
            })
            .catch(e => {
              loading.close()
              this.initFormSafeSubmitConfig()
            })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.temp)
          updateTask(tempData)
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
              loading.close()
              this.$router.push('/task/task')
            })
            .catch(e => {
              this.initFormSafeSubmitConfig()
              loading.close()
              this.$router.push('/task/task')
            })
        }
      })
    },
    initFormSafeSubmitConfig() {
      this.loadingSubmitButton = false
      this.submitButtonText = '提交'
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$refs.uploadFile.clearFiles()
      this.hideUploadAdd = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleFileChange(file, fileList) {
      // 图片大小限制
      const isLt20M = file.size / 1024 / 1024 < this.$data.imageSizeLimit
      if (!isLt20M) {
        this.$message.error('上传图片大小不能超过 20MB!')
        // 发现某一张超过大小就从列表移除
        fileList.splice(-1, 1)
      } else {
        this.fileListAdd = fileList
        console.log(JSON.stringify(fileList))
      }
      // 上传文件>=限制个数时隐藏上传组件
      if (fileList.length >= this.$data.imageLimit) {
        this.hideUploadAdd = true
      }
    },
    handleFileRemove(file, fileList) {
      this.$confirm('此操作将删除当前图片,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const { temp } = file.response
          const index = this.editForm.pics.findIndex(item => item.pic === temp)
          fileList.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      return true
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`每次只能上传 ${this.limit} 个文件`)
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {},
    // 删除文件之前的钩子
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {},
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.fileList = fileList
    },
    // 文件上传前的校验
    beforeAvatarUpload(file) {
      const isLt100M =
        file.size / 1024 / 1024 > 10 && file.size / 1024 / 1024 < 1024
      const isLt30 = file.name.length < 30
      if (['video/mp4'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt100M) {
        this.$message.error('上传视频大小要在10MB~1GB之间哦!')
        return false
      }
      if (!isLt30) {
        this.$message.error('上传视频文件名称长度必须要小于30个文字哦!')
        return false
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
        const dir = 'dichong/mobileoa365/' + date2YearMonthDay(new Date()) + '/'
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
    }
  }
}
</script>
