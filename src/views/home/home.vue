<template>
  <div class="app-container">
    <!-- 统计列表 -->
    <el-card class="box-card" shadow="never">
      <el-row style="padding:10px">
        <el-col
          :span="6"
          justify="center"
          align="middle"
          style="border-right:1px solid #ccc"
        >
          <div>
            <span>我的待办</span>
          </div>
          <div>
            <h2>{{ commission }}个</h2>
          </div>
        </el-col>
        <el-col
          :span="6"
          justify="center"
          align="middle"
          style="border-right:1px solid #ccc"
        >
          <div>
            <span>本周上传发票数</span>
          </div>
          <div>
            <h2>{{ needtime }}张</h2>
          </div>
        </el-col>
        <el-col
          :span="6"
          justify="center"
          align="middle"
          style="border-right:1px solid #ccc"
        >
          <div>
            <span>总发票数</span>
          </div>
          <div>
            <h2>{{ finishcommission }}张</h2>
          </div>
        </el-col>
        <el-col :span="6" justify="center" align="middle">
          <div>
            <span>累计节省时间</span>
          </div>
          <div>
            <h2>{{ needtime*3 }}分钟</h2>
          </div>
        </el-col>
      </el-row>
    </el-card>
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
          :span="3"
          style="margin-bottom:20px"
        >
          <el-card shadow="hover" body-style="padding:0">
            <el-row>
              <el-col :span="24" style="line-height:1">
                <el-image
                  fit="contian"
                  :src="url"
                  :preview-src-list="srcList"
                />
              </el-col>
              <el-col :span="24" align="middle" style="padding:5px 0">
                <span>{{ data.title }}</span>
              </el-col>
            </el-row>
            <el-row style="border-top:1px solid #ccc;width:100%" type="flex">
              <el-col
                :span="11"
                style="text-align:center"
              ><el-button type="text">操作一</el-button></el-col>
              <el-col :span="2" style="margin-top:8px;">
                <el-divider
                  direction="vertical"
                /></el-col>
              <el-col
                :span="11"
                style="text-align:center"
              ><el-button type="text">操作二</el-button></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
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
          :span="3"
          style="margin-bottom:20px"
        >
          <el-card shadow="hover" body-style="padding:0">
            <el-row>
              <el-col :span="24" style="line-height:1">
                <el-image
                  fit="contian"
                  :src="url"
                  :preview-src-list="srcList"
                />
              </el-col>
              <el-col :span="24" align="middle" style="padding:5px 0">
                <span>{{ data.title }}</span>
              </el-col>
            </el-row>
            <el-row style="border-top:1px solid #ccc;width:100%" type="flex">
              <el-col
                :span="11"
                style="text-align:center"
              ><el-button type="text">操作一</el-button></el-col>
              <el-col :span="2" style="margin-top:8px;">
                <el-divider
                  direction="vertical"
                /></el-col>
              <el-col
                :span="11"
                style="text-align:center"
              ><el-button type="text">操作二</el-button></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
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
          title: '发票录入'
        },
        {
          title: '发票审核'
        },
        {
          title: '发票批量上传'
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
