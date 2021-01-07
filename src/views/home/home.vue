<template>
  <div class="app-container">
    <!-- 统计列表 -->
    <el-card class="box-card" shadow="never">
      <el-row style="padding:10px">
        <el-col
          :span="6"
          justify="center"
          align="middle"
          style="border-right:1px solid #e6ebf5"
        >
          <div>
            <span>我的待办</span>
          </div>
          <div>
            <h2 style="color:#1890FF;">{{ commission }}&emsp;个</h2>
          </div>
        </el-col>
        <el-col
          :span="6"
          justify="center"
          align="middle"
          style="border-right:1px solid #e6ebf5"
        >
          <div>
            <span>本周上传发票数</span>
          </div>
          <div>
            <h2 style="color:#1890FF;">{{ needtime }}&emsp;张</h2>
          </div>
        </el-col>
        <el-col
          :span="6"
          justify="center"
          align="middle"
          style="border-right:1px solid #e6ebf5"
        >
          <div>
            <span>总发票数</span>
          </div>
          <div>
            <h2 style="color:#1890FF;">{{ finishcommission }}&emsp;张</h2>
          </div>
        </el-col>
        <el-col :span="6" justify="center" align="middle">
          <div>
            <span>累计节省时间</span>
          </div>
          <div>
            <h2 style="color:#1890FF;">{{ needtime*3 }}&emsp;分钟</h2>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- 发票服务 -->
        <el-card class="box-card" shadow="never" style="margin-top: 10px">
          <div slot="header" class="clearfix">
            <span style="font-weight:bold">发票服务</span>
          </div>
          <!-- 详情栏 -->
          <!-- <el-card class="box-card" :style="{ height: defaultHeight }"> -->
          <el-row :gutter="20">
            <el-col
              v-for="data in Data"
              :key="data.title"
              :span="6"
              style="margin-bottom:20px"
            >
              <el-card shadow="hover" body-style="padding:0">
                <el-row>
                  <el-col :span="24" style="line-height:1;padding:10px 0 0;" align="middle">
                    <svg-icon :icon-class="data.icon" style="width:80px;height:80px;" />
                  </el-col>
                  <el-col :span="24" align="middle" style="padding:2px 0">
                    {{ data.title }}
                  </el-col>
                </el-row>
                <el-row
                  style="border-top:1px solid #e6ebf5;width:100%"
                  type="flex"
                  align="middle"
                >
                  <el-col :span="11" style="text-align:center">
                    <el-button type="text">操作一</el-button>
                  </el-col>
                  <el-col :span="2" style="text-align:center">
                    <el-divider direction="vertical" />
                  </el-col>
                  <el-col :span="11" style="text-align:center">
                    <el-button type="text">操作二</el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
      <el-col :span="12">
        <!-- 我的工具 -->
        <el-card class="box-card" shadow="never" style="margin-top: 10px">
          <div slot="header" class="clearfix">
            <span style="font-weight:bold">我的工具</span>
          </div>
          <!-- 详情栏 -->
          <!-- <el-card class="box-card" :style="{ height: defaultHeight }"> -->
          <el-row :gutter="20">
            <el-col
              v-for="data in Data"
              :key="data.title"
              :span="6"
              style="margin-bottom:20px"
            >
              <el-card shadow="hover" body-style="padding:0">
                <el-row>
                  <el-col :span="24" style="line-height:1;padding:10px 0 0;" align="middle">
                    <svg-icon :icon-class="data.icon" style="width:80px;height:80px;" />
                  </el-col>
                  <el-col :span="24" align="middle" style="padding:2px 0">
                    {{ data.title }}
                  </el-col>
                </el-row>
                <el-row
                  style="border-top:1px solid #e6ebf5;width:100%"
                  type="flex"
                  align="middle"
                >
                  <el-col :span="11" style="text-align:center">
                    <el-button type="text">操作一</el-button>
                  </el-col>
                  <el-col :span="2" style="text-align:center">
                    <el-divider direction="vertical" />
                  </el-col>
                  <el-col :span="11" style="text-align:center">
                    <el-button type="text">操作二</el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
    </el-row>
    <!-- </el-card> -->
  </div>
</template>

<style scoped>
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
span {
  color: #878b8c;
}
h2 {
  margin: 0;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      Data: [
        {
          title: '发票录入',
          icon: 'input'
        },
        {
          title: '发票审核',
          icon: 'aduit'
        },
        {
          title: '发票批量上传',
          icon: 'upload'
        }
      ],
      commission: 8,
      needtime: 32,
      finishcommission: 24,
      defaultHeight: '500px',
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  },
  /* 创建height，然后返回给defaultHeight */
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  methods: {
    /* 自适应高度 */
    getHeight() {
      this.defaultHeight = window.innerHeight - 180 + 'px'
      this.tableHeight = window.innerHeight - 180 - 40 + 'px'
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
