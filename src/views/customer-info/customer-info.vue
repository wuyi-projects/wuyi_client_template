<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名" prop="userName">
              <el-input
                v-model="ruleForm.userName"
                placeholder="请输入姓名"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="telPhone">
              <el-input
                v-model="ruleForm.telPhone"
                placeholder="请输入电话"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备用号码" prop="provideTelPhone">
              <el-input
                v-model="ruleForm.provideTelPhone"
                placeholder="请输入备用号码"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="8">
          <el-form-item label="身高" prop="height">
            <el-input
              v-model="ruleForm.height"
              placeholder="请输入身高"
              type="text"
              clearable
            >
              <template slot="append">厘米</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-row>
          <el-col :span="8">
            <el-form-item label="出生日期">
              <el-col :span="24">
                <el-form-item prop="start">
                  <el-date-picker
                    v-model="ruleForm.start"
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
            <el-form-item label="职业" prop="occupation">
              <el-input
                v-model="ruleForm.occupation"
                placeholder="请输入职业"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="8">
          <el-form-item label="体重" prop="weight">
            <el-input
              v-model="ruleForm.weight"
              placeholder="请输入体重"
              clearable
            >
              <template slot="append"> Kg </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="marital">
              <el-radio-group v-model="ruleForm.marital">
                <el-radio label="已婚" />
                <el-radio label="未婚" />
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址">
              <el-col :span="24">
                <el-form-item prop="start">
                  <el-date-picker
                    v-model="ruleForm.start"
                    type="date"
                    placeholder="北京市/东城区/安定门街道"
                    style="width: 100%"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属大区">
              <el-col :span="24">
                <el-form-item prop="affiliationAdress">
                  <el-date-picker
                    v-model="ruleForm.affiliationAdress"
                    type="date"
                    placeholder="请选择所属大区"
                    style="width: 100%"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址:" prop="adress">
              <el-input
                v-model="ruleForm.adress"
                placeholder="请输入详细地址"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="方案版本" prop="scheme">
              <el-select
                v-model="ruleForm.scheme"
                placeholder="选择方案版本"
                style="width:100%"
              >
                <el-option
                  v-for="item in scheme"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设计日期:">
              <el-col :span="24">
                <el-form-item prop="desgin">
                  <el-date-picker
                    v-model="ruleForm.desgin"
                    type="date"
                    placeholder="2021-01-21"
                    style="width: 100%"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="体型:" prop="somatotype">
              <el-row :gutter="10">
                <el-col v-for="body in bodyOption" :key="body.id" :span="2">
                  <el-card
                    v-model="ruleForm.somatotype"
                    style="text-align:center"
                    shadow="hover"
                    :body-style="{ padding: '0px' }"
                    :class="body.checked ? 'custom' : 'over'"
                    @click.native="focu(body.id)"
                  >
                    <el-image :src="body.src" fit="contain" />
                    <el-col><span>{{ body.value }}</span></el-col>
                  </el-card>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="胸型:" prop="bosom">
              <el-row :gutter="10">
                <el-col v-for="chest in chestOption" :key="chest.id" :span="2">
                  <el-card
                    v-model="ruleForm.bosom"
                    style="text-align:center"
                    shadow="hover"
                    :body-style="{ padding: '0px' }"
                    :class="chest.checked ? 'custom' : 'over'"
                    @click.native="chestCheck(chest.id)"
                  >
                    <el-image :src="chest.src" fit="contain" />
                    <el-col><span>{{ chest.value }}</span></el-col>
                  </el-card>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24" :offset="10">
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
export default {
  data() {
    return {
      focus: false,
      bodyId: null,
      chestId: null,
      bodyOption: [
        {
          id: 0,
          value: 'I',
          src: require('@/assets/images/body_1.jpg'),
          checked: false
        },
        {
          id: 1,
          value: 'H',
          src: require('@/assets/images/body_2.jpg'),
          checked: false
        },
        {
          id: 2,
          value: 'A',
          src: require('@/assets/images/body_3.jpg'),
          checked: false
        },
        {
          id: 3,
          value: 'D',
          src: require('@/assets/images/body_4.jpg'),
          checked: false
        },
        {
          id: 4,
          value: 'V',
          src: require('@/assets/images/body_5.jpg'),
          checked: false
        }
      ],
      chestOption: [
        {
          id: 0,
          value: '圆盘型',
          src: require('@/assets/images/chest_1.jpg'),
          checked: false
        },
        {
          id: 1,
          value: '圆锥型',
          src: require('@/assets/images/chest_2.jpg'),
          checked: false
        },
        {
          id: 2,
          value: '半圆型',
          src: require('@/assets/images/chest_3.jpg'),
          checked: false
        },
        {
          id: 3,
          value: '纺锤型',
          src: require('@/assets/images/chest_4.jpg'),
          checked: false
        },
        {
          id: 4,
          value: '下垂I型',
          src: require('@/assets/images/chest_5.jpg'),
          checked: false
        },
        {
          id: 5,
          value: '下垂II型',
          src: require('@/assets/images/chest_6.jpg'),
          checked: false
        }
      ],
      scheme: [
        {
          code: 0,
          name: '方案1'
        },
        {
          code: 1,
          name: '方案2'
        }
      ],
      ruleForm: {
        userName: '',
        telPhone: '',
        height: '',
        start: '',
        occupation: '',
        weight: '',
        marital: '',
        adress: '',
        affiliationAdress: '',
        scheme: '',
        desgin: '',
        bosom: '',
        somatotype: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        telPhone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        height: [{ required: true, message: '请输入身高', trigger: 'blur' }]
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
      }
    }
  },
  created() {},

  methods: {
    focu(id) {
      const current = id
      for (let len = 0; len < 5; len++) {
        if (current === len) {
          this.bodyOption[len].checked = true
        } else {
          this.bodyOption[len].checked = false
        }
      }
      this.bodyId = current
      console.log('body里面类型为:' + this.bodyOption[current].value)
    },
    chestCheck(id) {
      const current = id
      for (let len = 0; len < 6; len++) {
        if (current === len) {
          this.chestOption[len].checked = true
        } else {
          this.chestOption[len].checked = false
        }
      }
      this.chestId = current
      console.log('chest里面类型为:' + this.chestOption[current].value)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const bodyId = this.bodyId
          if (bodyId == null) {
            this.$message({
              message: '请选择体型',
              type: 'error'
            })
            return
          }
          if (chestId == null) {
            this.$message({
              message: '请选择胸型',
              type: 'error'
            })
            return
          }
          alert('submit!')
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
        this.chestOption[this.chestId].checked = false
        this.chestId = null
        this.bodyId = null
      }
    }
  }
}
</script>
