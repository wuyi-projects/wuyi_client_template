<template>
  <div>
    <el-upload
      ref="upload"
      :auto-upload="false"
      :action="uploadUrl"
      :before-upload="fnBeforeUpload"
      :on-success="fnUploadSuccess"
      :on-exceed="fnUploadExceed"
      :data="data_extra"
      :headers="uploadHeaders"
      :http-request="fnUploadRequest"
      drag
      :limit="files"
      :disabled="disabled"
      multiple
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">上传文件大小不能超过 1G</div>
    </el-upload>
  </div>
</template>
<script>
import UploadFileApi from '@/api/system/UploadFileApi'
import OSS from 'ali-oss'
export default {
  name: 'FileUpload',
  props: {
    data_extra: {
      type: Object,
      required: true
    },
    accept: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      uploadUrl: '',
      uploadFileLength: 0,
      uploadFileSuccess: 0,
      uploadFileNames: [],
      uploadFileName: [],
      fileList: [],
      files: 10,
      uploadHeaders: {
        authorization: ''
      },
      disabled: false
    }
  },
  methods: {
    /**
 * @description [fnUploadRequest 覆盖默认的上传行为，实现自定义上传]
 * @author shanshuizinong
 * @param {object} option [上传选项]
 * @return {null} [没有返回]
 */
    async fnUploadRequest(option) {
      try {
        const vm = this
        vm.disabled = true
        // 获取OSS配置信息
        const uploadFileApi = new UploadFileApi()
        let ret = await uploadFileApi.fileOssParams()
        if (!(ret.data && ret.data.code === '0' && ret.data.data)) {
          throw new Error('获取OSS参数失败')
        }
        const ossData = JSON.parse(ret.data.data)
        const relativePath = ossData.relativePath
        const client = new OSS.Wrapper({
          policy: ossData.policy,
          accessKeyId: ossData.accessid,
          accessKeySecret: ossData.accesssecret,
          bucket: ossData.bucket,
          signature: ossData.signature
        })
        const file = option.file
        const point = file.name.lastIndexOf('.')
        const suffix = file.name.substr(point)
        const fileName = file.name.substr(0, point)
        const date = vm.$moment().format('YYYYMMDDHHmm')
        const fileNames = `${fileName}_${date}${suffix}`
        // 分片上传文件
        ret = await client.multipartUpload(relativePath + fileNames, file, {
          progress: async function(p) {
            const e = {}
            e.percent = p * 100
            option.onProgress(e)
          }
        })
        console.log(ret)
        if (ret.res.statusCode === 200) {
          // option.onSuccess(ret)
          return ret
        } else {
          vm.disabled = false
          option.onError('上传失败')
        }
      } catch (error) {
        console.error(error)
        this.disabled = false
        option.onError('上传失败')
        this.$error(error.message)
      }
    },
    /**
 * @description [fnUploadSuccess 文件上传成功的函数]
 * @author shanshuizinong
 * @return {null} [没有返回]
 */
    async fnUploadSuccess() {
      // TODO
    }
  }
}
</script>
