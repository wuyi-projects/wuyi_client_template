<template>
  <div class="app-container">
    <!-- 统计列表 -->
    <el-card class="box-card" shadow="never" style="margin-bottom: 16px">
      <el-row style="padding:10px">
        <el-col
          :span="8"
          justify="center"
          align="middle"
          style="border-right:1px solid #ccc"
        >
          <div>
            <span>我的待办</span>
          </div>
          <div>
            <h2>{{ commission }}个任务</h2>
          </div>
        </el-col>
        <el-col
          :span="8"
          justify="center"
          align="middle"
          style="border-right:1px solid #ccc"
        >
          <div>
            <span>本周任务平均处理时间</span>
          </div>
          <div>
            <h2>{{ needtime }}分钟</h2>
          </div>
        </el-col>
        <el-col :span="8" justify="center" align="middle">
          <div>
            <span>本周完成任务数</span>
          </div>
          <div>
            <h2>{{ finishcommission }}个任务</h2>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- 详情栏 -->
    <!-- <el-card class="box-card" :style="{ height: defaultHeight }"> -->
    <el-row :gutter="20">
      <el-col :span="4" v-for="data in Data"  :key="data.title">
        <el-card  shadow="hover" body-style="padding:0">
          <el-row>
            <el-col :span="24" style="padding-top:20px;text-align:center">
              <el-image
                style="width: 100px; height: 100px;"
                :src="url"
                :preview-src-list="srcList"
              />
            </el-col>
            <el-col :span="24">
              <h3 style="padding:10px">{{data.title}}</h3>
            </el-col>
          </el-row>
          <el-row style="border-top:1px solid #ccc;width:100%" type="flex">
            <el-col
              :span="11"
              style="text-align:center"
            ><el-button type="text">操作一</el-button></el-col>
            <el-col :span="2" style="margin-top:8px;font-size:16px"> <el-divider direction="vertical" /></el-col>
            <el-col
              :span="11"
              style="text-align:center"
            ><el-button type="text">操作二</el-button></el-col>
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
       Data:[{
          title:'网络技术那家强,就来武汉找物一'
       },{
          title:'网络技术那家强,就来武汉找物一'
       },{
          title:'网络技术那家强,就来武汉找物一'
       },{
          title:'网络技术那家强,就来武汉找物一'
       },{
          title:'网络技术那家强,就来武汉找物一'
       },{
          title:'网络技术那家强,就来武汉找物一'
       }],
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
