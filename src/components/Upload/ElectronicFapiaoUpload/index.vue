<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action="https://dichong-wuhan.oss-cn-hangzhou.aliyuncs.com"
      :data="dataObj"
      accept=".pdf"
      list-type="picture"
      :multiple="false"
      :show-file-list="false"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip">只能上传电子发票(PDF格式)，且不超过100kB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { date2YearMonthDay } from "@/utils/util.js";
import { getProductCode, getOpenID, getTeamNumber } from "@/utils/auth";

import { getOssToken } from "@/api/file";

export default {
  name: "SingleUpload",
  props: {
    value: String,
  },
  data() {
    return {
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
        callback: "",
        "x:open_id": getOpenID(),
        "x:product_code": getProductCode(),
        "x:channel_id": 3,
        "x:type_id": 1,
        "x:subtype_id": 1,
        "x:company_id": getTeamNumber(),
      },
      dialogVisible: false,
    };
  },
  computed: {
    imageUrl() {
      return this.value;
    },
    imageName() {
      if (this.value != null && this.value !== "") {
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
    fileList() {
      return [
        {
          name: this.imageName,
          url: this.imageUrl,
        },
      ];
    },
    showFileList: {
      get: function () {
        return (
          this.value !== null && this.value !== "" && this.value !== undefined
        );
      },
      set: function (newValue) {},
    },
  },
  methods: {
    emitInput(val) {
      this.$emit("input", val);
    },
    handleRemove(file, fileList) {
      this.emitInput("");
    },
    handlePreview(file) {
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      const _self = this;
      const isLt100K = file.size / 1024 / 100 <= 1;
      if (!isLt100K) {
        this.$message.error("PDF超过 100kB");
      }
      return new Promise((resolve, reject) => {
        getOssToken()
          .then((response) => {
            const data = response.data;
            _self.dataObj.policy = data.policy;
            _self.dataObj.signature = data.signature;
            _self.dataObj.ossaccessKeyId = data.accessid;
            _self.dataObj.key =
              data.dir + date2YearMonthDay(new Date()) + "/${filename}";
            _self.dataObj.dir = data.dir;
            _self.dataObj.host = data.host;
            _self.dataObj.callback = data.callback;
            resolve(true);
          })
          .catch((e) => {
            this.loading = false;
            reject(false);
          });
      });
    },
    handleUploadSuccess(res, file) {
      this.showFileList = true;
      this.fileList.pop();
      this.fileList.push({
        name: file.name,
        url:
          this.dataObj.host +
          "/" +
          this.dataObj.key.replace("${filename}", file.name),
      });
      this.emitInput(this.fileList[0].url);
    },
  },
};
</script>
