<template>
  <div id="root">
    <header>
      <Publicity v-show="!running" />
      <!-- <el-button class="res" type="text" @click="showResult = true">
        抽奖结果
      </el-button>
      <el-button class="con" type="text" @click="showConfig = true">
        抽奖配置
      </el-button> -->
    </header>
    <div id="main" :class="{ mask: showRes }" />
    <div id="tags">
      <ul v-for="item in datas" :key="item.key">
        <li>
          <a
            href="javascript:void(0);"
            :style="{
              color: '#fff',
            }"
          >
            {{ item.name ? item.name : item.key }}
            <img v-if="item.photo" :src="item.photo" :width="50" :height="50">
          </a>
        </li>
      </ul>
    </div>
    <transition name="bounce">
      <div v-show="showRes" id="resbox">
        <p @click="showRes = false">{{ categoryName }}抽奖结果：</p>
        <div class="container">
          <span
            v-for="item in resArr"
            :key="item"
            class="itemres"
            :style="resCardStyle"
            :data-id="item"
            :class="{
              numberOver:
                !!photos.find((d) => d.id === item) ||
                !!list.find((d) => d.key === item),
            }"
            @click="showRes = false"
          >
            <span v-if="!photos.find((d) => d.id === item)" class="cont">
              <span
                v-if="!!list.find((d) => d.key === item)"
                :style="{
                  fontSize: '40px',
                }"
              >
                {{ list.find((d) => d.key === item).name }}
              </span>
              <span v-else>
                {{ item }}
              </span>
            </span>
            <img
              v-if="photos.find((d) => d.id === item)"
              :src="photos.find((d) => d.id === item).value"
              alt="photo"
              :width="160"
              :height="160"
            >
          </span>
        </div>
      </div>
    </transition>

    <el-button
      class="audio"
      type="text"
      style="font-size:32px;"
      :icon="audioPlaying ? 'el-icon-video-pause' : 'el-icon-video-play'"
      @click="
        () => {
          playAudio(!audioPlaying);
        }
      "
    >
      <!-- <i class="iconfont" :class="[audioPlaying ? 'iconstop' : 'iconplay1']" /> -->
    </el-button>

    <LotteryConfig :visible.sync="showConfig" @resetconfig="reloadTagCanvas" />
    <Tool
      :running="running"
      :closeres="closeRes"
      :disabled-start="disabledStart"
      @toggle="toggle"
      @resetConfig="reloadTagCanvas"
      @getPhoto="getPhoto"
    />
    <Result :visible.sync="showResult" />

    <span class="copy-right" style="margin: 0 20px 10px 0">
      Copyright©物一技术
    </span>

    <audio
      id="audiobg"
      preload="auto"
      controls
      autoplay
      loop
      @play="playHandler"
      @pause="pauseHandler"
    >
      <source :src="audioSrc">
      你的浏览器不支持audio标签
    </audio>
  </div>
</template>
<script>
import LotteryConfig from '@/components/lottery/LotteryConfig'
import Publicity from '@/components/lottery/Publicity'
import Tool from '@/components/lottery/Tool'
import bgaudio from '@/assets/bg.mp3'
import beginaudio from '@/assets/begin.mp3'
import {
  clearData,
  getData,
  setData,
  configField,
  resultField,
  newLotteryField,
  conversionCategoryName,
  listField
} from '@/helper/index'
import { luckydrawHandler } from '@/helper/algorithm'
import Result from '@/components/lottery/Result'
import { database, DB_STORE_NAME } from '@/helper/db'

import {
  getLotteryInfo,
  listAllSuperdrawRoster,
  uploadSuperdrawInfo
} from '@/api/lottery-info'

export default {
  name: 'App',

  components: { LotteryConfig, Publicity, Tool, Result },

  data() {
    return {
      title: '超级大奖',
      disabledStart: false,
      allSuperdrawRoster: [],
      lotteryInfoId: null,
      lotteryRosterId: null,
      running: false,
      showRes: false,
      showConfig: false,
      showResult: false,
      resArr: [],
      category: '',
      audioPlaying: false,
      audioSrc: bgaudio
    }
  },

  computed: {
    form: {
      get() {
        return this.$store.state.config
      },
      set(val) {
        // this.$store.commit('setConfig', val);
        return val
      }
    },
    resCardStyle() {
      const style = { fontSize: '30px' }
      const { number } = this.config
      if (number < 100) {
        style.fontSize = '100px'
      } else if (number < 1000) {
        style.fontSize = '80px'
      } else if (number < 10000) {
        style.fontSize = '60px'
      }
      return style
    },
    config: {
      get() {
        return this.$store.state.config
      }
    },
    result: {
      get() {
        return this.$store.state.result
      },
      set(val) {
        this.$store.commit('setResult', val)
      }
    },
    list() {
      return this.$store.state.list
    },
    allresult() {
      let allresult = []
      for (const key in this.result) {
        if (this.result.hasOwnProperty(key)) {
          const element = this.result[key]
          allresult = allresult.concat(element)
        }
      }
      return allresult
    },
    datas() {
      const { number } = this.config
      const nums = number >= 1500 ? 500 : this.config.number
      const configNum = number > 1500 ? Math.floor(number / 3) : number
      const randomShowNums = luckydrawHandler(configNum, [], nums)
      const randomShowDatas = randomShowNums.map((item) => {
        const listData = this.list.find((d) => d.key === item)
        const photo = this.photos.find((d) => d.id === item)
        return {
          key: item * (number > 1500 ? 3 : 1),
          name: listData ? listData.name : '',
          photo: photo ? photo.value : ''
        }
      })
      return randomShowDatas
    },
    categoryName() {
      return conversionCategoryName(this.category)
    },
    photos() {
      return this.$store.state.photos
    }
  },
  watch: {
    photos: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.reloadTagCanvas()
        })
      }
    }
  },
  created() {
    // 清除全部数据
    this.resetAllData()
    const that = this
    const lotteryInfoId = that.$route.query.id
    if (lotteryInfoId) {
      this.lotteryInfoId = lotteryInfoId
      this.getLotteryInfo()
      this.listAllSuperdrawRoster()
    }
    const data = getData(configField)
    if (data) {
      this.$store.commit('setConfig', Object.assign({}, data))
    }
    const result = getData(resultField)
    if (result) {
      this.$store.commit('setResult', result)
    }

    const newLottery = getData(newLotteryField)
    if (newLottery) {
      const config = this.config
      newLottery.forEach((item) => {
        this.$store.commit('setNewLottery', item)
        if (!config[item.key]) {
          this.$set(config, item.key, 0)
        }
      })
      this.$store.commit('setConfig', config)
    }

    const list = getData(listField)
    if (list) {
      this.$store.commit('setList', list)
    }
  },
  mounted() {
    this.startTagCanvas()
    setTimeout(() => {
      this.getPhoto()
    }, 1000)
    window.addEventListener('resize', this.reportWindowSize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reportWindowSize)
    this.resetAllData()
  },
  methods: {
    resetAllData() {
      clearData()
      this.$store.commit('setClearStore')
      database.clear(DB_STORE_NAME)
    },
    reportWindowSize() {
      const AppCanvas = this.$el.querySelector('#rootcanvas')
      if (AppCanvas.parentElement) {
        AppCanvas.parentElement.removeChild(AppCanvas)
      }
      this.startTagCanvas()
    },
    playHandler() {
      this.audioPlaying = true
    },
    pauseHandler() {
      this.audioPlaying = false
    },
    playAudio(type) {
      if (type) {
        this.$el.querySelector('#audiobg').play()
      } else {
        this.$el.querySelector('#audiobg').pause()
      }
    },
    loadAudio() {
      this.$el.querySelector('#audiobg').load()
      this.$nextTick(() => {
        this.$el.querySelector('#audiobg').play()
      })
    },
    getPhoto() {
      database.getAll(DB_STORE_NAME).then((res) => {
        if (res && res.length > 0) {
          this.$store.commit('setPhotos', res)
        }
      })
    },
    speed() {
      return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)]
    },
    createCanvas() {
      const canvas = document.createElement('canvas')
      canvas.width = document.body.offsetWidth
      canvas.height = document.body.offsetHeight
      canvas.id = 'rootcanvas'
      this.$el.querySelector('#main').appendChild(canvas)
    },
    startTagCanvas() {
      this.createCanvas()
      const { speed } = this
      window.TagCanvas.Start('rootcanvas', 'tags', {
        textColour: null,
        initial: speed(),
        dragControl: 1,
        textHeight: 20,
        noSelect: true,
        lock: 'xy'
      })
    },
    reloadTagCanvas() {
      window.TagCanvas.Reload('rootcanvas')
    },
    closeRes() {
      this.showRes = false
    },
    toggle(form) {
      const { speed, config } = this
      if (this.running) {
        this.audioSrc = bgaudio
        this.loadAudio()

        window.TagCanvas.SetSpeed('rootcanvas', speed())
        this.showRes = true
        this.running = !this.running
        this.$nextTick(() => {
          this.reloadTagCanvas()
        })
        // 上传中奖结果
        uploadSuperdrawInfo({
          lotteryInfoId: this.lotteryInfoId,
          lotteryRosterId: this.lotteryRosterId
        })
          .then((response) => {
            this.disabledStart = true
          })
          .catch((e) => {
            this.loading = false
          })
      } else {
        this.showRes = false
        if (!form) {
          return
        }

        this.audioSrc = beginaudio
        this.loadAudio()

        const { number } = config
        const { category, mode, qty, remain, allin } = form
        let num = 1
        if (mode === 1 || mode === 5) {
          num = mode
        } else if (mode === 0) {
          num = remain
        } else if (mode === 99) {
          num = qty
        }
        const resArr = luckydrawHandler(
          number,
          allin ? [] : this.allresult,
          num
        )
        this.resArr = resArr
        if (resArr && resArr[0]) {
          const index = resArr[0]
          const selected = this.allSuperdrawRoster[index - 1]
          this.lotteryRosterId = selected.id
        }

        this.category = category
        if (!this.result[category]) {
          this.$set(this.result, category, [])
        }
        const oldRes = this.result[category] || []
        const data = Object.assign({}, this.result, {
          [category]: oldRes.concat(resArr)
        })
        this.result = data
        window.TagCanvas.SetSpeed('rootcanvas', [5, 1])
        this.running = !this.running
      }
    },
    getLotteryInfo() {
      getLotteryInfo({
        id: this.lotteryInfoId
      })
        .then((response) => {
          this.lotteryInfo = response.data
          this.lotteryType = response.data.type
          const type =
            response.data.type === 1
              ? '普通抽奖'
              : response.data.type === 2
                ? '超级大奖'
                : '抽奖'
          this.pageTitle =
            '【' + type + '】' + response.data.title + ' / 抽奖名单管理'
        })
        .catch((e) => {
          this.loading = false
        })
    },
    listAllSuperdrawRoster() {
      const that = this
      listAllSuperdrawRoster({
        id: this.lotteryInfoId
      })
        .then((response) => {
          const data = response.data
          this.allSuperdrawRoster = data
          const list = []
          const len = data.length
          for (let index = 0; index < len; index++) {
            const key = index + 1
            const name = data[index].name
            list.push({
              key,
              name
            })
          }

          this.form.name = that.title
          this.form.number = len

          setData(configField, this.form)
          this.$store.commit('setConfig', this.form)
          this.$emit('update:visible', false)

          // this.$message({
          //   message: '保存成功',
          //   type: 'success'
          // })
          this.$nextTick(() => {
            // this.$emit('resetconfig')
            this.reloadTagCanvas()
          })

          console.log(JSON.stringify(list))
          this.$store.commit('setList', list)
          this.$nextTick(() => {
            // this.$emit('resetconfig')
            this.reloadTagCanvas()
          })
        })
        .catch((e) => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
#root {
  height: 100%;
  position: relative;
  background-image: url("../../assets/bg1.jpg");
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #121936;
  .mask {
    -webkit-filter: blur(5px);
    filter: blur(5px);
  }
  header {
    height: 50px;
    line-height: 50px;
    position: relative;
    .el-button {
      position: absolute;
      top: 17px;
      padding: 0;
      z-index: 9999;
      &.con {
        right: 20px;
      }
      &.res {
        right: 100px;
      }
    }
  }
  .audio {
    position: absolute;
    top: 100px;
    right: 30px;
    // width: 40px;
    // height: 40px;
    // line-height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    padding: 0;
    text-align: center;
    // .iconfont {
    //   position: relative;
    //   left: 1px;
    // }
  }
  .copy-right {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #ccc;
    font-size: 12px;
  }
  .bounce-enter-active {
    animation: bounce-in 1.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0s reverse;
  }
}
#main {
  height: 100%;
}

#resbox {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1280px;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  p {
    color: red;
    font-size: 50px;
    line-height: 120px;
  }
  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .itemres {
    background: #fff;
    width: 160px;
    height: 160px;
    border-radius: 4px;
    border: 1px solid #ccc;
    line-height: 160px;
    font-weight: bold;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .cont {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &.numberOver::before {
      content: attr(data-id);
      width: 30px;
      height: 22px;
      line-height: 22px;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 14px;
      // border-radius: 50%;
      z-index: 1;
    }
  }
}
</style>
