<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form
        ref="formData"
        :model="formData"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-formData"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入姓名"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="phone">
              <el-input
                v-model="formData.phone"
                placeholder="请输入手机号码"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备用号码" prop="phone2">
              <el-input
                v-model="formData.phone2"
                placeholder="请输入备用号码"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="出生日期">
              <el-col :span="24">
                <el-form-item prop="birthday">
                  <el-date-picker
                    v-model="formData.birthday"
                    type="date"
                    placeholder="请输入出生日期"
                    style="width: 100%"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职业" prop="profession">
              <el-input
                v-model="formData.profession"
                placeholder="请输入职业"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-radio-group v-model="formData.maritalStatus">
                <el-radio :label="1">已婚</el-radio>
                <el-radio :label="0">未婚</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="身高" prop="height">
              <el-input
                v-model="formData.height"
                placeholder="请输入身高"
                clearable
              >
                <template slot="append">厘米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="体重" prop="weight">
              <el-input
                v-model="formData.weight"
                placeholder="请输入体重"
                clearable
              >
                <template slot="append">Kg</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="地址" prop="selectAddress">
              <!-- <el-input
                v-model="formData.address"
                placeholder="请输入地址"
                clearable
              /> -->
              <!--省市三级联动-->
              <el-cascader
                v-model="formData.selectAddress"
                size="large"
                :options="addressOptions"
                expand-trigger="hover"
                filterable
                style="width:100%;"
                :clearable="true"
                :separator="' '"
                @change="handleAddressChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址" prop="detailedAddress">
              <el-input
                v-model="formData.detailedAddress"
                placeholder="请输入详细地址"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属区域" prop="regionalId">
              <el-input
                v-model="formData.regionalId"
                placeholder="请输入所属区域"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="体型:" prop="bodyType">
              <el-row :gutter="10">
                <el-col v-for="body in bodyOption" :key="body.value" :span="2">
                  <el-card
                    v-model="formData.bodyType"
                    style="text-align: center"
                    shadow="hover"
                    :body-style="{ padding: '0px' }"
                    :class="body.value == formData.bodyType ? 'custom' : 'over'"
                    @click.native="bodyTypeCheck(body.value)"
                  >
                    <el-image :src="body.src" fit="contain" />
                    <el-col><span>{{ body.name }}</span></el-col>
                  </el-card>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="胸型:" prop="breastShape">
              <el-row :gutter="10">
                <el-col
                  v-for="breastShapeInfo in breastShapeOption"
                  :key="breastShapeInfo.value"
                  :span="2"
                >
                  <el-card
                    v-model="formData.breastShape"
                    style="text-align: center"
                    shadow="hover"
                    :body-style="{ padding: '0px' }"
                    :class="
                      breastShapeInfo.value == formData.breastShape
                        ? 'custom'
                        : 'over'
                    "
                    @click.native="breastShapeCheck(breastShapeInfo.value)"
                  >
                    <el-image :src="breastShapeInfo.src" fit="contain" />
                    <el-col><span>{{ breastShapeInfo.name }}</span></el-col>
                  </el-card>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="方案版本" prop="solutionVersion">
              <el-select
                v-model="formData.solutionVersion"
                placeholder="选择方案版本"
                style="width: 100%"
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
            <el-form-item label="设计日期:">
              <el-col :span="24">
                <el-form-item prop="designDate">
                  <el-date-picker
                    v-model="formData.designDate"
                    type="date"
                    style="width: 100%"
                    :picker-options="designDatepickerOptions"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="备用字段1" prop="field1">
              <el-input
                v-model="formData.field1"
                placeholder="请输入备用字段1"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备用字段2" prop="field2">
              <el-input
                v-model="formData.field2"
                placeholder="请输入备用字段2"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备用字段3" prop="field3">
              <el-input
                v-model="formData.field3"
                placeholder="请输入备用字段3"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备用字段4" prop="field4">
              <el-input
                v-model="formData.field4"
                placeholder="请输入备用字段4"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备用字段5" prop="field5">
              <el-input
                v-model="formData.field5"
                placeholder="请输入备用字段5"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-col :span="24" :offset="10">
          <el-form-item>
            <el-button
              type="primary"
              :loading="loadingSubmitButton"
              :disabled="loadingSubmitButton"
              @click="pageStatus === 'create' ? createData() : updateData()"
            >提交</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>

<style>
.custom {
  border: 2px solid #1890ff;
}
.over {
  border: 2px solid #fff;
}
.title-border {
  padding: 20px;
  border: 1px solid #e9e9e9;
  margin-bottom: 20px;
}
</style>

<script>
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import {
  getCustomerBasicInfo,
  saveCustomerBasicInfo,
  updateCustomerBasicInfo
} from '@/api/customer-basic-info'

export default {
  data() {
    return {
      loadingSubmitButton: false,
      submitButtonText: '提交',
      pageStatus: 'create',
      bodyTypeChecks: false,
      bodyId: null,
      chestId: null,
      addressOptions: regionData,
      formData: {
        id: null,
        openId: null,
        name: null,
        phone: null,
        phone2: null,
        height: null,
        birthday: null,
        profession: null,
        weight: null,
        maritalStatus: null,
        selectAddress: null,
        address: null,
        detailedAddress: null,
        regionalId: null,
        solutionVersion: null,
        designDate: null,
        bodyType: null,
        breastShape: null,
        field1: null,
        field2: null,
        field3: null,
        field4: null,
        field5: null,
        operatorId: null,
        operatorName: null,
        operateTime: null,
        version: 0
      },
      initCreateData: {
        id: null,
        openId: null,
        name: null,
        phone: null,
        phone2: null,
        height: null,
        birthday: null,
        profession: null,
        weight: null,
        maritalStatus: null,
        selectAddress: null,
        address: null,
        detailedAddress: null,
        regionalId: null,
        solutionVersion: null,
        designDate: null,
        bodyType: null,
        breastShape: null,
        field1: null,
        field2: null,
        field3: null,
        field4: null,
        field5: null,
        operatorId: null,
        operatorName: null,
        operateTime: null,
        version: 0
      },
      bodyOption: [
        {
          name: 'I',
          value: 1,
          src: require('@/assets/images/body_1.jpg'),
          checked: false
        },
        {
          name: 'H',
          value: 2,
          src: require('@/assets/images/body_2.jpg'),
          checked: false
        },
        {
          name: 'A',
          value: 3,
          src: require('@/assets/images/body_3.jpg'),
          checked: false
        },
        {
          name: 'D',
          value: 4,
          src: require('@/assets/images/body_4.jpg'),
          checked: false
        },
        {
          name: 'V',
          value: 5,
          src: require('@/assets/images/body_5.jpg'),
          checked: false
        }
      ],
      breastShapeOption: [
        {
          name: '圆盘型',
          value: 1,
          src: require('@/assets/images/chest_1.jpg'),
          checked: false
        },
        {
          name: '圆锥型',
          value: 2,
          src: require('@/assets/images/chest_2.jpg'),
          checked: false
        },
        {
          name: '半圆型',
          value: 3,
          src: require('@/assets/images/chest_3.jpg'),
          checked: false
        },
        {
          name: '纺锤型',
          value: 4,
          src: require('@/assets/images/chest_4.jpg'),
          checked: false
        },
        {
          name: '下垂I型',
          value: 5,
          src: require('@/assets/images/chest_5.jpg'),
          checked: false
        },
        {
          name: '下垂II型',
          value: 6,
          src: require('@/assets/images/chest_6.jpg'),
          checked: false
        }
      ],
      solutionVersionOptions: [
        { name: '显效版', value: 1 },
        {
          name: '有效版',
          value: 2
        },
        {
          name: '健康版',
          value: 3
        },
        {
          name: '标准版',
          value: 4
        },
        {
          name: '完美版',
          value: 5
        },
        {
          name: '精致版',
          value: 6
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
        maritalStatus: [
          { required: true, message: '请选择婚姻状况', trigger: 'blur' }
        ],
        height: [{ required: true, message: '请输入身高', trigger: 'blur' }],
        solutionVersion: [
          { required: true, message: '请选择方案版本', trigger: 'blur' }
        ],
        selectAddress: [{ type: 'array', required: true, message: '请选择地址', trigger: 'change' }]
      },
      pickerOptions: {
        /* disabledDate(time) {
          return time.getTime() > Date.now()
        }, */
        // shortcuts: [
        //   {
        //     text: '今天',
        //     onClick(picker) {
        //       picker.$emit('pick', new Date())
        //     }
        //   },
        //   {
        //     text: '昨天',
        //     onClick(picker) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - 3600 * 1000 * 24)
        //       picker.$emit('pick', date)
        //     }
        //   },
        //   {
        //     text: '一周前',
        //     onClick(picker) {
        //       const date = new Date()
        //       date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        //       picker.$emit('pick', date)
        //     }
        //   }
        // ],
      },
      designDatepickerOptions: []
    }
  },
  created() {
    const that = this
    const id = that.$route.query.id
    if (id) {
      that.formData.id = id
      that.pageStatus = 'update'
      that.getCustomerBasicInfo()
    } else {
      that.formData.designDate = this.$moment(new Date()).format('YYYY-MM-DD')
    }
  },
  methods: {
    getCustomerBasicInfo() {
      const that = this
      const id = that.formData.id
      if (id) {
        getCustomerBasicInfo({
          id: id
        })
          .then((response) => {
            const data = response.data
            if (!data) {
              return
            }
            that.formData = data
            that.formData.bodyType = data.bodyType
            that.formData.breastShape = data.breastShape
            const address = data.address
            if (address) {
              const addressArray = address.split(' ')
              const selectAddress = []
              selectAddress.push(TextToCode[addressArray[0]].code)
              selectAddress.push(TextToCode[addressArray[0]][addressArray[1]].code)
              selectAddress.push(TextToCode[addressArray[0]][addressArray[1]][addressArray[2]].code)
              console.log(JSON.stringify(selectAddress))
              that.formData.selectAddress = selectAddress
            }
          })
          .catch((e) => {
            that.loading = false
          })
      }
    },
    bodyTypeCheck(value) {
      const that = this
      // const current = value - 1
      // for (let len = 0; len < 5; len++) {
      //   if (current === len) {
      //     that.bodyOption[len].checked = true
      //   } else {
      //     that.bodyOption[len].checked = false
      //   }
      // }
      // that.bodyId = current
      that.formData.bodyType = value
    },
    breastShapeCheck(value) {
      const that = this
      // const current = value - 1
      // for (let len = 0; len < 6; len++) {
      //   if (current === len) {
      //     that.breastShapeOption[len].checked = true
      //   } else {
      //     that.breastShapeOption[len].checked = false
      //   }
      // }
      // that.chestId = current
      that.formData.breastShape = value
    },
    createData() {
      const that = this
      that.$refs['formData'].validate((valid) => {
        if (valid) {
          const bodyType = that.formData.bodyType
          if (bodyType == null) {
            that.$message({
              message: '请选择体型',
              type: 'error'
            })
            return
          }
          const breastShape = that.formData.breastShape
          if (breastShape == null) {
            that.$message({
              message: '请选择胸型',
              type: 'error'
            })
            return
          }

          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.formData)
          saveCustomerBasicInfo(tempData)
            .then((response) => {
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
            .catch((e) => {
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
      that.$refs['formData'].validate((valid) => {
        if (valid) {
          const bodyType = that.formData.bodyType
          if (bodyType == null) {
            that.$message({
              message: '请选择体型',
              type: 'error'
            })
            return
          }
          const breastShape = that.formData.breastShape
          if (breastShape == null) {
            that.$message({
              message: '请选择胸型',
              type: 'error'
            })
            return
          }

          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.formData)
          updateCustomerBasicInfo(tempData)
            .then((response) => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
                this.dialogFormVisible = false
              } else {
                this.$message.error('修改失败')
                this.initFormSafeSubmitConfig()
              }
              this.$router.push('/customer/customer-basic-info')
            })
            .catch((e) => {
              this.loading = false
              this.initFormSafeSubmitConfig()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      if (this.chestId != null || this.bodyId != null) {
        this.bodyOption[this.bodyId].checked = false
        this.breastShapeOption[this.chestId].checked = false
        this.chestId = null
        this.bodyId = null
      }
    },
    initFormSafeSubmitConfig() {
      this.loadingSubmitButton = false
      this.submitButtonText = '提交'
    },
    handleAddressChange(value) {
      this.formData.address = CodeToText[value[0]] + ' ' + CodeToText[value[1]] + ' ' + CodeToText[value[2]]
    }
  }
}
</script>
