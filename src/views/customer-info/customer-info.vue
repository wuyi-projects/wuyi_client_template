<template>
  <div class="app-container">
    <el-card class="box-card">
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
        </el-row>
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
        </el-row>
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
               <el-row>
                <el-col :span="2">
                  <el-card style="text-align:center">
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                    <el-col><span>I</span></el-col>
                  </el-card>
                </el-col>
                <el-col :span="2">
                  <el-card style="text-align:center">
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                    <el-col><span>H</span></el-col>
                  </el-card>
                </el-col>
                <el-col :span="2">
                  <el-card style="text-align:center">
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                    <el-col><span>A</span></el-col>
                  </el-card>
                </el-col>
                <el-col :span="2">
                  <el-card style="text-align:center">
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                    <el-col><span>D</span></el-col>
                  </el-card>
                </el-col>
                <el-col :span="2">
                  <el-card style="text-align:center">
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                    <el-col><span>V</span></el-col>
                  </el-card>
                </el-col>
                </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="胸型:" prop="bosom">
              <el-radio-group v-model="ruleForm.bosom">
                <el-col :span="4">
                  <el-card>
                    <el-radio label="圆盘形" />
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                  </el-card>
                </el-col>
                <el-col :span="4">
                  <el-card>
                    <el-radio label="圆锥形" />
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                  </el-card>
                </el-col>
                <el-col :span="4">
                  <el-card>
                    <el-radio label="半圆形" />
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                  </el-card>
                </el-col>
                <el-col :span="4">
                  <el-card>
                    <el-radio label="纺锤形" />
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                  </el-card>
                </el-col>
                <el-col :span="4">
                  <el-card>
                    <el-radio label="下垂I型" />
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                  </el-card>
                </el-col>
                <el-col :span="4">
                  <el-card>
                    <el-radio label="下垂II型" />
                    <img
                      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"
                      class="image"
                    >
                  </el-card>
                </el-col>
              </el-radio-group>
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

<style scoped></style>

<script>
import formatTableSize from '@/utils/size'

export default {
  data() {
    return {
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
