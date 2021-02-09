<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-page-header content="录入体型数据" @back="goBack" />
      <el-divider />
      <!-- <div slot="header" class="clearfix">
        <span>客户体型信息录入</span>
      </div> -->
      <el-row>
        <el-form
          ref="dataForm"
          :model="formData"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-formData"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-col :span="24">
                <el-form-item label="姓名" prop="name">
                  <el-input
                    v-model="customerInfo.name"
                    placeholder="输入姓名"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="体重" prop="weight">
                  <el-input
                    v-model="formData.weight"
                    placeholder="输入体重"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="BB" prop="bbValue">
                  <el-input
                    v-model="formData.bbValue"
                    placeholder="输入BB"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="BP左" prop="bpLeftValue">
                  <el-input
                    v-model="formData.bpLeftValue"
                    placeholder="输入BP左"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="BP右" prop="bpRightValue">
                  <el-input
                    v-model="formData.bpRightValue"
                    placeholder="输入BP右"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="上胸围" prop="upperChestValue">
                  <el-input
                    v-model="formData.upperChestValue"
                    placeholder="输入上胸围"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="下胸围" prop="underChestValue">
                  <el-input
                    v-model="formData.underChestValue"
                    placeholder="输入下胸围"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="胃围" prop="gastricValue">
                  <el-input
                    v-model="formData.gastricValue"
                    placeholder="输入胃围"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="腰围" prop="waistlineValue">
                  <el-input
                    v-model="formData.waistlineValue"
                    placeholder="输入腰围"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="腹围" prop="abdominalValue">
                  <el-input
                    v-model="formData.abdominalValue"
                    placeholder="输入腹围"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="臀围" prop="hiplineValue">
                  <el-input
                    v-model="formData.hiplineValue"
                    placeholder="输入臀围"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="臀高" prop="armHigh">
                  <el-input
                    v-model="formData.armHigh"
                    placeholder="输入臀高"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="左大腿" prop="leftThighValue">
                  <el-input
                    v-model="formData.leftThighValue"
                    placeholder="输入左大腿"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="右大腿" prop="rightThighValue">
                  <el-input
                    v-model="formData.rightThighValue"
                    placeholder="输入右大腿"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    clearable
                  >
                    <template slot="append">厘米</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="16">

              <el-col :span="8">
                <el-form-item label="类型" prop="type">
                  <el-select
                    v-model="formData.type"
                    placeholder="选择方案版本"
                    style="width:100%"
                    disabled
                  >
                    <el-option
                      v-for="item in solutionVersionOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="次数" prop="times">
                  <el-input
                    v-model="formData.times"
                    placeholder="输入次数"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期" prop="recordTime">
                  <el-date-picker
                    v-model="formData.recordTime"
                    type="date"
                    style="width: 100%"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-image
                  fit="contain"
                  :src="require('@/assets/images/body.jpg')"
                />
              </el-col>
            </el-col>
          </el-row>
          <!-- <el-col :span="24" :offset="10">
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('dataForm')"
              >提交</el-button>
              <el-button @click="resetForm('dataForm')">重置</el-button>
            </el-form-item>
          </el-col> -->
          <el-col :span="24" :offset="10">
            <el-form-item>
              <el-button
                type="primary"
                :loading="loadingSubmitButton"
                :disabled="loadingSubmitButton"
                @click="pageStatus === 'create' ? createData() : updateData()"
              >提交</el-button>
              <el-button @click="resetForm('dataForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>

<style>
input:-webkit-outer-spin-button,
input:-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
.title-border {
  padding: 20px;
  border: 1px solid #e9e9e9;
  margin-bottom: 20px;
}
</style>

<script>
import moment from 'moment'
import { getCustomerBasicInfo } from '@/api/customer-basic-info'

import { getBodyDataRecord, saveBodyDataRecord, updateBodyDataRecord } from '@/api/body-data-record'

export default {
  data() {
    return {
      loadingSubmitButton: false,
      submitButtonText: '提交',
      pageStatus: 'create',
      customerInfo: {},
      formData: {
        id: null,
        openId: null,
        type: 1,
        times: null,
        weight: null,
        bbValue: null,
        bpLeftValue: null,
        bpRightValue: null,
        upperChestValue: null,
        underChestValue: null,
        gastricValue: null,
        waistlineValue: null,
        abdominalValue: null,
        hiplineValue: null,
        armHigh: null,
        leftThighValue: null,
        rightThighValue: null,
        recordTime: null,
        status: null,
        confirmTime: null,
        version: 0
      },
      rules: {
        times: [{ required: true, message: '次数必填', trigger: 'blur' }],
        weight: [{ required: true, message: '体重必填', trigger: 'blur' }],
        bbValue: [{ required: true, message: 'BB值必填', trigger: 'blur' }],
        bpLeftValue: [{ required: true, message: 'BP左值必填', trigger: 'blur' }],
        bpRightValue: [{ required: true, message: 'BP右值必填', trigger: 'blur' }],
        upperChestValue: [{ required: true, message: '上胸围值必填', trigger: 'blur' }],
        underChestValue: [{ required: true, message: '下胸围值必填', trigger: 'blur' }],
        gastricValue: [{ required: true, message: '胃围值必填', trigger: 'blur' }],
        waistlineValue: [{ required: true, message: '腰围值必填', trigger: 'blur' }],
        abdominalValue: [{ required: true, message: '腹围值必填', trigger: 'blur' }],
        hiplineValue: [{ required: true, message: '臀围值必填', trigger: 'blur' }],
        armHigh: [{ required: true, message: '臀高值必填', trigger: 'blur' }],
        leftThighValue: [{ required: true, message: '左大腿值必填', trigger: 'blur' }],
        rightThighValue: [{ required: true, message: '右大腿值必填', trigger: 'blur' }]
      },
      pickerOptions: {
      },
      solutionVersionOptions: [
        { name: '实测数据',
          value: 1
        },
        { name: '目标数据',
          value: 0
        }
      ]
    }
  },
  created() {
    const that = this
    const customerId = that.$route.query.customerId
    const id = that.$route.query.id
    if (customerId) {
      that.customerInfo.customerId = customerId
      that.pageStatus = 'update'
      that.getCustomerBasicInfo()
    }
    if (id) {
      // 修改操作
    } else {
      that.formData.recordTime = moment(new Date()).format('YYYY-MM-DD')
    }
  },
  methods: {
    getCustomerBasicInfo() {
      const that = this
      const customerId = that.customerInfo.customerId
      if (customerId) {
        getCustomerBasicInfo({
          id: customerId
        })
          .then(response => {
            const data = response.data
            if (!data) {
              return
            }
            that.customerInfo = data
            that.formData.openId = data.openId
          })
          .catch(e => {
            that.loading = false
          })
      }
    },
    createData() {
      const that = this
      that.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.formData)
          saveBodyDataRecord(tempData)
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
          this.$router.push('/customer/customer-basic-info')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateData() {
      const that = this
      that.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.formData)
          saveBodyDataRecord(tempData)
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
          this.$router.push('/customer/customer-basic-info')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       this.loadingSubmitButton = true
    //       this.submitButtonText = '执行中...'
    //       const tempData = Object.assign({}, this.formData)
    //       saveBodyDataRecord(tempData)
    //         .then(response => {
    //           const result = response.data
    //           if (result) {
    //             this.$message({
    //               message: '新增成功',
    //               type: 'success'
    //             })
    //             this.initFormSafeSubmitConfig()
    //             this.dialogFormVisible = false
    //             this.$refs.dataGrid.commitProxy('reload')
    //           } else {
    //             this.$message.error('新增失败')
    //             this.initFormSafeSubmitConfig()
    //           }
    //         })
    //         .catch(e => {
    //           this.loading = false
    //           this.initFormSafeSubmitConfig()
    //         })
    //       this.$router.push('/customer/customer-basic-info')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    stopScrollFun(evt) {
      evt = evt || window.event
      if (evt.preventDefault) {
        // Firefox
        evt.preventDefault()
        evt.stopPropagation()
      } else {
        // IE
        evt.cancelBubble = true
        evt.returnValue = false
      }
      return false
    },
    goBack() {
      this.$router.go(-1)
    },
    initFormSafeSubmitConfig() {
      this.loadingSubmitButton = false
      this.submitButtonText = '提交'
    }
  }
}
</script>
