<template>
  <div class="app-container">
    <!--数据展示-->
    <el-card class="box-card" shadow="never">
      <el-row>
        <el-col :span="4">
          <el-row>
            <el-col style="border-right:#F5F7FA 1px solid;">
              <div class="left-title-box bg-title" style="font-weight:bold;">岗位列表
              </div>
              <div :style="defaultHeight">
                <ul
                  v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="10"
                  class="infinite-list"
                  style="height:100%;overflow:auto"
                >
                  <li
                    v-for="item in tableData"
                    :key="item.id"
                    style="padding:10px;font-size:14px;border-bottom:#F5F7FA 1px solid;"
                    @click="handleRoleClick(item.id)"
                  >
                    <el-row
                      v-if="
                        !(
                          typeof item.id === 'undefined' ||
                          item.id === null ||
                          item.id === ''
                        )
                      "
                    >
                      <el-row
                        type="flex"
                        class="row-bg"
                        justify="space-between"
                        align="middle"
                      >
                        <el-col :span="16" style="overflow:hidden;">
                          <el-tag
                            v-if="item.id == selectPostId"
                            type="danger"
                            effect="dark"
                            size="mini"
                            style="margin-right:10px;"
                          >
                            当前
                          </el-tag>
                          <span style="font-weight:bold;">
                            {{ item.postName }}
                          </span>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24" style="overflow:hidden;">
                          <el-tag type="" size="mini">数据编号:{{ item.id }}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </el-row>
                    <!-- 新增 -->
                    <el-row v-else>
                      <el-row
                        type="flex"
                        class="row-bg"
                        justify="space-between"
                        align="middle"
                      />
                    </el-row>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <!-- 权限配置区 -->
        <el-col :span="20">
          <!--<div class="right-title-box bg-title">权限配置
          </div>-->

          <el-row style="margin:0px 30px;">
            <el-card :body-style="{ padding: '10px 20px' }" shadow="hover">
              <div slot="header" class="clearfix">
                <el-row
                  type="flex"
                  class="row-bg"
                  justify="space-between"
                  align="middle"
                >
                  <el-col :span="6">
                    <span>权限分组</span>
                  </el-col>
                  <el-col :span="18" align="right">
                    <template v-if="isWaitRoleData">
                      <el-button
                        type="danger"
                        disabled
                        style="margin-left:10px"
                        size="small"
                        icon="el-icon-delete"
                      >配置完成</el-button>
                    </template>
                    <template v-else>
                      <el-button
                        type="danger"
                        style="margin-left:10px"
                        size="small"
                        icon="el-icon-delete"
                        @click="allocationRole4Post"
                      >配置完成</el-button>
                    </template>
                  </el-col>
                </el-row>
              </div>
              <div :style="defaultHeight">
                <template v-if="isWaitRoleData" :span="24" align="center">
                  <div :style="defaultHeight" style="display: flex; align-items: center; justify-content: center;;">
                    <span>选择左侧岗位，可按进行岗位角色分配操作</span>
                  </div>
                </template>
                <template v-else>

                  <el-scrollbar style="height:100%;">
                    <el-row>
                      <el-col
                        v-for="role in allRole"
                        :key="role.id"
                        style="margin-top: 10px"
                        :span="8"
                      >
                        <el-checkbox
                          v-model="role.target"
                          :label="role.id"
                        >
                          {{ role.description }}
                        </el-checkbox>
                      </el-col>
                    </el-row>
                  </el-scrollbar>

                </template>
              </div>
            </el-card>

          </el-row>
        </el-col>
      </el-row>
    </el-card>

    <!-- 创建/修改表单 -->
    <el-dialog
      v-if="dialogFormVisible"
      :title="textMap[dialogStatus]"
      :center="true"
      width="40%"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="80px"
        style="width: 100%; padding:10px;"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="岗位名称" prop="postName">
              <el-input v-model="temp.postName" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-if="dialogStatus !== 'detail'">
          <el-button @click="resetForm('dataForm')">
            重置
          </el-button>
          <el-button
            type="primary"
            :loading="loadingSubmitButton"
            :disabled="loadingSubmitButton"
            @click="dialogStatus === 'create' ? createData() : updateData()"
          >
            {{ submitButtonText }}
          </el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">

.el-transfer {width: 1000px;}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
.item {
  margin-top: 10px;
  margin-right: 5px;
}

.bg-title {
  background: rgb(24, 144, 255);
}

.bg-title-light {
  background: rgb(128, 195, 255);
}

.left-title-box {
  position: relative;
  border-radius: 4px 0 0 0px;
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
}
.right-title-box {
  position: relative;
  border-radius: 0 4px 0 0;
  padding: 20px;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
}

.infinite-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list::-webkit-scrollbar {
  width: 6px;
  height: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #ffffff;
}

.infinite-list::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #ffffff;
}

.infinite-list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(135, 141, 153, 0.3);
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}

.infinite-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(135, 141, 153, 0.5);
}
.infinite-list::-webkit-scrollbar-thumb:active {
  background-color: rgba(135, 141, 153, 0.5);
}
/*边角，即两个滚动条的交汇处*/
.infinite-list::-webkit-scrollbar-corner {
  background-color: #ffffff;
}

.checkbox-group-title {
  font-size: 14px;
  font-weight: bold;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-card__header {
  padding: 10px 20px;
}
.el-radio {
  //height: 30px;
  //line-height:30px;
  .el-radio__input {
    display: none;
  }
  &.is-checked {
    position: relative;
    border-bottom: 0.333333px solid rgba(185, 185, 185, 0.5);
    &:after {
      content: "";
      display: block;
      height: 20px;
      width: 20px;
      background-size: 100%;
      background-image: url(../../assets/selected.svg);
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

.button {
  padding: 0;
  float: right;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.border-bottom {
  border-bottom: 1px solid #f0f0f0;
}

.border-right {
  border-right: 1px solid #f0f0f0;
}
</style>

<script>
import {
  listAllRole,
  listAllRole4Post,
  allocationRole4Post
} from '@/api/permission'
import { listPost } from '@/api/post'

export default {
  data() {
    return {
      dialogFormVisible: false,
      isWaitRoleData: false,
      selectPostId: '',
      loadingSubmitButton: false,
      allRole: [],
      checkList: [],
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        postName: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' },
          { min: 2, message: '长度大于 1 个字符', trigger: 'blur' }
        ]
      },
      page: 1,
      radio1: '0',
      currentDepartment: {
      },
      defaultHeight: {
        height: ''
      },
      defaultRightHeight: {
        height: ''
      },
      tableData: [],
      temp: {
        id: null,
        postName: '',
        version: 0
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  computed: {},
  created() {
    this.getHeight()
    this.listPost(this.page)
    this.listAllRole()
  },
  methods: {
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 210 + 'px'
      this.defaultRightHeight.height = window.innerHeight - 225 + 'px'
    },
    listPost(page) {
      const currentIndex = (page - 1) * 10
      if (currentIndex > this.roleTotal) {
        return
      }
      listPost({
        offset: currentIndex,
        limit: 10,
        id: null,
        userId: null,
        start: null,
        end: null
      })
        .then(response => {
          const roleData = response.rows
          this.roleTotal = response.total
          if (this.page === 1) {
            roleData.push([])
            this.tableData = roleData
            if (this.busy) {
              this.page++
            }
            this.busy = false
          } else {
            if (this.busy) {
              this.page++
            }
            const temp = this.tableData
            temp.pop()
            temp.concat(roleData)
            temp.push.apply(temp, roleData)
            temp.push([])
            this.tableData = temp
            this.busy = false
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    listAllRole4Post(roleId) {
      listAllRole4Post(roleId)
        .then(response => {
          const data = response.data
          const allRole = this.allRole
          for (var index = 0, len = allRole.length; index < len; index++) {
            allRole[index]['orig'] = false
            allRole[index]['target'] = false
            if (!(
              typeof data === 'undefined' ||
              data === null ||
              data === '' ||
              data.length < 1
            )) {
              if (data.indexOf(allRole[index].id) !== -1) {
                allRole[index]['orig'] = true
                allRole[index]['target'] = true
              }
            }
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    listAllRole() {
      listAllRole()
        .then(response => {
          const data = response.data
          if (data && data.length > 0) {
            for (var index = 0, len = data.length; index < len; index++) {
              data[index]['orig'] = false
              data[index]['target'] = false
            }
            this.allRole = data
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    loadMore() {
      this.busy = true
      this.listPost(this.page)
    },
    handleRoleClick(id) {
      this.selectPostId = id
      this.isWaitRoleData = false
      this.radio1 = null
      this.listAllRole4Post({
        postId: id
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    initFormSafeSubmitConfig() {
      this.loadingSubmitButton = false
      this.submitButtonText = '提交'
    },
    waitFormSafeSubmitConfig() {
      this.loadingSubmitButton = true
      this.submitButtonText = '执行中...'
    },
    handleGroupChange(value) {
      this.currentGroupIndex = value
    },
    allocationRole4Post() {
      allocationRole4Post({
        createList: this.handleCreateList(),
        deleteList: this.handleDeleteList()
      })
        .then(response => {
          const result = response.data
          if (result) {
            this.$message({
              message: '岗位分配角色操作成功',
              type: 'success'
            })
          } else {
            this.$message.error('岗位分配角色操作失败')
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleCreateList() {
      const createList = []
      if (this.allRole && this.allRole.length > 0) {
        for (var index = 0, len = this.allRole.length; index < len; index++) {
          const temp = this.allRole[index]
          if (!temp.orig && temp.target) {
            createList.push({
              postId: this.selectPostId,
              roleId: temp.id
            })
          }
        }
      }
      return createList
    },
    handleDeleteList() {
      const deleteList = []
      if (this.allRole && this.allRole.length > 0) {
        for (var index = 0, len = this.allRole.length; index < len; index++) {
          const temp = this.allRole[index]
          if (temp.orig && !temp.target) {
            deleteList.push({
              postId: this.selectPostId,
              roleId: temp.id
            })
          }
        }
      }
      return deleteList
    }
  }
}
</script>
