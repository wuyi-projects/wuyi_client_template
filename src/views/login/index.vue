<template>
  <div class="login">
    <el-row style="padding-top: 150px">
      <el-col :span="8" :offset="16">
        <el-card style="margin-right: 50px">
          <el-container class="login-container">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="left"
            >
              <div class="title-container">
                <h3 class="title">智慧办公管家登录</h3>
              </div>

              <el-form-item
                prop="phone"
                :class="focusText == 'phone' ? 'custom-focus' : 'custom-blur'"
              >
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  ref="phone"
                  v-model="loginForm.phone"
                  placeholder="手机号码"
                  name="phone"
                  type="text"
                  tabindex="1"
                  auto-complete="off"
                  @focus="onInputFocus"
                  @blur="onInputBlur"
                />
              </el-form-item>

              <el-form-item
                prop="password"
                :class="
                  focusText == 'password' ? 'custom-focus' : 'custom-blur'
                "
              >
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="密码"
                  name="password"
                  tabindex="2"
                  auto-complete="off"
                  @keyup.enter.native="handleLogin"
                  @focus="onPasswordInputFocus"
                  @blur="onPasswordInputBlur"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon
                    :icon-class="
                      passwordType == 'password' ? 'eye' : 'eye-open'
                    "
                  />
                </span>
              </el-form-item>

              <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="handleLogin"
                >登录</el-button
              >

              <!-- <div class="tips">
                <span style="margin-right:20px;">phone: admin</span>
                <span> password: any</span>
              </div> -->
            </el-form>
          </el-container>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { setProductCode, setTeamNumber } from "@/utils/auth";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的合法邮箱"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      focusText: "",
      loginForm: {
        phone: "",
        password: "",
      },
      loginRules: {
        phone: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    setProductCode("assistant");
    setTeamNumber(999999999);
  },
  methods: {
    onInputFocus() {
      this.focusText = "phone";
    },
    onInputBlur() {
      this.focusText = "";
    },
    onPasswordInputFocus() {
      this.focusText = "password";
    },
    onPasswordInputBlur() {
      this.focusText = "";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/loginByUsername", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ccc;
$light_gray: black;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(232, 240, 254);
    border-radius: 5px;
    color: #454545;
  }
  .custom-focus {
    border: 2px solid #1890ff;
  }
  .custom-blur {
    border: 2px solid #e8f0fe;
  }
}
</style>

<style lang="scss" scoped>
$bg: white;
$dark_gray: #889aa4;
$light_gray: #454545;

.login {
  width: 100%;
  height: 100vh;
  vertical-align: middle;
}

.login::after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  content: "";
  background-image: url("../../assets/images/login-bg.jpg");
  opacity: 0.6;
}

.login-container {
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 40px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
