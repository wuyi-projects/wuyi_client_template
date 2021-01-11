<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="150px"
        style="width: 100%; padding:10px;"
      >
        <el-row>
          <div
            style="height:60px;border:1px solid #D5D8DF;border-radius:2px;line-height:60px;padding-left:20px;margin-bottom:20px"
          >
            <span>基本信息</span>
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="公司编号" prop="companyId">
                <el-input v-model="temp.companyId" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="凭证分类" prop="voucherType">
                <el-input v-model="temp.voucherType" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="凭证类型代码" prop="voucherTypeCode">
                <el-select
                  v-model="temp.voucherTypeCode"
                  placeholder="请选择"
                  style="width:100%;"
                >
                  <el-option
                    v-for="item in voucherTypeCode"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票代码" prop="voucherCode">
                <el-input v-model="temp.voucherCode" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票号码" prop="voucherNumber">
                <el-input v-model="temp.voucherNumber" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开票日期">
                <el-col :span="24">
                  <el-form-item prop="voucherDate">
                    <el-date-picker
                      v-model="temp.voucherDate"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions"
                      style="width: 100%;"
                    />
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="校验码" prop="checkCode">
                <el-input v-model="temp.checkCode" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="16" />
            <el-col :span="8">
              <el-form-item label="金额" prop="amount">
                <el-input v-model="temp.amount" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="税率" prop="taxRate">
                <el-input v-model="temp.taxRate" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="税额" prop="taxAmount">
                <el-input v-model="temp.taxAmount" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="价税合计" prop="totalAmount">
                <el-input v-model="temp.totalAmount" clearable />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <div
              style="height:60px;border:1px solid #D5D8DF;border-radius:2px;line-height:60px;padding-left:20px;margin-bottom:20px"
            >
              <span>附件</span>
            </div>
            <el-col :span="8">
              <el-form-item label="发票格式" prop="format">
                <el-input v-model="temp.format" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票地址" prop="adress">
                <el-input v-model="temp.adress" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <template v-if="folding" style="margin-top:20px">
            <el-row>
              <div
                style="height:60px;border:1px solid #D5D8DF;border-radius:2px;line-height:60px;padding-left:20px;margin-bottom:20px"
              >
                <span>销售方信息</span>
              </div>
            </el-row>
            <el-col :span="8">
              <el-form-item label="密码区" prop="hash">
                <el-input v-model="temp.hash" clearable />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="机器编号" prop="machineNumber">
                <el-input v-model="temp.machineNumber" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="购买方名称" prop="purchaserName">
                <el-input v-model="temp.purchaserName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="购买方纳税人识别号"
                prop="purchaserRegistrationNumber"
              >
                <el-input
                  v-model="temp.purchaserRegistrationNumber"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="购买方电话" prop="purchaserAddressPhone">
                <el-input v-model="temp.purchaserAddressPhone" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="购买方地址" prop=" purchaserAddress">
                <el-input v-model="temp.purchaserAddress" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电子支付标识" prop="paymentIdentification">
                <el-input v-model="temp.paymentIdentification" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="凭证明细" prop="voucherContent">
                <el-input v-model="temp.voucherContent" clearable />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="销售方名称" prop="sellerName     ">
                <el-input v-model="temp.sellerName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="销售方纳税人识别号"
                prop="sellerRegistrationNumber"
              >
                <el-input v-model="temp.sellerRegistrationNumber" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售方电话" prop="sellerAddressPhone">
                <el-input v-model="temp.sellerAddressPhone" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售方地址" prop="sellerAddress">
                <el-input v-model="temp.sellerAddress" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售方电话" prop="sellerPhone">
                <el-input v-model="temp.sellerPhone" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售方开户行及账号" prop="sellerDepositBank">
                <el-input v-model="temp.sellerDepositBank" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票备注" prop="voucherNote">
                <el-input v-model="temp.voucherNote" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票收款人" prop="voucherPayeeName">
                <el-input v-model="temp.voucherPayeeName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票复核人" prop="voucherAuditorName">
                <el-input v-model="temp.voucherAuditorName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票开票人" prop="voucherOperatorName">
                <el-input v-model="temp.voucherOperatorName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发票格式" prop="voucherFileType">
                <el-input v-model="temp.voucherFileType" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="凭证URL" prop="voucherUrl">
                <el-input v-model="temp.voucherUrl" clearable />
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="24">
            <el-form-item style="text-align:center" label-width="0">
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
        </el-row>
        <el-row>
          <el-col :span="8" :offset="1">
            <el-button
              type="primary"
              @click.native.prevent="handleFapiaoUpload()"
            >上传电子发票</el-button>
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
    <el-dialog
      v-if="importFapiaoFormVisible"
      title="上传电子发票"
      :center="true"
      width="410px"
      :visible.sync="importFapiaoFormVisible"
    >
      <el-form :model="fapiao">
        <ElectronicFapiaoUpload v-model="uploadUrl" />
      </el-form>
      {{ fapiao.url }}
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
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
</style>

<script>
import {
  saveFapiao4Me,
  deleteFapiao4Me,
  updateFapiao4Me,
  getFapiao4Me,
  batchDeleteFapiao4Me,
  listFapiao4Me
} from '@/api/fapiao-management'
import ElectronicFapiaoUpload from '@/components/Upload/ElectronicFapiaoUpload'

export default {
  components: {
    ElectronicFapiaoUpload
  },
  data() {
    return {
      fapiao: {},
      uploadUrl: '',
      importFapiaoFormVisible: false,
      folding: false,
      files: [],
      pictureList: [],
      addressOss: '',
      dataOss: {},
      submitButtonText: '提交',
      pageStatus: 'create',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      voucherTypeCode: [
        { code: 1, name: '增值税电子普通发票' },
        { code: 2, name: '区块链发票' },
        { code: 3, name: '增值税专用发票' },
        { code: 4, name: '增值税普通发票' },
        { code: 5, name: '财政电子发票' },
        { code: 6, name: '增值税普通发票（卷票）' },
        { code: 7, name: '机动车销售统一发票' },
        { code: 8, name: '货运运输业增值税专用发票' },
        { code: 9, name: '定额发票' },
        { code: 10, name: '通用机打发票' }
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
        companyId: [
          { required: true, message: '工作编号' },
          { min: 5, max: 100, message: '工作编号在 10 到 20 个字符' }
        ],
        voucherTypeCode: [{ required: true, message: '发票号码不能为空' }],
        voucherNumber: [
          { required: true, message: '发票号码' },
          { min: 5, max: 100, message: '发票号码在 10 到 20 个字符' }
        ]
      },
      pickerOptions: {
        /* disabledDate(time) {
          return time.getTime() > Date.now()
        }, */
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
      temp: {
        companyId: '',
        voucherType: '发票',
        voucherTypeCode: '',
        voucherCode: '',
        voucherNumber: '',
        voucherDate: '',
        hash: '',
        checkCode: '',
        machineNumber: '',
        purchaserName: '',
        purchaserRegistrationNumber: '',
        purchaserAddressPhone: '',
        purchaserAddress: '',
        purchaserPhone: '',
        paymentIdentification: '',
        voucherContent: '',
        taxRate: '',
        taxAmount: '',
        totalAmount: '',
        sellerName: '',
        sellerRegistrationNumber: '',
        sellerAddressPhone: '',
        sellerAddress: '',
        sellerPhone: '',
        sellerDepositBank: '',
        voucherNote: '',
        voucherPayeeName: '',
        voucherAuditorName: '',
        voucherOperatorName: '',
        voucherFileType: '',
        voucherUrl: ''
      },
      initCreateData: {
        companyId: '',
        voucherType: '发票',
        voucherTypeCode: '',
        voucherCode: '',
        voucherNumber: '',
        voucherDate: '',
        hash: '',
        checkCode: '',
        machineNumber: '',
        purchaserName: '',
        purchaserRegistrationNumber: '',
        purchaserAddressPhone: '',
        purchaserAddress: '',
        purchaserPhone: '',
        paymentIdentification: '',
        voucherContent: '',
        taxRate: '',
        taxAmount: '',
        totalAmount: '',
        sellerName: '',
        sellerRegistrationNumber: '',
        sellerAddressPhone: '',
        sellerAddress: '',
        sellerPhone: '',
        sellerDepositBank: '',
        voucherNote: '',
        voucherPayeeName: '',
        voucherAuditorName: '',
        voucherOperatorName: '',
        voucherFileType: '',
        voucherUrl: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
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
    }
  },
  created() {
    const that = this
    const id = that.$route.query.id
    if (id) {
      that.id = id
      that.getFapiao4Me()
    }
  },
  methods: {
    getFapiao4Me() {
      const that = this
      const id = that.id
      if (id) {
        getFapiao4Me({
          id: id
        })
          .then(response => {
            const data = response.data
            if (data) {
              this.currentBillInfo = data
              this.currentBillUrl = pdf.createLoadingTask({
                url: data.url,
                CMapReaderFactory
              })
            }
          })
          .catch(e => {
            that.loading = false
          })
      }
    },
    handleFapiaoUpload() {
      this.importFapiaoFormVisible = true
    },
    toggleFolding() {
      this.folding = !this.folding
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
      that.$refs['dataForm'].validate(valid => {
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
          saveFapiao4Me(tempData)
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
      that.$refs['dataForm'].validate(valid => {
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
          updateFapiao4Me(tempData)
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
      // this.$refs.uploadFile.clearFiles()
      this.hideUploadAdd = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
