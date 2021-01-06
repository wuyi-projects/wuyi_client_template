<template>
  <el-main align="center">
    <div>
      <el-image :src="require('@/assets/images/home-logo.jpg')" style="width: 280px; height: 280px" />
      <div class="dashboard-text">
        <span style="font-weight:bold;color:red;">{{ name }}</span><span style="padding-left:10px;">,你好</span>
      </div>
      <div class="dashboard-text"><span>欢迎使用物一智慧中台</span></div>
    </div>
  </el-main>
</template>

<style scoped>

.el-main {
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.el::after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  content: "";
  background: url("../../assets/images/login-bg.jpg") no-repeat;
  background-size:cover;
}

.dashboard-text {
  color: #2b7490;
  font-size: 20px !important;
  line-height: 36px !important;
}

</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name', 'roles'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
