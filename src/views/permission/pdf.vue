<template>
  <div class="app-container">
    <el-row>
      <el-col :span="2"><div /></el-col>
      <el-col :span="20"><pdf ref="pdf" :src="url" /></el-col>
      <el-col :span="2"><div /></el-col>
    </el-row>
  </div>
</template>

<style></style>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  data() {
    return {
      url:
        'https://dichong-wuhan.oss-cn-hangzhou.aliyuncs.com/dichong/file/2020122901.pdf'
    }
  },
  computed: {},
  created() {},
  methods: {}
}
</script>
