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
        <el-row :gutter="20">
          <el-col :span="8">
            <el-col :span="24">
              <el-form-item label="姓名" prop="userName">
                <el-input
                  v-model="ruleForm.userName"
                  placeholder="请输入姓名"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="体重" prop="weight">
                <el-input
                  v-model="ruleForm.weight"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  placeholder="请输入体重"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append"> Kg </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="BB" prop="bb">
                <el-input
                  v-model="ruleForm.bb"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="BP左:" prop="bpLeft">
                <el-input
                  v-model="ruleForm.bpLeft"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="BP右:" prop="bpRight">
                <el-input
                  v-model="ruleForm.bpRight"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="上胸围:" prop="up">
                <el-input
                  v-model="ruleForm.up"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="下胸围:" prop="down">
                <el-input
                  v-model="ruleForm.down"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <!-- 待完善 -->
            <el-col :span="24">
              <el-form-item label="胃围:" prop="craw">
                <el-input
                  v-model="ruleForm.craw"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="腰围:" prop="waiStline">
                <el-input
                  v-model="ruleForm.waiStline"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="腹围:" prop="abdoMinal">
                <el-input
                  v-model="ruleForm.abdoMinal"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="臀围:" prop="hipLine">
                <el-input
                  v-model="ruleForm.hipLine"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="臀围:" prop="arm">
                <el-input
                  v-model="ruleForm.arm"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="臀高:" prop="hipLineHeight">
                <el-input
                  v-model="ruleForm.hipLineHeight"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="左大腿:" prop="leftThigh">
                <el-input
                  v-model="ruleForm.leftThigh"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="右大腿:" prop="rightThigh">
                <el-input
                  v-model="ruleForm.rightThigh"
                  type="number"
                  onmousewheel="stopScrollFun"
                  on-d-o-m-mouse-scroll="stopScrollFun"
                  clearable
                  @mousewheel.native.prevent
                >
                  <template slot="append">厘米</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="16">
            <el-col :span="8" :offset="16">
              <el-form-item label="日期" prop="date">
                <el-date-picker
                  v-model="ruleForm.date"
                  type="date"
                  placeholder="2020-01-21"
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
/* input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input[type='number'] {
  -moz-appearance: textfield !important;
} */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>

<script>
import formatTableSize from '@/utils/size'

export default {
  data() {
    return {
      ruleForm: {
        userName: '',
        bb: 0,
        bpLeft: 0,
        bpRight: 0,
        up: 0,
        down: 0,
        craw: 0,
        weight: 0,
        leftThigh: 0,
        waiStline: 0,
        abdoMinal: 0,
        hipLine: 0,
        arm:0,
        hipLineHeight: 0,
        leftThigh: 0,
        rightThigh: 0,
        date: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入名称', trigger: 'blur' }]
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
    }
  }
}
</script>
