<template>
  <div class="app-container">
    <!--数据展示-->
    <el-card class="box-card">
      <el-container>
        <el-main>
          <el-row>
            <el-col>
              <pdf ref="pdf" :src="currentBillUrl" />
            </el-col>
          </el-row>
          <el-row>
            <div style="height:40px;color:#72767b;margin-bottom:20px">
              <el-row :span="4">
                <span style="font-weight:bold;font-size:20px">文件详情</span>
              </el-row>
            </div>
            <div style="padding:0 40px;">
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">凭证名称</span>{{ currentBilleInfo.voucherName }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">发票代码</span>{{ currentBilleInfo.voucherCode }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">发票号码</span>{{ currentBilleInfo.voucherNumber }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">开票日期</span>{{ currentBilleInfo.voucherDate }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">密码区</span>{{ currentBilleInfo.hash }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">校验码</span>{{ currentBilleInfo.checkCode }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">机器编号</span>{{ currentBilleInfo.machineNumber }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">购买方名称</span>{{ currentBilleInfo.purchaserName }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">购买方纳税人识别号</span>{{ currentBilleInfo.purchaserRegistrationNumber }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">购买方地址、电话</span>{{ currentBilleInfo.purchaserAddressPhone }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">购买方地址</span>{{ currentBilleInfo.purchaserAddress }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">购买方电话</span>{{ currentBilleInfo.purchaserPhone }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">电子支付标识</span>{{ currentBilleInfo.paymentIdentification }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">凭证明细</span>{{ currentBilleInfo.voucherContent }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">税率</span>{{ currentBilleInfo.taxRate }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">税额</span>{{ currentBilleInfo.taxAmount }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">价税合计</span>{{ currentBilleInfo.totalAmount }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">销售方名称</span>{{ currentBilleInfo.sellerName }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">销售方纳税人识别号</span>{{ currentBilleInfo.sellerRegistrationNumber }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">销售方地址、电话</span>{{ currentBilleInfo.sellerAddressPhone }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">销售方地址</span>{{ currentBilleInfo.sellerAddress }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">销售方电话</span>{{ currentBilleInfo.sellerPhone }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">销售方开户行及账号</span>{{ currentBilleInfo.sellerDepositBank }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">发票备注</span>{{ currentBilleInfo.voucherNote }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">发票收款人</span>{{ currentBilleInfo.voucherPayeeName }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">发票复核人</span>{{ currentBilleInfo.voucherAuditorName }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">发票开票人</span>{{ currentBilleInfo.voucherOperatorName }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">发票格式</span>{{ currentBilleInfo.voucherBillType }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">凭证URL</span>{{ currentBilleInfo.voucherUrl }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">是否报销</span>{{ currentBilleInfo.reimbursementFlag }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">报销日期</span>{{ currentBilleInfo.reimbursementTime }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">报销批次号</span>{{ currentBilleInfo.reimbursementBatchNumber }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">是否记账</span>{{ currentBilleInfo.accountingFlag }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">记账日期</span>{{ currentBilleInfo.accountingTime }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">记账编号</span>{{ currentBilleInfo.accountingInfoId }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">凭证状态</span>{{ currentBilleInfo.voucherStatus }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">操作人编号</span>{{ currentBilleInfo.operatorId }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">录入人</span>{{ currentBilleInfo.operatorName }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">录入时间</span>{{ currentBilleInfo.operateTime }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">审核人编号</span>{{ currentBilleInfo.auditorId }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">审核人名称</span>{{ currentBilleInfo.auditorName }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">审核时间</span>{{ currentBilleInfo.auditTime }}
                </el-col>
              </el-row>
              <el-row style="height:30px;">
                <el-col :span="8">
                  <span style="font-weight:bold;">审核意见</span>{{ currentBilleInfo.opinion }}
                </el-col>

                <el-col :span="8">
                  <span style="font-weight:bold;">备注</span>{{ currentBilleInfo.note }}
                </el-col>
              </el-row>
            </div>
          </el-row>
        </el-main>
      </el-container>
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
/* import formatTableSize from '@/utils/size' */
import { getFileDetail } from '@/api/file-mangement'
import pdf from 'vue-pdf'
/* import {
  listBillInfo,
  saveBillInfo,
  deleteBillInfo,
  updateBillInfo
} from '@/api/bill-info' */
/* 插槽 */
/* import Templet from '../templet/templet.vue' */
export default {
  components: {
    pdf
  },
  data() {
    return {
      BillInfoGroupInfoOptions: [],
      defaultHeight: '500px',
      tableHeight: '460px',
      currentBilleInfo: {},
      currentBillUrl: '',
      currentGroupInfo: {},
      row: ''
    }
  },
  created() {
    const that = this
    const id = that.$route.query.id
    if (id) {
      that.id = id
      that.getFileDetail()
    }
  },
  methods: {
    getFileDetail() {
      const that = this
      const id = that.id
      if (id) {
        getFileDetail({
          id: id
        })
          .then(response => {
            const data = response.data
            const that=this
            var thatdata=that.data
            if (!data) {
              return
            }
            // this.row=data
          })
          .catch(e => {
            that.loading = false
            this.currentBillInfo = {}
            this.currentBillUrl =
              'https://' +
              thatdata.bucket +
              '.oss-cn-hangzhou.aliyuncs.com/' +
              thatdata.filename
          })
      }
    },
    getHeight() {
      this.defaultHeight = window.innerHeight - 180 + 'px'
      this.tableHeight = window.innerHeight - 180 - 40 + 'px'
    }
  }
}
</script>
