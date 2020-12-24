<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never" style="margin-bottom:16px;">
      <el-form
        ref="searchForm"
        :model="searchFormData"
        label-width="120px"
        size="small"
      >
        <el-col :span="8">
          <el-form-item label="手机号码" prop="accout">
            <el-input v-model="searchFormData.accout" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名称" prop="productId">
            <el-select
              v-model="searchFormData.productId"
              style="width:100%"
              placeholder="请选择产品名称"
              @change="handleChangePlatformProduct"
            >
              <el-option
                v-for="item in platformProductOptionData"
                :key="item.id"
                :label="item.productName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="folding">
          <el-form-item label="用户类型" prop="type">
            <el-select
              v-model="searchFormData.type"
              style="width:100%"
              placeholder="请选择用户类型"
            >
              <el-option
                v-for="item in accountTypeOptionData"
                :key="item.type"
                :label="item.note"
                :value="item.type"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="folding">
          <el-form-item label="账户状态" prop="locked">
            <el-select
              v-model="searchFormData.locked"
              style="width:100%"
              placeholder="请选择账户状态"
            >
              <el-option label="全部" value="" />
              <el-option label="已锁定" value="0" />
              <el-option label="正常" value="100" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="folding" :span="8">
          <el-form-item label="起止时间">
            <el-col :span="11">
              <el-form-item prop="start">
                <el-date-picker
                  v-model="searchFormData.start"
                  type="date"
                  placeholder="起始日期"
                  style="width: 100%;"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="end">
                <el-date-picker
                  v-model="searchFormData.end"
                  type="date"
                  placeholder="结束时间"
                  style="width: 100%;"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item style="float: right;" label-width="0">
            <el-button @click="resetForm('searchForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('searchForm')"
              >查 询</el-button
            >
            <el-button v-if="folding" type="text" @click="toggleFolding()"
              >收起<i class="el-icon-arrow-up el-icon--right"
            /></el-button>
            <el-button v-else type="text" @click="toggleFolding()"
              >展开<i class="el-icon-arrow-down el-icon--right"
            /></el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>

    <!--数据展示-->
    <el-card class="box-card" shadow="never" :style="defaultMinHeight">
      <vxe-grid ref="dataGrid" v-bind="gridOptions">
        <!--工具栏按钮-->
        <template v-slot:buttons>
          <el-radio-group v-model="tabPosition" style="margin-bottom: 3px;">
            <el-radio-button label="add">新增</el-radio-button>
            <el-radio-button label="batchDelete">批量删除</el-radio-button>
          </el-radio-group>
        </template>

        <!--平台产品标识标记-->
        <template v-slot:platformFlag_default="{ row }">
          <template v-if="row.platformFlag === 0">
            <el-tag type="success" effect="dark">其他产品</el-tag>
          </template>
          <template v-else-if="row.platformFlag === 1">
            <el-tag type="danger" effect="dark">平台产品</el-tag>
          </template>
          <template v-else />
        </template>

        <!--是否锁定用展示-->
        <template v-slot:locked_default="{ row }">
          <template v-if="row.locked === 100">
            <el-badge is-dot class="item" type="primary" />正常
          </template>
          <template v-else>
            <el-badge is-dot class="item" type="info" />锁定
          </template>
        </template>

        <!--数据行操作-->
        <template v-slot:operate="{ row }">
          <el-button v-if="row.locked === 100" type="text" style="color:red;" @click="handleDisable(row)">停用</el-button>
          <el-button v-else type="text" @click="handleEnable(row)">启用</el-button>
          <el-divider direction="vertical" />
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="beforeHandleCommand('handleDelete', row)"
              >
                删除
              </el-dropdown-item>
              <el-dropdown-item
                :command="beforeHandleCommand('viewRow', row)"
                divided
              >
                详情
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <!--自定义空数据模板-->
        <template v-slot:empty>
          <span>
            <p>没有找到匹配的记录</p>
          </span>
        </template>
      </vxe-grid>
    </el-card>
  </div>
</template>

<style>
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
</style>

<script>
import formatTableSize from "@/utils/size";

import { listUser } from "@/api/user";
import {
  listAllPlatformProduct,
  listAllAccountType4Product
} from "@/api/platform-product";

export default {
  data() {
    return {
      tabPosition: "add",
      defaultMinHeight: {
        minHeight: ""
      },
      folding: false,
      searchFormData: {
        id: "",
        accout: "",
        type: "",
        productId: null,
        start: "",
        end: ""
      },
      platformProductOptionData: [],
      accountTypeOptionData: [],
      rules: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      gridOptions: {
        border: "default",
        size: formatTableSize(),
        resizable: true,
        autoResize: true,
        showHeaderOverflow: true,
        showOverflow: true,
        highlightHoverRow: true,
        highlightHoverColumn: true,
        highlightCurrentColumn: true,
        keepSource: true,
        id: "full_edit_1",
        rowId: "id",
        headerAlign: "center",
        scrollY: { gt: -1 },
        printConfig: {
          columns: [
            { field: "id" },
            { field: "role" },
            { field: "description" },
            { field: "available" }
          ]
        },
        sortConfig: {
          trigger: "cell",
          defaultSort: {
            field: "name",
            order: "desc"
          }
        },
        filterConfig: {
          remote: true
        },
        pagerConfig: {
          autoHidden: true,
          pageSize: 10,
          pageSizes: [10, 20, 50, 80, 100],
          layouts: [
            "Total",
            "Sizes",
            "PrevJump",
            "PrevPage",
            "Number",
            "NextPage",
            "NextJump",
            "FullJump"
          ]
        },
        toolbar: {
          refresh: true,
          print: true,
          zoom: true,
          custom: true
        },
        radioConfig: {
          range: true,
          reserve: true,
          highlight: true
        },
        proxyConfig: {
          seq: true, // 启用动态序号代理
          sort: true, // 启用排序代理
          filter: true, // 启用筛选代理
          form: true, // 启用表单代理
          props: {
            result: "rows",
            total: "total"
          },
          ajax: {
            query: ({ page, sort, filters }) => {
              // 查询条件
              const searchData = {};
              const searchFormData = this.searchFormData;
              for (var key in searchFormData) {
                const value = searchFormData[key];
                if (
                  !(
                    typeof value === "undefined" ||
                    value === null ||
                    value === ""
                  )
                ) {
                  searchData[key] = value;
                }
              }

              // 处理排序条件
              const sortParams = Object.assign({
                sort: sort.property,
                order: sort.order
              });
              // 处理筛选条件
              filters.forEach(({ property, values, column }) => {
                if (values) {
                  if (column.filterMultiple) {
                    sortParams[property] = values;
                  } else {
                    sortParams[property] = values[0];
                  }
                }
              });
              const pageData = Object.assign({
                offset:
                  page.currentPage >= 0
                    ? (page.currentPage - 1) * page.pageSize
                    : 0,
                limit: page.pageSize
              });
              const result = Object.assign(pageData, searchData, sortParams);
              return listUser(result);
            }
          }
        },
        columns: [
          { type: "checkbox", width: 40, align: "center" },
          {
            field: "id",
            title: "编号",
            width: 140,
            align: "center",
            headerAlign: "center",
            visible: false
          },
          {
            field: "productId",
            title: "产品编号",
            minWidth: 140,
            align: "center",
            headerAlign: "center",
            visible: false
          },
          {
            field: "productName",
            title: "产品名称",
            minWidth: 240,
            align: "left",
            headerAlign: "center"
          },
          {
            field: "productCode",
            title: "产品代号",
            minWidth: 120,
            align: "center",
            headerAlign: "center",
            visible: false
          },
          {
            field: "phone",
            title: "登录账号",
            minWidth: 120,
            align: "center",
            headerAlign: "center"
          },
          {
            field: "platformFlag",
            title: "平台产品标识",
            minWidth: 120,
            align: "center",
            headerAlign: "center",
            slots: { default: "platformFlag_default" }
          },
          {
            field: "typeName",
            title: "账户类型名称",
            minWidth: 120,
            align: "center",
            headerAlign: "center"
          },
          {
            field: "typeCode",
            title: "账户类型代码",
            minWidth: 120,
            align: "center",
            headerAlign: "center",
            visible: false
          },
          {
            field: "type",
            title: "用户类型",
            minWidth: 80,
            align: "center",
            headerAlign: "center",
            visible: false
          },
          {
            field: "lockedState",
            title: "是否锁定",
            width: 80,
            align: "center",
            headerAlign: "center",
            slots: { default: "locked_default" }
          },
          {
            field: "createTime",
            title: "注册时间",
            minWidth: 160,
            align: "center",
            headerAlign: "center"
          },
          {
            title: "操作",
            width: 140,
            align: "center",
            fixed: "right",
            slots: { default: "operate" }
          }
        ],
        importConfig: {
          remote: true,
          importMethod: this.importMethod,
          types: ["xlsx"],
          modes: ["insert"]
        },
        exportConfig: {
          // 默认选中类型
          type: "csv",
          // 局部自定义类型
          types: ["xlsx", "csv", "html", "xml", "txt"],
          // 自定义数据量列表
          modes: ["current", "all"]
        },
        checkboxConfig: {
          reserve: true,
          highlight: true,
          range: true
        },
        editRules: {
          name: [
            { required: true, message: "app.body.valid.rName" },
            { min: 3, max: 50, message: "名称长度在 3 到 50 个字符" }
          ],
          email: [{ required: true, message: "邮件必须填写" }],
          role: [{ required: true, message: "角色必须填写" }]
        },
        editConfig: {
          trigger: "click",
          mode: "row",
          showStatus: true
        }
      }
    };
  },
  computed: {},
  created() {
    window.addEventListener("resize", this.getMinHeight);
    this.getMinHeight();
    this.listAllPlatformProduct();
  },
  methods: {
    getMinHeight() {
      this.defaultMinHeight.minHeight = window.innerHeight - 210 + "px";
    },
    checkColumnMethod({ column }) {
      if (["nickname", "role"].includes(column.property)) {
        return false;
      }
      return true;
    },
    importMethod({ file }) {
      return false;
    },
    exportMethod({ options }) {
      return false;
    },
    toggleFolding() {
      this.folding = !this.folding;
    },
    typeFormatter({ cellValue, row, column }) {
      let result;
      if (
        !(
          typeof cellValue === "undefined" ||
          cellValue === null ||
          cellValue === ""
        )
      ) {
        switch (cellValue) {
          case 0:
            result = "普通用户";
            break;
          case 5:
            result = "平台管理";
            break;
          default:
            result = "--";
        }
      } else {
        result = "--";
      }
      return result;
    },
    platformFlagFormatter({ cellValue, row, column }) {
      let result;
      if (
        !(
          typeof cellValue === "undefined" ||
          cellValue === null ||
          cellValue === ""
        )
      ) {
        switch (cellValue) {
          case 0:
            result = "其他产品";
            break;
          case 1:
            result = "平台产品";
            break;
          default:
            result = "--";
        }
      } else {
        result = "--";
      }
      return result;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.dataGrid.commitProxy("reload");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleUpdate(row) {
      alert("编辑" + JSON.stringify(row));
    },
    handleDelete(row) {
      alert("删除" + JSON.stringify(row));
    },
    viewRow(row) {
      alert("查看" + JSON.stringify(row));
    },
    beforeHandleCommand(command, row) {
      return {
        command: command,
        row: row
      };
    },
    handleCommand(command) {
      switch (command.command) {
        case "handleDelete":
          this.handleDelete(command.row);
          break;
        case "viewRow":
          this.viewRow(command.row);
          break;
        default:
      }
    },
    listAllPlatformProduct() {
      let that = this;
      listAllPlatformProduct({})
        .then(response => {
          const data = response.data;
          that.platformProductOptionData = data;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    listAllAccountType4Product(val) {
      let that = this;
      listAllAccountType4Product({
        productId: val
      })
        .then(response => {
          const data = response.data;
          that.accountTypeOptionData = data;
        })
        .catch(e => {
          that.loading = false;
        });
    },
    handleChangePlatformProduct(val) {
      this.listAllAccountType4Product(val);
    },
    handleDisable(row) {
      this.$confirm('停用[ <span style="color:red;font-weight:bold;">' + row.productName + '(' + row.phone + ')' + '</span> ]账号吗, 是否继续?', '提示', {
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
        disablePlatformProduct(tempData)
          .then(response => {
            const result = response.data
            if (result) {
              this.$message({
                type: 'success',
                message: '停用账号操作成功'
              })
            } else {
              this.$message.error('停用账号操作失败')
            }
            this.$refs.dataGrid.commitProxy('reload')
          })
          .catch(e => {
            this.loading = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    handleEnable(row) {
      const { id, version } = row
      const tempData = Object.assign({
        id: id,
        version: version
      })
      enablePlatformProduct(tempData)
        .then(response => {
          const result = response.data
          if (result) {
            this.$message({
              type: 'success',
              message: '停用账号操作成功'
            })
          } else {
            this.$message.error('停用账号操作失败')
          }
          this.$refs.dataGrid.commitProxy('reload')
        })
        .catch(e => {
          this.loading = false
        })
    },
  }
};
</script>
