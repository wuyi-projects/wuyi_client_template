<template>
  <div class="app-container">
    <!--数据展示-->
    <el-card class="box-card">
      <el-row type="flex">
        <el-col
          justify="center"
          align="middle"
          style="background-color:#f0f0f0;padding:10px 0;height:360px; overflow:scroll;position:relative;"
        >
          <pdf ref="pdf" style="width:37.2%;" :src="currentBillUrl" />

          <el-row style="position:absolute;bottom:10px;width:100%;">
            <el-col justify="center" align="middle">
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
              </el-button-group>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <div style="color:#72767b;margin:10px 0">
          <el-row :span="4">
            <span style="font-weight:bold;font-size:16px;">文件详情</span>
          </el-row>
        </div>
        <div style="padding:0 40px;font-size:14px;">
          <!-- <el-col :span="8">
                <span style="font-weight:bold;">凭证名称 ：</span>{{ currentBillInfo.voucherName }}
              </el-col> -->
          <el-col :span="8">
            <span style="font-weight:bold;">机器编号 ：</span>{{ currentBillInfo.machineNumber }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">发票代码 ：</span>{{ currentBillInfo.voucherCode }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">发票号码 ：</span>{{ currentBillInfo.voucherNumber }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">开票日期 ：</span>{{ currentBillInfo.voucherDate }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">密码区 ：</span>{{ currentBillInfo.hash }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">校验码 ：</span>{{ currentBillInfo.checkCode }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">购买方名称 ：</span>{{ currentBillInfo.purchaserName }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">购买方纳税人识别号 ：</span>{{ currentBillInfo.purchaserRegistrationNumber }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">购买方地址、电话 ：</span>{{ currentBillInfo.purchaserAddressPhone }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">购买方地址 ：</span>{{ currentBillInfo.purchaserAddress }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">购买方电话 ：</span>{{ currentBillInfo.purchaserPhone }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">购买方开户行及账号 ：</span>{{ currentBillInfo.purchaserDepositBank }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">电子支付标识 ：</span>{{ currentBillInfo.paymentIdentification }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">凭证明细 ：</span>{{ currentBillInfo.voucherContent }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">税率 ：</span>{{ currentBillInfo.taxRate }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">税额 ：</span>{{ currentBillInfo.taxAmount }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">价税合计 ：</span>{{ currentBillInfo.totalAmount }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">销售方名称 ：</span>{{ currentBillInfo.sellerName }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">销售方纳税人识别号 ：</span>{{ currentBillInfo.sellerRegistrationNumber }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">销售方地址、电话 ：</span>{{ currentBillInfo.sellerAddressPhone }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">销售方地址 ：</span>{{ currentBillInfo.sellerAddress }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">销售方电话 ：</span>{{ currentBillInfo.sellerPhone }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">销售方开户行及账号 ：</span>{{ currentBillInfo.sellerDepositBank }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">发票备注 ：</span>{{ currentBillInfo.voucherNote }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">发票收款人 ：</span>{{ currentBillInfo.voucherPayeeName }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">发票复核人 ：</span>{{ currentBillInfo.voucherAuditorName }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">发票开票人 ：</span>{{ currentBillInfo.voucherOperatorName }}
          </el-col>
          <el-col :span="8">
            <span style="font-weight:bold;">备注 ：</span>{{ currentBillInfo.note }}
          </el-col>
        </div>
      </el-row>
    </el-card>
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
import pdf from 'vue-pdf'
// 修复中文显示异常
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
import { getSmartParsing } from '@/api/smart-parsing'

export default {
  components: {
    pdf
  },
  data() {
    return {
      currentBillInfo: {},
      currentBillUrl: '',
      scale: 100, // 放大系数
      idx: -1,
      origWidth4Pdf: 0
    }
  },
  created() {
    const that = this
    const id = that.$route.query.id
    if (id) {
      that.id = id
      that.getSmartInfo()
    }
  },
  methods: {
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
              this.currentBillUrl = pdf.createLoadingTask({
                url: data.url,
                CMapReaderFactory
              })
              // 加载完PDF后清除缓存,保证再次进入不出现显示不完整情况
              for (var key in require.cache) {
                if (key.indexOf('bcmap') >= 0) {
                  delete require.cache[key]
                }
              }
              this.origWidth4Pdf = this.$refs.pdf.$el.style.width
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
      console.log('orig' + orig)
      const width = orig.substring(0, orig.length - 1)
      this.$refs.pdf.$el.style.width = width * 1.05 + '%'
    },
    reset() {
      this.$refs.pdf.$el.style.width = this.origWidth4Pdf
    },
    // 缩小
    scaleX() {
      const orig = this.$refs.pdf.$el.style.width
      const width = orig.substring(0, orig.length - 1)
      this.$refs.pdf.$el.style.width = width * 0.95 + '%'
    }
  }
}
</script>
