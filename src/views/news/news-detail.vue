<template>
  <div class="app-container">
    <!--查询条件-->
    <el-card class="box-card" shadow="never" style="padding:0 20px 40px">
      <el-page-header content="详情页面" @back="goBack" />
      <el-row>
        <el-col
          align="center"
        ><h3>{{ newsInfo.title }}</h3></el-col>
      </el-row>
      <el-divider>{{ newsInfo.publisher }} {{ newsInfo.publishTime }}</el-divider>
      <el-row>
        <template v-for="picture in newsInfo.pictures">
          <el-col :key="picture.id" align="center">
            <el-image style="width: 500px;" :src="picture.pictureUrl" lazy>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </el-col>
        </template>
      </el-row>
      <div v-html="newsInfo.content" />
    </el-card>
  </div>
</template>

<style>
.horizontal-center {
  text-align: center;
}

.hide .el-upload--picture-card {
  display: none;
}
</style>

<script>
import { getNews } from '@/api/news'

export default {
  data() {
    return {
      id: null,
      pictures: [],
      newsInfo: {
        id: null,
        title: '',
        content: '',
        weight: 0,
        publisher: '',
        publishStatus: 0,
        picture: [],
        version: 0
      }
    }
  },
  computed: {
  },
  created() {
    const that = this
    const id = that.$route.query.id
    if (id) {
      that.id = id
      that.getNews()
    }
  },

  methods: {

    getNews() {
      const that = this
      const id = that.id
      if (id) {
        getNews({
          id: id
        })
          .then(response => {
            const data = response.data
            const content = data.content
            if (content) {
              data.content = content.replace(/\n/g, '<br>')
            }
            this.newsInfo = data
            const pictures = data.pictures
            if (pictures && pictures.lenght > 0) {
              for (var index = 0, len = pictures.lenght; index < len; index++) {
                const picture = pictures[index]
                that.pictures.push(picture.pictureUrl)
              }
            }
          })
          .catch(e => {
            this.loading = false
          })
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
