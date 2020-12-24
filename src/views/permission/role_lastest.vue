<template>
  <div class="app-container">

    <!--查询条件-->
    <el-card class="box-card" shadow="never" style="margin-bottom:16px;">
      <el-row>
        <el-col :span="6" style="border-right:#F5F7FA 1px solid;">
          <div class="left-title-box bg-title">角色列表
          </div>
          <div :style="defaultHeight">
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="infinite-list" style="height:100%;overflow:auto">
              <li v-for="item in tableData" :key="item.id" style="padding:10px;font-size:14px;border-bottom:#F5F7FA 1px solid;" @click="handleRoleClick(item.id)">

                <el-row v-if="!(typeof item.id === 'undefined' || item.id === null || item.id === '')">
                  <el-row type="flex" class="row-bg" justify="space-between" align="middle">
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
                      <span style="font-weight:bold;">{{ item.description }}</span>
                    </el-col>
                    <el-col :span="8" align="right">
                      <div style="display:inline;" @click.stop>
                        <el-button icon="el-icon-edit" size="mini" circle @click="handleUpdate(item)" />
                      </div>
                      <div style="display:inline;margin-left:5px;" @click.stop>
                        <el-button icon="el-icon-delete" size="mini" circle @click="handleDelete(item)" />
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
                  <el-row type="flex" class="row-bg" justify="space-between" align="middle" />
                  <el-col :span="24">
                    <span>
                      <el-button type="text" icon="el-icon-plus" @click="handleCreate()">新增角色</el-button>
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

          <div>
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:0px 30px;">

              <el-card :body-style="{ padding: '10px 20px' }">
                <div slot="header" class="clearfix">
                  <span>权限分组</span>

                  <el-checkbox v-model="checkAll" style="float: right; padding: 3px 0" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选/全不选</el-checkbox>
                </div>
                <div>
                  <el-radio-group v-model="radio1" @change="handleGroupChange">
                    <template v-for="permissionsAndGroupInfo in allPermissionsAndGroupInfo">
                      <el-col :key="permissionsAndGroupInfo.id" style="padding:2px;" :span="6" align="left">
                        <el-radio border :label="permissionsAndGroupInfo.id" style="width:100%;">{{ permissionsAndGroupInfo.groupName }}</el-radio>
                      </el-col>
                    </template>
                  </el-radio-group>
                </div>
              </el-card>

              <div v-if="isWaitPermissionData" :span="24" align="center">
                <div style="height:300px;line-height:300px;">
                  <span>选择左侧角色，可进行权限查看和配置操作</span>
                </div>
              </div>
              <template v-else>
                <template v-for="permissionsAndGroupInfo in allPermissionsAndGroupInfo">
                  <template v-if="currentGroupIndex == permissionsAndGroupInfo.id">
                    <el-row :key="permissionsAndGroupInfo.groupName" type="flex" class="row-bg" justify="space-between" style="margin-top: 20px;">
                      <el-col :span="18">
                        <span class="checkbox-group-title">{{ permissionsAndGroupInfo.groupName }}</span>
                      </el-col>
                      <el-col :span="6" align="right">
                        <el-checkbox v-model="checkAll" :indeterminate="permissionsAndGroupInfo.isIndeterminate" @change="handleCheckAllChange">全选/全不选</el-checkbox>
                      </el-col>
                    </el-row>
                    <div :key="`A${permissionsAndGroupInfo.id}`" style="margin: 1px 0;border-bottom:#F5F7FA 1px solid;" />
                    <div :key="`B${permissionsAndGroupInfo.id}`" style="height:300px;padding:5px 0 0;">
                      <el-scrollbar style="height:100%;">
                        <el-checkbox-group v-model="checkedPermissions" @change="handlecheckedPermissionsChange">
                          <el-row>
                            <el-col v-for="permission in permissionsAndGroupInfo.permissions" :key="permission.id" style="margin-top: 10px" :span="8">
                              <el-checkbox :label="permission.id">
                                {{ permission.description }}
                              </el-checkbox>
                            </el-col>
                          </el-row>
                        </el-checkbox-group>
                      </el-scrollbar>
                    </div>
                  </template>
                </template>
              </template>
            </el-form>
          </div>

        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      v-if="dialogFormVisible"
      :title="textMap[dialogStatus]"
      :center="true"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px" style="width: 100%; padding:10px;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色" prop="role">
              <el-input v-model="temp.role" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="temp.description" clearable :autosize="{ minRows: 4, maxRows: 6}" type="textarea" placeholder="输入角色描述" />
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
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style lang = "scss" >
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

.bg-title{
    background: rgb(24,144,255);
}

.left-title-box {
    position: relative;
    border-radius: 4px 0 0 0px;
    padding: 20px;
    margin: 5px 0 0;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
}
.right-title-box {
    position: relative;
    border-radius: 0 4px 0 0;
    padding: 20px;
    margin: 5px 0;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
}

.infinite-list {
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list::-webkit-scrollbar{
  width:6px;
  height:10px;
  overflow-x:hidden;
  overflow-y:scroll;
  background-color:#FFFFFF;
}

.infinite-list::-webkit-scrollbar-track{

    border-radius: 10px;
    background-color: #FFFFFF;
}

.infinite-list::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background-color:rgba(135,141,153,.3);
  -webkit-transition:.3s background-color;
  transition:.3s background-color
}

.infinite-list::-webkit-scrollbar-thumb:hover {
  background-color:rgba(135,141,153,.5)
}
.infinite-list::-webkit-scrollbar-thumb:active {
  background-color:rgba(135,141,153,.5)
}
/*边角，即两个滚动条的交汇处*/
.infinite-list::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}

.checkbox-group-title{
    font-size:14px;
    font-weight:bold;
}
.el-scrollbar__wrap {
   overflow-x: hidden;
}

.el-radio{
  //height: 30px;
  //line-height:30px;
.el-radio__input{
  display: none;
}
&.is-checked{
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
    right:0;
    top:0;
  }
}
}
</style>

<script>

import { listRole, saveRole, updateRole, deleteRole, listAllPermission4Role, listAllPermissionsAndGroupInfo, listPermission } from '@/api/permission'

export default {
  data() {
    return {
      busy: false,
      defaultHeight: {
        height: ''
      },
      page: 1,
      radio1: '1',
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
        available: true
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
      checkedPermissions: [],
      allPermissionsAndGroupInfo: [],
      isWaitPermissionData: true,
      isIndeterminate: false
    }
  },
  computed: {
  },
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
    this.listAllPermissionsAndGroupInfo()
  },
  methods: {
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 220 + 'px'
    },
    listRole(page) {
      listRole({
        offset: (page - 1) * 10,
        limit: 10,
        id: null,
        userId: null,
        start: null,
        end: null
      })
        .then(response => {
          const roleData = response.rows
          if (this.page === 1) {
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
          const permissionIds = []
          for (var i = 0, l = data.length; i < l; i++) {
            permissionIds.push(data[i]['permissionId'])
          }
          this.checkedPermissions = permissionIds
        })
        .catch(e => {
          this.loading = false
        })
    },
    listPermission() {
      listPermission({
        offset: 0,
        limit: 10,
        id: null,
        userId: null,
        start: null,
        end: null
      })
        .then(response => {
          const data = response.rows
          const permissionsData = []
          for (var i = 0, l = data.length; i < l; i++) {
            permissionsData.push(data[i]['description'])
          }
          this.allPermissionsAndGroupInfo = permissionsData
        })
        .catch(e => {
          this.loading = false
        })
    },
    listAllPermissionsAndGroupInfo() {
      listAllPermissionsAndGroupInfo({
      })
        .then(response => {
          const data = response.data
          this.allPermissionsAndGroupInfo = data
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleCheckAllChange(val) {
      this.checkedPermissions = val ? this.allPermissionsAndGroupInfo : []
      this.isIndeterminate = false
    },
    handlecheckedPermissionsChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.allPermissionsAndGroupInfo.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allPermissionsAndGroupInfo.length
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
      alert(JSON.stringify(this.temp))
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
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
                this.$refs.dataGrid.commitProxy('reload')
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
      this.$refs['dataForm'].validate((valid) => {
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
                this.$refs.dataGrid.commitProxy('reload')
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
      this.$confirm('永久删除<strong>' + row.description + '</strong>角色吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
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
      }).catch(() => {
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
    }

  }
}
</script>
