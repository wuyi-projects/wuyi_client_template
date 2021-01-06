<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="12" style="height:300px">
            <div class="grid-content bg-purple">
              <el-card class="box-card" style="height:300px">
                <el-container>
                  <el-header>设备概况</el-header>
                  <el-main>
                    <el-row>
                      <el-col :span="12">
                        <div class="grid-content" align="center">
                          <el-progress type="circle" :percentage="1199" />
                          <div>设备总数</div>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content" align="center">
                          <el-progress type="circle" :percentage="6" />
                          <div>倒入总数</div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </el-card>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-card class="box-card" style="height:300px">
                <el-container>
                  <el-header>设备占比概况</el-header>
                  <el-main>
                    <el-row>
                      <el-col :span="12">
                        <div class="grid-content" align="center">
                          <el-progress type="circle" :percentage="25" />
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content" align="center" />
                      </el-col>
                    </el-row>
                  </el-main>
                </el-container>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:20px">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-card class="box-card" style="height:500px">
                <template>
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="设备数量" name="first">
                      <el-row>
                        <el-progress
                          :text-inside="true"
                          :stroke-width="26"
                          :percentage="70"
                        />
                      </el-row>
                      <el-row>
                        <el-progress
                          :text-inside="true"
                          :stroke-width="26"
                          :percentage="70"
                        />
                      </el-row>
                      <el-row>
                        <el-progress
                          :text-inside="true"
                          :stroke-width="26"
                          :percentage="70"
                        />
                      </el-row>
                    </el-tab-pane>
                    <el-tab-pane
                      label="台厂家设备数量"
                      name="second"
                    >台厂家设备数量</el-tab-pane>
                    <el-tab-pane
                      label="设备数量"
                      name="third"
                    >设备数量</el-tab-pane>
                  </el-tabs>
                </template>
              </el-card>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-card class="box-card" style="height:500px">
                <template>
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="设备数量" name="first">
                      <vxe-grid
                        ref="dataGrid"
                        class="custom-table-scrollbar"
                        v-bind="gridOptions"
                      />
                    </el-tab-pane>
                    <el-tab-pane label="台厂家设备数量" name="second">
                      <el-table :data="tableData" style="width: 100%">
                        <el-table-column label="日期" width="180">
                          <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span style="margin-left: 10px">{{
                              scope.row.date
                            }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="姓名" width="180">
                          <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                              <p>姓名: {{ scope.row.name }}</p>
                              <p>住址: {{ scope.row.address }}</p>
                              <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{
                                  scope.row.name
                                }}</el-tag>
                              </div>
                            </el-popover>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作">
                          <template slot-scope="scope">
                            <el-button
                              size="mini"
                              @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button>
                            <el-button
                              size="mini"
                              type="danger"
                              @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane
                      label="设备数量"
                      name="third"
                    >设备数量</el-tab-pane>
                  </el-tabs>
                </template>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped></style>

<script>
import formatTableSize from '@/utils/size'

export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  computed: {},
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },

    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
