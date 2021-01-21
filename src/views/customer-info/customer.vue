<template>
  <div class="app-container">
    <el-card class="box-card" :style="{ height: defaultHeight }">
      <el-col :span="24" class="title-border">
        <span>客户信息</span>
      </el-col>
      <el-row>
        <el-col :span="8">
          <text>姓名：</text>
        </el-col>

        <el-col :span="8">
          <text>姓名：</text>
        </el-col>
        <el-col :span="8">
          <div class="grid-content"><span>姓名：</span><span /></div>
        </el-col>
        <el-col
          :span="8"
        ><div class="grid-content"><span>电话：</span><span /></div>
        </el-col>
        <el-col
          :span="8"
        ><div class="grid-content"><span>身高：</span><span /></div>
        </el-col>
        <el-col
          :span="8"
        ><div class="grid-content"><span>出生日期：</span><span /></div>
        </el-col>
        <el-col
          :span="8"
        ><div class="grid-content"><span>职业：</span><span /></div>
        </el-col>
        <el-col
          :span="8"
        ><div class="grid-content"><span>体重：</span><span /></div>
        </el-col>
        <el-col :span="8">
          <el-radio-group v-model="resource">
            <el-radio label="已婚" />
            <el-radio label="未婚" />
          </el-radio-group>
        </el-col>
        <el-col
          :span="16"
        ><div><span>备注：</span><span /></div></el-col>
        <el-col :span="24">
          <div><span>地址：</span><span /></div>
        </el-col>
        <el-col :span="24" style="margin-top:20px;text-align:center">
          <el-table :data="bodyinfo" border style="width: 180%;">
            <el-table-column prop="pie" label="次" width="180" />
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="weight" label="体重" width="180" />
            <el-table-column prop="bb" label="BB" width="180" />
            <el-table-column prop="bpLeft" label="BP左" width="180" />
            <el-table-column prop="bpRight" label="BP右" width="180" />
            <el-table-column prop="up" label="上胸围" width="180" />
            <el-table-column prop="down" label="下胸围" width="180" />
            <el-table-column prop="craw" label="胃围" width="180" />
            <el-table-column prop="waiStline" label="腰围" width="180" />
            <el-table-column prop="hipLine" label="臀围" width="180" />
            <el-table-column prop="abdoMinal" label="腹围" width="180" />
            <el-table-column prop="arm" label="臂围" width="180" />
            <el-table-column prop="hipLineHeight" label="臂高" width="180" />
            <el-table-column prop="leftThigh" label="左大腿" width="180" />
            <el-table-column prop="rightThigh" label="右大腿" width="180" />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.title-border {
  padding: 20px;
  border: 2px solid #e9e9e9;
  margin-bottom: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      resource: '',
      bodyinfo: [],
      defaultHeight: '500px',
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  created() {
    addEventListener('resize', this.getHeight)
    this.getHeight()
    this.count()
  },

  methods: {
    getHeight() {
      this.defaultHeight = window.innerHeight - 90 + 'px'
    },
    count() {
      const data = []
      const len = 7
      for (let i = 0; i < len; i++) {
        data.push({
          pie: '',
          date: '',
          bb: '',
          bpLeft: '',
          bpRight: '',
          up: '',
          down: '',
          craw: '',
          weight: '',
          leftThigh: '',
          waiStline: '',
          abdoMinal: '',
          hipLine: '',
          arm: '',
          hipLineHeight: '',
          leftThigh: '',
          rightThigh: ''
        })
      }
      this.bodyinfo = data
    }
  }
}
</script>
