<template>
  <div class="app-container">

    <div class="checkboxgroup">
      <el-button type="primary" @click="handleFilterClassify">点击筛选品类</el-button>
      <el-row>
        <el-col :span="24"><p /><span>选中的id数组:</span><span>{{ checkedClassify }}</span></el-col>
      </el-row><el-row>
        <el-col :span="24"><p><span>选中的name数组:</span><span>{{ checkedClassifyName }}</span></p></el-col>
      </el-row>
      <!-- 当前品类弹窗 -->
      <el-dialog
        class="filterClassfiy"
        title="筛选"
        :close-on-click-modal="false"
        :visible.sync="dialogVisibleClassify"
        width="730px"
      >
        <div class="wrap">
          <div class="title">请选择要查看的品类</div>
          <div class="content">
            <template v-if="classifyData!=null && classifyData.length>0">
              <div v-for="(group,groupIndex) in classifyData" :key="group.skillLableId" class="item">
                <div class="itemHeader">
                  <div v-cloak>{{ group.skillLableName }}</div>
                  <div class="allCheck">
                    <el-checkbox
                      v-model="group.mychecked"
                      :label="group.skillLableId"
                      @change="groupChanged(groupIndex,group.skillLableId)"
                    >全选</el-checkbox>
                  </div>
                </div>
                <div class="itemContent">
                  <template
                    v-for="service in group.serviceClassEntitys"
                  >
                    <el-checkbox
                      :key="service.serviceClassId"
                      v-model="service.mychecked"
                      :title="service.serviceClassName"
                      :label="service.serviceClassId"
                      @change="serviceChanged(groupIndex,service.serviceClassId)"
                    >{{ service.serviceClassName }}</el-checkbox>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <button class="confirm-btn" @click="handleSelectAllClassfiy">全选</button>
          <button class="confirm-btn" @click="handleEmptyAllClassfiy">清空</button>
          <button class="confirm-btn" @click="handleClassfiySure">确定</button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Checkbox',
  props: {},
  data() {
    return {
      dialogVisibleClassify: false, // 品类弹窗是否显示
      classifyData: [], // 当前所有品类数组
      checkedClassify: [], // 选中的品类Id数组
      checkedClassifyName: [] // 选中的品类名称数组
    }
  },
  mounted() {
    // 获取品类数据
    this.getClassifyData()
  },
  methods: {
    getClassifyData() {
      axios.get(
        'https://www.easy-mock.com/mock/5cda38699ef682599c4736c7/esmart/monitor/getServiceClass'
      )
        .then(res => {
          console.log(res)
          if (res.data.code === 0 && res.data.data !== null) {
            var result = res.data.data
            for (var i = 0; i < result.length; i++) {
              result[i]['mychecked'] = false
              for (var j = 0; j < result[i].serviceClassEntitys.length; j++) {
                result[i].serviceClassEntitys[j]['mychecked'] = false
              }
            }
            this.classifyData = result
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 点击品类筛选
    handleFilterClassify() {
      this.dialogVisibleClassify = true
    },

    // 品类弹框选择所有
    handleSelectAllClassfiy: function() {
      for (var i = 0; i < this.classifyData.length; i++) {
        this.classifyData[i].mychecked = true
        this.groupChanged(i) // 调用一级change事件
      }
    },

    // 一级change事件
    groupChanged: function(index) { // 一级未选中 则对应的二级都不选中
      if (this.classifyData[index].mychecked == false) {
        var childrenArray = this.classifyData[index].serviceClassEntitys
        if (childrenArray) {
          for (var i = 0, len = childrenArray.length; i < len; i++) {
            childrenArray[i].mychecked = false
          }
        }　　　　　　　　// 一级选中  则对应的二级都选中
      } else if (this.classifyData[index].mychecked = true) {
        var childrenArray = this.classifyData[index].serviceClassEntitys
        if (childrenArray) {
          for (var i = 0, len = childrenArray.length; i < len; i++) {
            childrenArray[i].mychecked = true
          }
        }
      }
    },
    // 二级change事件
    serviceChanged: function(groupIndex) {
      var childrenArray = this.classifyData[groupIndex].serviceClassEntitys
      var tickCount = 0
      var unTickCount = 0
      var len = childrenArray.length
      for (var i = 0; i < len; i++) {
        if (childrenArray[i].mychecked == true) {
          tickCount++
        }
        if (childrenArray[i].mychecked == false) {
          unTickCount++
        }
      }
      if (tickCount == len) { // 二级全勾选  一级勾选
        this.classifyData[groupIndex].mychecked = true
      } else { // 二级未全选  一级不勾选
        this.classifyData[groupIndex].mychecked = false
      }
    },

    // 品类弹框清空所有
    handleEmptyAllClassfiy: function() {
      for (var i = 0; i < this.classifyData.length; i++) {
        for (var j = 0; j < this.classifyData.length; j++) {
          this.classifyData[i].mychecked = false
          this.groupChanged(i)// 调用一级change事件
        }
      }
    },

    // //品类筛选关闭
    handleClassfiySure: function() {
      this.checkedClassify = []
      this.checkedClassifyName = []
      // 对classifyData处理给checkedClassify和checkedClassifyName赋值
      for (var i = 0; i < this.classifyData.length; i++) {
        var serviceClassEntitys = this.classifyData[i].serviceClassEntitys
        var len = serviceClassEntitys.length
        for (var j = 0; j < len; j++) {
          if (serviceClassEntitys[j].mychecked == true) {
            this.checkedClassify.push(serviceClassEntitys[j].serviceClassId)
            this.checkedClassifyName.push(serviceClassEntitys[j].serviceClassName)
          }
        }
      }

      // 判断勾选的品类是否为空，为空的话显示全部
      if (this.checkedClassify.length == 0) {
        for (var i = 0; i < this.classifyData.length; i++) {
          var serviceClassEntitys = this.classifyData[i].serviceClassEntitys
          for (var j = 0; j < serviceClassEntitys.length; j++) {
            this.checkedClassifyName.push(serviceClassEntitys[j].serviceClassName)
          }
        }
      }
      console.log(this.checkedClassify, this.checkedClassifyName)
      this.dialogVisibleClassify = false// 关闭弹窗
    }

  }
}
</script>
<style scope>
/* 当前品类弹框 */
.el-dialog {
  width: 730px !important;
  height: 577px !important;
  background-color: #18202a;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
}
.filterClassfiy .el-dialog__body {
  padding: 20px 30px;
}
.el-dialog .el-dialog__title{
    color: #fff;
}

.filterClassfiy .wrap .title {
  font-size: 16px;
  color: #acacac;
  margin: 5px;
}

.filterClassfiy .wrap .content {
  width: 630px;
  height: 355px;
  padding: 20px;
  overflow-y: auto;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}

.filterClassfiy .wrap .content::-webkit-scrollbar {
  display: none;
}

.filterClassfiy .itemContent .el-checkbox {
  color: #fff;
  font-size: 12px;
  margin: 5px;
  width: 31%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.filterClassfiy .wrap .content .el-checkbox__label {
  padding-left: 6px;
}

.filterClassfiy .wrap .content .itemHeader {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
}
.filterClassfiy .wrap .content .itemHeader .el-checkbox {
  width: 25%;
  color: #fff;
}

.filterClassfiy .wrap .content .itemHeader .el-checkbox__inner {
  left: 54px;
}

.filterClassfiy .wrap .content .itemHeader .allCheck {
  font-size: 12px;
  display: flex;
  width: 70px;
  align-items: center;
}

.filterClassfiy .wrap .content .itemHeader .allCheck span {
  display: inline-block;
}

.filterClassfiy .wrap .content .itemContent {
  background-color: #232b34;
  padding: 10px 20px 0;
}

.confirm-btn{
    width: 100px;
    height: 29px;
    color: #fff;
    background: rgba(0, 131, 247, 0.5);
    font-size: 14px;
    outline: none;
    border: 0;
    cursor: pointer
}
.el-dialog__footer{
    text-align: center
}
</style>
