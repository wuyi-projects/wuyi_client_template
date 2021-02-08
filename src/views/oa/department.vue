<template>
  <div class="app-container">
    <!--数据展示-->
    <el-card class="box-card" shadow="never">
      <el-row>
        <el-col :span="6">
          <el-row>
            <el-col style="border-right:#F5F7FA 1px solid;">
              <div class="left-title-box bg-title" style="font-weight:bold;">部门列表
              </div>
              <div :style="defaultHeight">
                <vxe-table
                  show-overflow
                  highlight-hover-row
                  row-key
                  height="auto"
                  :show-header="false"
                  :data="tableData"
                  :radio-config="{labelField: 'departmentName',highlight: true , trigger: 'row'}"
                  :tree-config="{children: 'children', accordion: false, line: true, iconOpen: 'fa fa-caret-down', iconClose: 'fa fa-caret-right'}"
                  @radio-change="currentChange"
                >
                  <vxe-table-column type="radio" tree-node />
                </vxe-table>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="18">

          <el-col style="border-right:#F5F7FA 1px solid;">
            <div class="right-title-box bg-title-light">功能展示区</div>
            <div :style="defaultHeight" style="padding:20px;">

              <el-card class="box-card" style="margin-bottom:60px;" shadow="hover">

                <el-row class="border-bottom">
                  <el-col :span="6" style="margin-top:10px;">
                    <div><span style="font-weight:bold;margin-top:10px;">部门名称</span></div>
                  </el-col>
                  <el-col :span="18" style="margin-top:10px;">
                    <div><span>{{ currentDepartment.id?currentDepartment.departmentName:'[选择后左侧部门后展示信息]' }}</span></div>
                  </el-col>
                  <el-col :span="6" style="margin-top:10px;">
                    <div><span style="font-weight:bold;margin-top:10px;">上级部门</span></div>
                  </el-col>
                  <el-col :span="18" style="margin-top:10px;">
                    <div><span>{{ currentDepartment.id?currentDepartment.parentName:'[选择后左侧部门后展示信息]' }}</span></div>
                  </el-col>
                  <el-col :span="6" style="margin:10px 0 20px;">
                    <div><span style="font-weight:bold;">部门说明</span></div>
                  </el-col>
                  <el-col :span="18" style="margin:10px 0 20px;">
                    <div><span>{{ currentDepartment.id?currentDepartment.departmentDescription?currentDepartment.departmentDescription:'无':'[选择后左侧部门后展示信息]' }}</span></div>
                  </el-col>
                </el-row>
                <el-row style="margin:10px 0 0;">
                  <template v-if="currentDepartment.id === undefined">
                    <el-col :span="6" class="flex-center border-right">
                      <el-button type="text" class="button" @click="handleCreate()">新增部门</el-button>
                    </el-col>
                    <el-col :span="6" class="flex-center border-right">
                      <el-button type="text" class="button" disabled>添加下级部门</el-button>
                    </el-col>
                    <el-col :span="6" class="flex-center border-right">
                      <el-button type="text" class="button" disabled>修改</el-button>
                    </el-col>
                    <el-col :span="6" class="flex-center">
                      <el-button type="text" class="button" disabled>删除</el-button>
                    </el-col>
                  </template>
                  <template v-else>
                    <el-col :span="6" class="flex-center border-right">
                      <el-button type="text" class="button" @click="handleCreate()">新增部门</el-button>
                    </el-col>
                    <el-col :span="6" class="flex-center border-right">
                      <el-button type="text" class="button" @click="handleCreateChild(currentDepartment.id)">添加下级部门</el-button>
                    </el-col>
                    <el-col :span="6" class="flex-center border-right">
                      <el-button type="text" class="button" @click="handleUpdate()">修改</el-button>
                    </el-col>
                    <el-col :span="6" class="flex-center">
                      <el-button type="text" class="button" style="color:red;" @click="handleDelete()">删除</el-button>
                    </el-col>
                  </template>
                </el-row>
              </el-card>

              <template v-if="departmentFormVisible">
                <el-row type="flex" class="row-bg" justify="center">
                  <el-col :span="18">
                    <el-form
                      ref="dataForm"
                      :rules="rules"
                      :model="temp"
                      label-width="80px"
                    >
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="部门名称" prop="departmentName">
                            <el-input v-model="temp.departmentName" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="上级部门" prop="parent">
                            <el-select v-model="temp.parent" placeholder="选择上级部门" style="width:100%;">
                              <el-option
                                v-for="item in allDepartments"
                                :key="item.id"
                                :label="item.departmentName"
                                :value="item.id"
                              />
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="24">
                          <el-form-item label="部门说明" prop="departmentDescription">
                            <el-input v-model="temp.departmentDescription" type="textarea" clearable />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <div style="text-align: center;">
                      <el-button @click="resetForm('dataForm')">
                        重置
                      </el-button>
                      <el-button
                        type="primary"
                        :loading="loadingSubmitButton"
                        :disabled="loadingSubmitButton"
                        @click="departmentFormStatus === 'create' ? createData() : updateData()"
                      >
                        {{ submitButtonText }}
                      </el-button>
                    </div>
                  </el-col>
                </el-row>
              </template>

            </div>
          </el-col>

        </el-col>
      </el-row>
    </el-card>
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

.bg-title-light {
  background: rgb(128, 195, 255);
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
import { listAllDepartment4Recursion, listAllDepartment, saveDepartment, updateDepartment, deleteDepartment } from '@/api/department'

export default {
  data() {
    return {
      loadingSubmitButton: false,
      allDepartments: [],
      textMap: {
        update: '编辑',
        create: '创建'
      },
      departmentFormVisible: false,
      currentDepartment: {
      },
      defaultHeight: {
        height: ''
      },
      tableData: [],
      temp: {
        id: null,
        departmentName: '',
        departmentDescription: '',
        parent: '',
        version: 0
      },
      rules: {
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 2, message: '长度大于等于 2 个字符', trigger: 'blur' }
        ],
        parent: [{ required: true, message: '请选择上级部门', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  created() {
    this.getHeight()
    this.listAllDepartment()
    this.listAllDepartment4Recursion()
  },
  methods: {
    getHeight() {
      this.defaultHeight.height = window.innerHeight - 220 + 'px'
    },
    listAllDepartment4Recursion() {
      listAllDepartment4Recursion()
        .then(response => {
          const data = response.data
          this.tableData = data
        })
        .catch(e => {
          this.loading = false
        })
    },
    listAllDepartment() {
      listAllDepartment()
        .then(response => {
          const data = response.data
          data.unshift({
            id: 0,
            departmentName: '默认'
          })
          this.allDepartments = data
          console.log(JSON.stringify(data))
        })
        .catch(e => {
          this.loading = false
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
    handleCreate() {
      this.initFormSafeSubmitConfig()
      this.departmentFormStatus = 'create'
      this.departmentFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreateChild(parent) {
      this.initFormSafeSubmitConfig()
      this.departmentFormStatus = 'create'
      this.departmentFormVisible = true
      this.temp.parent = parent
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.waitFormSafeSubmitConfig()
          const tempData = Object.assign({}, this.temp)
          saveDepartment(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
                this.dialogFormVisible = false
                this.resetForm('dataForm')
                this.departmentFormVisible = false
                this.listAllDepartment()
                this.listAllDepartment4Recursion()
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
    handleUpdate() {
      this.initFormSafeSubmitConfig()
      this.departmentFormStatus = 'update'
      this.departmentFormVisible = true
      this.temp = Object.assign({}, this.currentDepartment)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      alert(JSON.stringify(this.temp))
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.waitFormSafeSubmitConfig()
          const tempData = Object.assign({}, this.temp)
          updateDepartment(tempData)
            .then(response => {
              const result = response.data
              if (result) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.initFormSafeSubmitConfig()
                this.dialogFormVisible = false
                this.resetForm('dataForm')
                this.departmentFormVisible = false
                this.listAllDepartment()
                this.listAllDepartment4Recursion()
              } else {
                this.$message.error('修改失败')
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
    currentChange({ row }) {
      this.currentDepartment = this.handleParent4Department(row)
    },
    handleParent4Department(value) {
      const department = value
      if (value) {
        const parentId = value.parent
        const allDepartments = this.allDepartments
        if (allDepartments && allDepartments.length > 0) {
          for (var index = 0, len = allDepartments.length; index < len; index++) {
            if (parentId === allDepartments[index].id) {
              department.parentName = allDepartments[index].departmentName
              return department
            }
          }
        }
      }
      department.parentName = '无'
      return department
    },
    handleDelete() {
      this.$confirm('永久删除[ <span style="color:red;font-weight:bold;">' + this.currentDepartment.departmentName + '</span> ]吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        const { id, version } = this.currentDepartment
        const tempData = Object.assign({
          id: id,
          version: version
        })
        deleteDepartment(tempData)
          .then(response => {
            const result = response.data
            if (result) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.listAllDepartment()
              this.listAllDepartment4Recursion()
            } else {
              this.$message.error('删除失败')
            }
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
    }

  }
}
</script>
