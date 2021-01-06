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
            <el-form-item label="新闻标题" prop="title">
              <el-input v-model="temp.title" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布人" prop="publisher">
              <el-input v-model="temp.publisher" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权重" prop="weight">
              <el-select v-model="temp.weight" placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="item in weightOptionData"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新闻内容" prop="content">
              <el-input v-model="temp.content" :autosize="{ minRows: 10, maxRows: 10}" type="textarea" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="新闻图片">
              <el-upload
                ref="upload"
                action=""
                :http-request="Upload"
                list-type="picture-card"
                :data="dataOss"
                :multiple="true"
                :limit="imageSizeLimit"
                :on-preview="handlePreview"
                :file-list="pictureList"
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
                    <!--
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete" />
                    </span>
                    -->
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

<style scoped>
.horizontal-center {
  text-align: center;
}

.hide .el-upload--picture-card {
  display: none;
}
</style>

<script>
import { saveNews, updateNews, getNews } from '@/api/news'
import { listAllDepartment } from '@/api/department'
import { listAllPerson4Department } from '@/api/person'
import { client } from '@/utils/aliyun.oss.client'

import { date2YearMonthDay } from '@/utils/util.js'

export default {
  data() {
    return {
      files: [],
      pictureList: [],
      addressOss: '',
      dataOss: {},
      submitButtonText: '提交',
      imageLimit: 20,
      imageSizeLimit: 20,
      pageStatus: 'create',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      weightOptionData: [
        { code: 0,
          name: '默认' },
        { code: 10,
          name: '优先' },
        { code: 100,
          name: '置顶' }
      ],
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
        title: [
          { required: true, message: '请输入新闻标题' },
          { min: 5, max: 100, message: '名称长度在 5 到 100 个字符' }
        ],
        content: [
          { required: true, message: '请输入新闻内容' },
          { min: 5, max: 5000, message: '名称长度在 5 到 5000 个字符' }
        ]
      },
      temp: {
        id: null,
        title: '',
        content: '',
        weight: 0,
        publisher: '',
        publishStatus: 0,
        pictures: [],
        version: 0
      },
      initCreateData: {
        id: null,
        title: '',
        content: '',
        weight: 0,
        publisher: '',
        publishStatus: 0,
        pictures: [],
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
    const that = this
    const id = that.$route.params.id
    const pageStatus = that.$route.params.pageStatus
    if (pageStatus) {
      that.pageStatus = pageStatus
      if (id) {
        that.temp.id = id
        that.getNews()
      }
    }
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
    getNews() {
      const that = this
      getNews({
        id: that.temp.id
      })
        .then(response => {
          const data = response.data
          if (data && data.pictures && data.pictures.length > 0) {
            const pictures = data.pictures
            for (var index = 0, len = pictures.length; index < len; index++) {
              that.pictureList.push({
                'url': pictures[index].pictureUrl,
                'name': pictures[index].sequenceNo,
                'id': pictures[index].id
              })
            }
          } else {
            data.pictures = []
          }
          this.temp = data
        })
        .catch(e => {
          this.loading = false
        })
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
      const that = this
      that.$refs['dataForm'].validate((valid) => {
        if (valid) {
          that.loadingSubmitButton = true
          that.submitButtonText = '执行中...'

          const files = that.files
          if (files && files.length > 0) {
            for (var index = 0, len = files.length; index < len; index++) {
              that.temp.pictures.push({
                type: 1,
                pictureUrl: files[index],
                sequenceNo: index
              })
            }
          }
          const tempData = Object.assign({}, that.temp)
          saveNews(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                that.$message({
                  message: '新增成功',
                  type: 'success'
                })
                that.initFormSafeSubmitConfig()
              } else {
                that.$message.error('新增失败')
                that.initFormSafeSubmitConfig()
              }
              // that.$router.push('/news/news')
            })
            .catch(e => {
              that.loading = false
              that.initFormSafeSubmitConfig()
              // that.$router.push('/news/news')
            })
        }
      })
    },
    updateData() {
      const that = this
      that.$refs['dataForm'].validate((valid) => {
        if (valid) {
          that.loadingSubmitButton = true
          that.submitButtonText = '执行中...'
          const files = that.files
          if (files && files.length > 0) {
            for (var index = 0, len = files.length; index < len; index++) {
              that.temp.pictures.push({
                type: 1,
                pictureUrl: files[index],
                sequenceNo: index
              })
            }
          }
          const tempData = Object.assign({}, that.temp)
          updateNews(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                that.$message({
                  message: '修改操作成功',
                  type: 'success'
                })
                that.initFormSafeSubmitConfig()
              } else {
                that.$message.error('修改操作失败')
                that.initFormSafeSubmitConfig()
              }
              // that.$router.push('/news/news')
            })
            .catch(e => {
              that.loading = false
              that.initFormSafeSubmitConfig()
              // that.$router.push('/news/news')
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
    handleRemove(file, fileList) {
      console.log('删除')
      const that = this
      that.$confirm('此操作将删除当前图片,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.files = fileList
        })
        .catch((err) => {
          console.log(JSON.stringify(err))
          that.$message({
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
