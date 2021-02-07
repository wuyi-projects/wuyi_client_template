<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never" style="margin-bottom:16px;">
      <el-row>
        <el-col :span="6" style="border-right:#F5F7FA 1px solid;">
          <div class="left-title-box bg-title">角色列表</div>
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
                        v-if="item.id == selectRoleId"
                        type="danger"
                        effect="dark"
                        size="mini"
                        style="margin-right:10px;"
                      >
                        当前
                      </el-tag>
                      <span style="font-weight:bold;">{{
                        item.description
                      }}</span>
                    </el-col>
                    <el-col :span="8" align="right">
                      <div style="display:inline;" @click.stop>
                        <el-button
                          icon="el-icon-edit"
                          size="mini"
                          circle
                          @click="handleUpdate(item)"
                        />
                      </div>
                      <div style="display:inline;margin-left:5px;" @click.stop>
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          circle
                          @click="handleDelete(item)"
                        />
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24" style="overflow:hidden;">
                      <span> {{ item.role }}</span>
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
                  <el-col :span="24">
                    <span>
                      <el-button
                        type="text"
                        icon="el-icon-plus"
                        @click="handleCreate()"
                      >新增角色</el-button>
                    </span>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </el-col>
        <!-- 权限配置区 -->
        <el-col :span="18">
          <!--<div class="right-title-box bg-title">权限配置
          </div>-->

          <el-form
            ref="ruleForm"
            :model="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            style="margin:0px 30px;"
          >
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
                    <template v-if="isWaitPermissionData">
                      <el-radio-group
                        v-model="radio1"
                        size="small"
                        @change="changeAllPermission2Checked"
                      >
                        <el-radio-button
                          disabled
                          label="1"
                        ><svg-icon
                          icon-class="all-select"
                          class-name="all-select"
                          style="font-size:13px;margin-right:10px;"
                        />全选</el-radio-button>
                        <el-radio-button
                          disabled
                          label="2"
                        ><svg-icon
                          icon-class="all-clear"
                          class-name="all-clear"
                          style="font-size:13px;margin-right:10px;"
                        />清空</el-radio-button>
                      </el-radio-group>
                      <el-button
                        type="danger"
                        disabled
                        style="margin-left:10px"
                        size="small"
                        icon="el-icon-delete"
                      >授予 / 收回权限</el-button>
                    </template>
                    <template v-else>
                      <el-radio-group
                        v-model="radio1"
                        size="small"
                        @change="changeAllPermission2Checked"
                      >
                        <el-radio-button
                          label="1"
                        ><svg-icon
                          icon-class="all-select"
                          class-name="all-select"
                          style="font-size:13px;margin-right:10px;"
                        />全选</el-radio-button>
                        <el-radio-button
                          label="2"
                        ><svg-icon
                          icon-class="all-clear"
                          class-name="all-clear"
                          style="font-size:13px;margin-right:10px;"
                        />清空</el-radio-button>
                      </el-radio-group>
                      <el-button
                        type="danger"
                        style="margin-left:10px"
                        size="small"
                        icon="el-icon-delete"
                        @click="grantAndRevoke"
                      >授予 / 收回权限</el-button>
                    </template>
                  </el-col>
                </el-row>
              </div>
              <div>
                <el-radio-group
                  v-model="radio1"
                  style="width:100%;"
                  @change="handleGroupChange"
                >
                  <el-carousel
                    height="180px"
                    indicator-position="outside"
                    :autoplay="false"
                    arrow="never"
                  >
                    <el-carousel-item
                      v-for="index in pagerGroupInfos.length"
                      :key="index"
                      name="{index}"
                    >
                      <template>
                        <div
                          v-for="groupInfo in pagerGroupInfos[index - 1]"
                          :key="groupInfo.id"
                        >
                          <el-col style="padding:2px;" :span="6" align="left">
                            <el-radio
                              border
                              :label="groupInfo.id"
                              style="width:100%;"
                            >{{ groupInfo.groupName }}</el-radio>
                          </el-col>
                        </div>
                      </template>
                    </el-carousel-item>
                  </el-carousel>
                </el-radio-group>
              </div>
            </el-card>

            <div v-if="isWaitPermissionData" :span="24" align="center">
              <div style="height:300px;line-height:300px;">
                <span>选择左侧角色，可按权限分组进行授予权限或回收权限操作</span>
              </div>
            </div>
            <template v-else>
              <template
                v-for="(group, groupIndex) in allPermissionsAndGroupInfo"
              >
                <template v-if="currentGroupIndex == group.id">
                  <el-row
                    :key="group.id"
                    type="flex"
                    class="row-bg"
                    justify="space-between"
                    style="margin-top: 20px;"
                  >
                    <el-col :span="18">
                      <span v-cloak class="checkbox-group-title">{{
                        group.groupName
                      }}</span>
                    </el-col>
                    <el-col :span="6" align="right">
                      <el-checkbox
                        v-model="group.mychecked"
                        :label="group.id"
                        :indeterminate="group.isIndeterminate"
                        @change="groupChanged(groupIndex, group.id)"
                      >全选/全不选</el-checkbox>
                    </el-col>
                  </el-row>
                  <div
                    :key="`b-${group.id}`"
                    style="margin: 1px 0;border-bottom:#F5F7FA 1px solid;"
                  />
                  <div
                    :key="`p-${group.id}`"
                    style="height:300px;padding:5px 0 0;"
                  >
                    <el-scrollbar style="height:100%;">
                      <el-row>
                        <el-col
                          v-for="permission in group.permissions"
                          :key="permission.id"
                          style="margin-top: 10px"
                          :span="8"
                        >
                          <el-checkbox
                            v-model="permission.mychecked"
                            :label="permission.id"
                            @change="permissionChanged(groupIndex)"
                          >
                            {{ permission.description }}
                          </el-checkbox>
                        </el-col>
                      </el-row>
                    </el-scrollbar>
                  </div>
                </template>
              </template>
            </template>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      v-if="dialogFormVisible"
      :title="textMap[dialogStatus]"
      :center="true"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="90px"
        style="width: 100%; padding:10px;"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色" prop="role">
              <el-input v-model="temp.role" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色描述" prop="description">
              <el-input
                v-model="temp.description"
                clearable
                :autosize="{ minRows: 4, maxRows: 6 }"
                type="textarea"
                placeholder="输入角色描述"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启用开关" prop="available">
              <el-switch v-model="temp.available" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('dataForm')">
          重置
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
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
</style>

<script>
import {
  listRole,
  saveRole,
  updateRole,
  deleteRole,
  listAllPermission4Role,
  listAllPermissionsAndGroupInfo,
  grantAndRevoke,
  listAllPermissionGroupInfo
} from '@/api/permission'

export default {
  data() {
    return {
      busy: false,
      defaultHeight: {
        height: ''
      },
      roleTotal: 0,
      groupPagerTotal: 16,
      pagerGroupInfos: [],
      page: 1,
      radio1: '0',
      dialogFormVisible: false,
      dialogStatus: '',
      currentGroupIndex: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableData: [],
      rules: {
        role: [{ required: true, message: '角色名必填', trigger: 'blur' }]
      },
      initCreateData: {
        id: undefined,
        role: '',
        description: '',
        available: true
      },
      temp: {
        id: undefined,
        role: '',
        description: '',
        available: true,
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
      },
      selectRoleId: '',
      checkAll: false,
      allPermissionsAndGroupInfo: [],
      checkedPermissions: [],
      isWaitPermissionData: true
    }
  },
  computed: {},
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
    this.handleListAllPermissiomGroupInfo()
    this.listAllPermissionsAndGroupInfo()
  },
  methods: {
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 210 + 'px'
    },
    listRole(page) {
      const currentIndex = (page - 1) * 10
      if (currentIndex > this.roleTotal) {
        return
      }
      listRole({
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
    listAllPermission4Role(roleId) {
      this.isWaitPermissionData = false
      listAllPermission4Role({
        roleId: roleId
      })
        .then(response => {
          const data = response.data

          // 处理数组
          const owner = []
          if (!(typeof data === 'undefined' ||
              data === null ||
              data === '' ||
              data.length < 1)) {
            for (var index = 0, len = data.length; index < len; index++) {
              owner.push(data[index].permissionId)
            }
          }
          const groups = this.allPermissionsAndGroupInfo
          for (index = 0, len = groups.length; index < len; index++) {
            var permissions = groups[index].permissions
            for (
              var permissionIndex = 0,
                permissionLength = permissions.length;
              permissionIndex < permissionLength;
              permissionIndex++
            ) {
              permissions[permissionIndex]['mychecked'] = false
              if (owner && owner.indexOf(
                permissions[permissionIndex].id) !== -1) {
                permissions[permissionIndex]['mychecked'] = true
              }
            }
            this.permissionChanged(index)
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    listAllPermissionsAndGroupInfo() {
      listAllPermissionsAndGroupInfo({})
        .then(response => {
          const data = response.data
          if (!(typeof data === 'undefined' ||
              data === null ||
              data === '' ||
              data.length < 1)) {
            // 处理数组
            const groups = data
            for (
              var index = 0, groupsLenght = groups.length;
              index < groupsLenght;
              index++
            ) {
              groups[index]['mychecked'] = false
              groups[index]['isIndeterminate'] = false
              var permissions = groups[index].permissions
              for (
                var permissionIndex = 0, permissionLength = permissions.length;
                permissionIndex < permissionLength;
                permissionIndex++
              ) {
                permissions[permissionIndex]['mychecked'] = false
              }
            }
            this.allPermissionsAndGroupInfo = groups
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleListAllPermissiomGroupInfo() {
      listAllPermissionGroupInfo()
        .then(response => {
          const data = response.data

          // 填装分组索引
          for (var i = 0, len = data.length; i < len;) {
            this.pagerGroupInfos.push(
              data.slice(i, i + this.groupPagerTotal)
            )
            i = i + this.groupPagerTotal
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    tableRowClassName({ row, rowIndex }) {
      if (this.isActive) {
        return 'warning-row'
      }
    },
    rowTableRowClick(row, column, event) {
      this.selectRoleId = row.id
      this.isWaitPermissionData = false
      this.listAllPermission4Role(row.id)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleCreate() {
      this.temp = Object.assign({}, this.initCreateData)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    initFormSafeSubmitConfig() {
      this.loadingSubmitButton = false
      this.submitButtonText = '提交'
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.temp)
          saveRole(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
                this.dialogFormVisible = false
                this.page = 1
                this.listRole(this.page)
              } else {
                this.$message.error('新增失败')
                this.initFormSafeSubmitConfig()
              }
            })
            .catch(e => {
              this.loading = false
              this.initFormSafeSubmitConfig()
            })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.loadingSubmitButton = true
          this.submitButtonText = '执行中...'
          const tempData = Object.assign({}, this.temp)
          updateRole(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '修改操作成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
                this.dialogFormVisible = false
                this.page = 1
                this.listRole(this.page)
              } else {
                this.$message.error('修改操作失败')
                this.initFormSafeSubmitConfig()
              }
            })
            .catch(e => {
              this.loading = false
              this.initFormSafeSubmitConfig()
            })
        }
      })
    },
    handleDelete(row) {
      this.$confirm(
        '永久删除[ <span style="color:red;font-weight:bold;">' + row.description + '</span> ]角色吗, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }
      )
        .then(() => {
          const { id, version } = row
          const tempData = Object.assign({
            id: id,
            version: version
          })
          deleteRole(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
              } else {
                this.$message.error('删除失败')
              }
              this.$refs.dataGrid.commitProxy('reload')
            })
            .catch(e => {
              this.loading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleGroupChange(value) {
      this.currentGroupIndex = value
    },
    loadMore() {
      this.busy = true
      this.listRole(this.page)
    },
    handleRoleClick(id) {
      this.selectRoleId = id
      this.isWaitPermissionData = false
      this.listAllPermission4Role(id)
    },
    // permission group change
    groupChanged: function(index) {
      // 分组全选
      const group = this.allPermissionsAndGroupInfo[index]
      var permissions = group.permissions
      if (group.mychecked) {
        if (permissions) {
          for (var i = 0, len = permissions.length; i < len; i++) {
            permissions[i].mychecked = true
          }
        }
      } else {
        // 分组全不选
        if (permissions) {
          for (i = 0, len = permissions.length; i < len; i++) {
            permissions[i].mychecked = false
          }
        }
      }
    },
    changeAllPermission2Checked() {
      const radio1 = this.radio1
      switch (radio1) {
        case '1': // 全选
          this.handleSelectAll()
          break
        case '2': // 清空
          this.handleClearAll()
          break
        default:
      }
    },
    // 选择所有
    handleSelectAll: function() {
      for (var i = 0; i < this.allPermissionsAndGroupInfo.length; i++) {
        this.allPermissionsAndGroupInfo[i].mychecked = true
        this.groupChanged(i)
      }
    },
    // 清空
    handleClearAll: function() {
      for (var i = 0; i < this.allPermissionsAndGroupInfo.length; i++) {
        this.allPermissionsAndGroupInfo[i].mychecked = false
        this.groupChanged(i)
      }
    },
    // permission change
    permissionChanged: function(groupIndex) {
      const permissions = this.allPermissionsAndGroupInfo[groupIndex]
        .permissions
      let checkedCount = 0
      const len = permissions.length
      for (var i = 0; i < len; i++) {
        if (permissions[i].mychecked === true) {
          checkedCount++
        }
      }
      if (checkedCount === len) {
        // 二级全勾选  一级勾选
        this.allPermissionsAndGroupInfo[groupIndex].mychecked = true
        this.allPermissionsAndGroupInfo[groupIndex].isIndeterminate = false
      } else if (checkedCount > 0) {
        // 二级未全选  一级不勾选
        this.allPermissionsAndGroupInfo[groupIndex].mychecked = false
        this.allPermissionsAndGroupInfo[groupIndex].isIndeterminate = true
      } else {
        this.allPermissionsAndGroupInfo[groupIndex].mychecked = false
        this.allPermissionsAndGroupInfo[groupIndex].isIndeterminate = false
      }
    },
    grantAndRevoke() {
      console.log(JSON.stringify(this.allPermissionsAndGroupInfo))
      this.checkedPermissions = []
      for (var i = 0; i < this.allPermissionsAndGroupInfo.length; i++) {
        var permissions = this.allPermissionsAndGroupInfo[i].permissions
        var len = permissions.length
        for (var j = 0; j < len; j++) {
          if (permissions[j].mychecked) {
            this.checkedPermissions.push(permissions[j].id)
          }
        }
      }

      grantAndRevoke({
        roleId: this.selectRoleId,
        permissionIds: this.checkedPermissions
      })
        .then(response => {
          const result = response.data
          if (result) {
            this.$message({
              message: '授予或收回权限操作成功',
              type: 'success'
            })
          } else {
            this.$message.error('授予或收回权限操作失败')
          }
        })
        .catch(e => {
          this.loading = false
        })
    }
  }
}
</script>
