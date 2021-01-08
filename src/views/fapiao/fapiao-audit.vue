<template>
  <div class="app-container">
    <!--数据展示-->
    <el-card class="box-card">
      <el-page-header content="详情页面" @back="goBack" />
      <el-row type="flex">
        <el-col
          justify="center"
          align="middle"
          style="
            background-color: #f0f0f0;
            padding: 5px 0;
            height: 360px;
            overflow-y: auto;
            position: relative;
          "
        >
          <pdf
            ref="pdf"
            :style="{ width: fapiaoDisplayWidth }"
            :src="currentBillUrl"
            :page="currentPage"
            @progress="getProgress"
            @page-loaded="currentPage = $event"
            @loaded="loadPdfHandler"
          />
        </el-col>
      </el-row>
      <el-row style="text-align:center;top:-40px;z-index:999;">
        <el-col style="margin:0 auto;float: left;">
          <el-button-group>
            <el-button
              round
              size="mini"
              :class="{ select: idx == 0 }"
              @touchstart="idx = 0"
              @touchend="idx = -1"
              @click="scaleD"
            >放大</el-button>
            <el-button
              round
              size="mini"
              :class="{ select: idx == 0 }"
              @touchstart="idx = 0"
              @touchend="idx = -1"
              @click="reset"
            >还原</el-button>
            <el-button
              round
              size="mini"
              :class="{ select: idx == 1 }"
              @touchstart="idx = 1"
              @touchend="idx = -1"
              @click="scaleX"
            >缩小</el-button>
            <el-button
              round
              size="mini"
              @click="downloadFapiao"
            >下载</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row>
        <div style="color: #72767b; margin: 10px 0">
          <el-row :span="4">
            <span style="font-weight: bold; font-size: 16px">发票详情</span>
          </el-row>
        </div>
        <div style="padding: 0 40px; font-size: 14px">
          <!-- <el-col :span="8">
                <span style="font-weight:bold;">凭证名称 ：</span>{{ currentBillInfo.voucherName }}
              </el-col> -->
          <el-row type="flex">
            <el-col :span="8">
              <span style="font-weight: bold">机器编号 ：</span>{{ currentBillInfo.machineNumber }}
            </el-col>
            <el-col :span="8" />
            <el-col :span="8">
              <span style="font-weight: bold">发票代码 ：</span>{{ currentBillInfo.voucherCode }}
            </el-col>
          </el-row>
          <el-col :span="8">
            <span style="font-weight: bold">购买方名称 ：</span>{{ currentBillInfo.purchaserName }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">销售方名称 ：</span>{{ currentBillInfo.sellerName }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">发票号码 ：</span>{{ currentBillInfo.voucherNumber }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">购买方纳税人识别号 ：</span>{{ currentBillInfo.purchaserRegistrationNumber }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">销售方纳税人识别号 ：</span>{{ currentBillInfo.sellerRegistrationNumber }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">开票日期 ：</span>{{ currentBillInfo.voucherDate }}
          </el-col>
          <el-row>
            <el-col :span="8">
              <span style="font-weight: bold">购买方地址、电话 ：</span>{{ currentBillInfo.purchaserAddressPhone }}
            </el-col>
            <el-col :span="8">
              <span style="font-weight: bold">销售方地址、电话 ：</span>{{ currentBillInfo.sellerAddressPhone }}
            </el-col>
            <el-col :span="8">
              <span style="font-weight: bold">校验码 ：</span>{{ currentBillInfo.checkCode }}
            </el-col>
          </el-row>
          <el-col :span="8">
            <span style="font-weight: bold">购买方开户行及账号 ：</span>{{ currentBillInfo.purchaserDepositBank }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">销售方开户行及账号 ：</span>{{ currentBillInfo.sellerDepositBank }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">密码区 ：</span>{{ currentBillInfo.hash }}
          </el-col>
          <el-col :span="24">
            <span style="font-weight: bold">凭证明细 ：</span>
          </el-col>
          <el-col :span="24">
            {{ currentBillInfo.voucherContent }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">价税合计 ：</span>{{ currentBillInfo.totalAmount }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">税率 ：</span>{{ currentBillInfo.taxRate }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">税额 ：</span>{{ currentBillInfo.taxAmount }}
          </el-col>
          <el-col :span="24">
            <span style="font-weight: bold">发票备注 ：</span>
          </el-col>
          <el-col :span="24" type="flex">
            {{ currentBillInfo.voucherNote }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">发票收款人 ：</span>{{ currentBillInfo.voucherPayeeName }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">发票复核人 ：</span>{{ currentBillInfo.voucherAuditorName }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">发票开票人 ：</span>{{ currentBillInfo.voucherOperatorName }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">备注 ：</span>{{ currentBillInfo.note }}
          </el-col>
        </div>
      </el-row>
      <el-row style="margin-top:10px;">
        <div style="color: #72767b; margin: 10px 0">
          <el-row :span="4">
            <span style="font-weight: bold; font-size: 16px">其他信息</span>
          </el-row>
        </div>
        <div style="padding: 0 40px; font-size: 14px">
          <el-col :span="8">
            <span style="font-weight: bold">购买方地址 ：</span>{{ currentBillInfo.purchaserAddress }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">购买方电话 ：</span>{{ currentBillInfo.purchaserPhone }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">电子支付标识 ：</span>{{ currentBillInfo.paymentIdentification }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">销售方地址 ：</span>{{ currentBillInfo.sellerAddress }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight: bold">销售方电话 ：</span>{{ currentBillInfo.sellerPhone }}
          </el-col>
        </div>
      </el-row>
    </el-card>
    <el-card
      class="box-card"
      :style="{ width: mainWidth }"
      style="position:fixed;bottom:0px;"
    >
      <el-row type="flex">
        <el-col align="middle">
          <el-button type="primary" @click="success()"> 审核通过 </el-button>
          <el-button @click="failure()">审核不通过</el-button>
        </el-col>
      </el-row>
    </el-card>
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
        label-width="150px"
        style="width: 100%; padding:10px;"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核不通过的原因:" prop="groupName">
              <el-input
                v-model="temp.groupName"
                :rows="5"
                type="textarea"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-if="dialogStatus !== 'create'">
          <el-button @click="resetForm('dataForm')">
            重置
          </el-button>
          <el-button
            type="primary"
            :loading="loadingSubmitButton"
            :disabled="loadingSubmitButton"
            @click="createData()"
          >
            {{ submitButtonText }}
          </el-button>
        </template>
      </div>
    </el-dialog>
    <!-- 创建/修改表单 -->
  </div>
</template>

<style scoped>
.horizontal-center {
  text-align: center;
}
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
import pdf from 'vue-pdf'
import { getSmartParsing } from '@/api/smart-parsing'

export default {
  components: {
    pdf
  },
  data() {
    return {
      dialogStatus: '',
      rules: {
        groupName: [
          {
            required: true,
            message: '请输入不通过原因',
            trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: false,
      loadingSubmitButton: false,
      submitButtonText: '提交',
      temp: {
        groupName: ''
      },
      initCreateData: {
        groupName: ''
      },
      textMap: {
        created: '审核失败原因'
      },

      currentBillInfo: {},
      currentBillUrl: '',
      currentBillUrlString: '',
      fapiaoDisplayWidth: '520px',
      idx: -1,
      origWidth4Pdf: '520px',
      currentPage: 1
    }
  },
  created() {
    window.addEventListener('resize', this.getFapiaoDisplayWidth)
    this.getFapiaoDisplayWidth()
    window.addEventListener('resize', this.getMainWidth)
    this.getMainWidth()
    const that = this
    const id = that.$route.query.id
    if (id) {
      that.id = id
      that.getSmartInfo()
    }
  },
  methods: {
    failure() {
      this.temp = Object.assign({}, this.initCreateData)
      this.dialogStatus = 'created'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
          savePermissionGroupInfo(tempData)
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
    getFapiaoDisplayWidth() {
      const width = parseInt((window.innerWidth - 210 - 20 * 2) * 0.4)
      this.fapiaoDisplayWidth =
        (width < 520 ? 520 : width > 1200 ? 1200 : width) + 'px'
      this.origWidth4Pdf = this.fapiaoDisplayWidth
    },
    getMainWidth() {
      this.mainWidth = window.innerWidth - 230 - 20 * 2 + 'px'
    },
    getSmartInfo() {
      const that = this
      const id = that.id
      if (id) {
        getSmartParsing({
          id: id
        })
          .then(response => {
            const data = response.data
            if (data) {
              this.currentBillInfo = data
              // this.currentBillUrl = pdf.createLoadingTask({
              //   url: data.url,
              //   cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/',
              //   cMapPacked: true
              // })
              this.currentBillUrl = pdf.createLoadingTask({
                url: data.url,
                cMapUrl: '../../../../cmaps/',
                cMapPacked: true
              })
              this.currentBillUrlString = data.url
            }
          })
          .catch(e => {
            that.loading = false
          })
      }
    },
    // 放大
    scaleD() {
      const orig = this.$refs.pdf.$el.style.width
      const width = parseInt(orig.substring(0, orig.length - 2)) + 20
      const maxWidth = parseInt(window.innerWidth - 210 - 20 * 2)
      if (width >= maxWidth) {
        this.$refs.pdf.$el.style.width = maxWidth + 'px'
        this.$message({
          type: 'success',
          message: '已放大到最大级别'
        })
      } else {
        this.$refs.pdf.$el.style.width = width + 'px'
      }
    },
    // 还原
    reset() {
      this.$refs.pdf.$el.style.width = this.origWidth4Pdf
    },
    // 缩小
    scaleX() {
      const orig = this.$refs.pdf.$el.style.width
      const width = parseInt(orig.substring(0, orig.length - 2)) - 20
      const minWidth = parseInt((window.innerWidth - 210 - 20 * 2) * 0.3)
      if (width <= minWidth) {
        this.$refs.pdf.$el.style.width = minWidth + 'px'
        this.$message({
          type: 'success',
          message: '已缩小到最小级别'
        })
      } else {
        this.$refs.pdf.$el.style.width = width + 'px'
      }
    },
    loadPdfHandler() {},
    // 返回
    goBack() {
      this.$router.go(-1)
    },
    // 下载
    downloadFapiao() {
      if (!this.currentBillUrlString) {
        this.$message.error('发票地址不合法')
      }
      const billInfo = this.currentBillInfo
      let fileName = ''
      const temp = []
      if (billInfo) {
        if (billInfo.voucherDate) {
          temp.push(billInfo.voucherDate)
        }
        if (billInfo.sellerName) {
          temp.push(billInfo.sellerName)
        }
        if (temp && temp.length > 0) {
          fileName = '发票_' + temp.join('_') + '.pdf'
        } else {
          fileName = '发票.pdf'
        }
      } else {
        fileName = '发票.pdf'
      }
      this.downloadPDF(this.currentBillUrlString, fileName)
    },
    downloadPDF(url, fileName) {
      fetch(url)
        .then(function(response) {
          if (response.ok) {
            return response.arrayBuffer()
          }
          throw new Error('Network response was not ok.')
        })
        .then(function(arraybuffer) {
          const blob = new Blob([arraybuffer], {
            type: `application/pdf;charset-UTF-8` // word文档为msword,pdf文档为pdf
          })

          const objectURL = URL.createObjectURL(blob)

          const downEle = document.createElement('a')
          const fname = fileName // 下载文件的名字
          // let fname = `download` // 下载文件的名字
          downEle.href = objectURL
          downEle.setAttribute('download', fname)
          document.body.appendChild(downEle)
          downEle.click()
        })
        .catch(function(e) {
          this.$message.error('发票下载异常')
        })
    }
  }
}
</script>
