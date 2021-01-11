<template>
  <div class="app-container">
    <!-- 详情栏 -->
    <el-card class="box-card" :style="defaultHeight">
      <el-row type="flex" justify="space-between" align="middle">
        <!-- <el-col :span="20">
          <h3 style="margin-left: 20px">个人中心</h3>
        </el-col> -->
        <el-page-header content="个人中心" @back="goBack" />
        <el-col :span="4">
          <div style="float: right">
            <el-button type="text" style="color: red">
              <i class="el-icon-edit" />编辑详情
            </el-button>
            <el-divider direction="vertical" />
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
          </div>
        </el-col>
      </el-row>
      <!-- 展示信息栏 -->
      <el-row :gutter="20">
        <el-row>
          <el-col :span="6">
            <div class="grid-content">
              <span>真实姓名 ：</span><span>{{ name }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <span>出生日期 ：</span><span>{{}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content" />
          </el-col>
          <el-col :span="6">
            <div class="grid-content" />
          </el-col>
        </el-row>

        <el-row v-if="folding">
          <el-col :span="6">
            <div class="grid-content">
              <span>昵称 ：</span><span>{{}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <span>用户编号 ：</span><span>{{}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <span>创建时间 ：</span><span>{{}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content" />
          </el-col>
          <!-- <el-col :span="18">
          <div class="grid-content">
            <span>所属行业 ：</span><span>{{}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span>姓名 ：</span><span>{{ name }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"><span>性别 ：</span><span>{{}}</span></div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content"><span>民族 ：</span><span>{{}}</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span>联系方式 ：</span><span>{{}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span>证件号码 ：</span><span>{{}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>住所地 ：</span><span>{{}}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="grid-content">
            <span>客户备注 ：</span><span>{{}}</span>
          </div>
        </el-col> -->
        </el-row>
      </el-row>
      <!-- 滑屏栏 -->
      <el-row>
        <el-col>
          <el-tabs>
            <el-tab-pane
              label="修改密码"
              name="first"
              style="background: url(require('@/assets/images/home-logo.jpg'))"
            >
              <el-row :gutter="20" style="margin-top: 100px">
                <el-col :span="8" :offset="6">
                  <div class="grid-content">
                    <el-form
                      ref="ruleForm"
                      :model="ruleForm"
                      :rules="rules"
                      label-width="100px"
                    >
                      <el-form-item label="当前密码" prop="password">
                        <el-input
                          v-model="ruleForm.password"
                          type="password"
                          clearable
                        />
                      </el-form-item>
                      <el-form-item label="新密码" prop="newPassword">
                        <el-input
                          v-model="ruleForm.newPassword"
                          type="password"
                          clearable
                        />
                      </el-form-item>
                      <el-form-item label="确认密码" prop="newPassword2">
                        <el-input
                          v-model="ruleForm.newPassword2"
                          type="password"
                          clearable
                        />
                      </el-form-item>
                    </el-form>
                    <div class="horizontal-center">
                      <el-button
                        type="primary"
                        @click="submitForm('ruleForm')"
                      >确认修改</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="联系人" name="second">
              <el-main align="center">
                <div>
                  <el-image
                    :src="require('@/assets/images/home-logo.jpg')"
                    style="width: 280px; height: 280px"
                  />
                  <div class="dashboard-text">
                    <span style="padding-left: 10px">暂无联系人数据</span>
                  </div>
                </div>
              </el-main>
            </el-tab-pane>
            <el-tab-pane label="合同管理" name="third">
              <el-main align="center">
                <div>
                  <el-image
                    :src="require('@/assets/images/home-logo.jpg')"
                    style="width: 280px; height: 280px"
                  />
                  <div class="dashboard-text">
                    <span style="padding-left: 10px">暂无合同数据</span>
                  </div>
                </div>
              </el-main>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.horizontal-center {
  text-align: center;
}

.el-row {
  margin-bottom: 20px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding-left: 50px;
}
.row-bg {
  padding: 10px 0;
}

.item {
  padding: 18px 0;
}
</style>

<script>
import { mapGetters } from 'vuex'

const validatePassword = (rule, value, callback) => {
  // 手机正则验证
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(value) === false
  ) {
    callback(new Error('密码中至少包含大写、小写字母和数字'))
  } else {
    callback()
  }
}
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      ruleForm: {
        password: '',
        newPassword: '',
        newPassword2: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        newPassword2: [
          { validator: validatePass2 },
          { required: true, message: '再次确认密码', trigger: 'blur' }
        ]
      },
      activeName: 'second',
      folding: false,
      /* active: 0, */
      defaultHeight: {
        height: ''
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  /* 创建height，然后返回给defaultHeight */
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  methods: {
    /* 自适应高度 */
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 90 + 'px'
    },
    toggleFolding() {
      this.folding = !this.folding
    },
    goBack() {
      this.$router.go(-1)
    },
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
