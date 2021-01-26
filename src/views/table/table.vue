<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix" style="text-align:center;">
              <span>卡片名称</span>
            </div>
            <div id="roomTypeCheckIn" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix" style="text-align:center;">
              <span>卡片名称</span>
            </div>
            <div id="news" />
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px" :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix" style="text-align:center;">
              <span>卡片名称</span>
            </div>
            <div id="lines" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix" style="text-align:center;">
              <span>卡片名称</span>
            </div>
            <div id="histtogram" />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<style>
.el-card__header {
  border-bottom: none;
}
</style>
<script>
import { Chart } from '@antv/g2'

export default {
  data() {
    return {}
  },
  mounted() {
    this.initComponent()
  },
  methods: {
    initComponent() {
      // 分组条形图
      const histtogramdata = [
        { country: '乌拉圭', type: '2016 年转基因种植面积', value: 1.3 },
        { country: '乌拉圭', type: '2016 年耕地总面积', value: 1.8 },
        { country: '巴拉圭', type: '2016 年转基因种植面积', value: 3.6 },
        { country: '巴拉圭', type: '2016 年耕地总面积', value: 5.5 },
        { country: '南非', type: '2016 年转基因种植面积', value: 3.7 },
        { country: '南非', type: '2016 年耕地总面积', value: 12.1 },
        { country: '巴基斯坦', type: '2016 年转基因种植面积', value: 2.9 },
        { country: '巴基斯坦', type: '2016 年耕地总面积', value: 22.0 },
        { country: '阿根廷', type: '2016 年转基因种植面积', value: 23.8 },
        { country: '阿根廷', type: '2016 年耕地总面积', value: 38.6 },
        { country: '加拿大', type: '2016 年转基因种植面积', value: 11.6 },
        { country: '加拿大', type: '2016 年耕地总面积', value: 46.9 },
        { country: '巴西', type: '2016 年转基因种植面积', value: 49.1 },
        { country: '巴西', type: '2016 年耕地总面积', value: 73.2 },
        { country: '中国', type: '2016 年转基因种植面积', value: 2.8 },
        { country: '中国', type: '2016 年耕地总面积', value: 108.4 },
        { country: '美国', type: '2016 年转基因种植面积', value: 72.9 },
        { country: '美国', type: '2016 年耕地总面积', value: 165.2 },
        { country: '印度', type: '2016 年转基因种植面积', value: 49.1 },
        { country: '印度', type: '2016 年耕地总面积', value: 175.4 }
      ]

      const histtogram = new Chart({
        container: 'histtogram',
        autoFit: true,
        height: 500,
        padding: [10, 0, 0, 60]
      })
      histtogram.data(histtogramdata)
      histtogram.scale('value', {
        alias: '销售额（万）'
      })

      histtogram.axis('value', false)
      histtogram.coordinate().transpose()
      histtogram.facet('mirror', {
        fields: ['type'],
        transpose: true,
        showTitle: false,
        eachView: (view, facet) => {
          const facetIndex = facet.columnIndex
          if (facetIndex === 0) {
            view.axis('country', {
              position: 'top',
              label: {
                style: {
                  fill: '#aaaaaa',
                  fontSize: 12
                }
              },
              tickLine: {
                alignTick: false,
                length: 0
              },
              line: null
            })
          } else {
            view.axis('country', false)
          }
          const color = facetIndex === 0 ? '#1890ff' : '#2fc25b'
          view
            .interval()
            .position('country*value')
            .color(color)
            .size(30)
            .label('value', val => {
              let offset = facetIndex === 1 ? -4 : 4
              let shadowBlur = 2
              let textAlign = facetIndex === 1 ? 'end' : 'start'
              let fill = 'white'
              if (val < 15) {
                offset = facetIndex === 1 ? 4 : -4
                textAlign = facetIndex === 1 ? 'start' : 'end'
                fill = '#666666'
                shadowBlur = 0
              }
              return {
                offset,
                style: {
                  fill,
                  stroke: null,
                  shadowBlur,
                  shadowColor: 'rgba(0, 0, 0, .45)',
                  textAlign
                }
              }
            })
        }
      })
      histtogram.interaction('element-highlight')
      histtogram.render()

      const data = [
        { type: '1-3秒', value: 0.16 },
        { type: '4-10秒', value: 0.125 },
        { type: '11-30秒', value: 0.24 },
        { type: '31-60秒', value: 0.19 },
        { type: '1-3分', value: 0.22 },
        { type: '3-10分', value: 0.05 },
        { type: '10-30分', value: 0.01 },
        { type: '30+分', value: 0.015 }
      ]

      const chart = new Chart({
        container: 'roomTypeCheckIn',
        autoFit: true,
        height: 500
      })
      chart.data(data)
      chart.scale('value', {
        nice: true
      })
      chart.axis('type', {
        tickLine: null
      })

      chart.axis('value', {
        label: {
          formatter: val => {
            return +val * 100 + '%'
          }
        }
      })

      chart.tooltip({
        showMarkers: false
      })
      chart.interaction('element-active')

      chart.legend(false)
      chart
        .interval({
          background: {
            style: {
              radius: 8
            }
          }
        })
        .position('type*value')
        .color('type', val => {
          if (val === '10-30分' || val === '30+分') {
            return '#ff4d4f'
          }
          return '#2194ff'
        })
        .label('value', {
          content: originData => {
            const val = parseFloat(originData.value)
            if (val < 0.05) {
              return (val * 100).toFixed(1) + '%'
            }
          },
          offset: 10
        })

      chart.render()
      const newsdata = [
        { item: '事例一', count: 40, percent: 0.4 },
        { item: '事例二', count: 21, percent: 0.21 },
        { item: '事例三', count: 17, percent: 0.17 },
        { item: '事例四', count: 13, percent: 0.13 },
        { item: '事例五', count: 9, percent: 0.09 }
      ]

      // 饼状图
      const news = new Chart({
        container: 'news',
        autoFit: true,
        height: 500
      })

      news.data(newsdata)

      news.coordinate('theta', {
        radius: 0.85
      })

      news.scale('percent', {
        formatter: val => {
          val = val * 100 + '%'
          return val
        }
      })
      news.tooltip({
        showTitle: false,
        showMarkers: false
      })
      news.axis(false) // 关闭坐标轴
      const interval = news
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', {
          offset: -40,
          style: {
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
            fill: '#fff'
          }
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%'
          return {
            name: item,
            value: percent
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
      news.interaction('element-single-selected')
      news.render()

      // 默认选择
      interval.elements[0].setState('selected', true)

      // 折线图
      const linesdata = [
        { country: 'Asia', year: '1750', value: 502 },
        { country: 'Asia', year: '1800', value: 635 },
        { country: 'Asia', year: '1850', value: 809 },
        { country: 'Asia', year: '1900', value: 5268 },
        { country: 'Asia', year: '1950', value: 4400 },
        { country: 'Asia', year: '1999', value: 3634 },
        { country: 'Asia', year: '2050', value: 947 },
        { country: 'Africa', year: '1750', value: 106 },
        { country: 'Africa', year: '1800', value: 107 },
        { country: 'Africa', year: '1850', value: 111 },
        { country: 'Africa', year: '1900', value: 1766 },
        { country: 'Africa', year: '1950', value: 221 },
        { country: 'Africa', year: '1999', value: 767 },
        { country: 'Africa', year: '2050', value: 133 },
        { country: 'Europe', year: '1750', value: 163 },
        { country: 'Europe', year: '1800', value: 203 },
        { country: 'Europe', year: '1850', value: 276 },
        { country: 'Europe', year: '1900', value: 628 },
        { country: 'Europe', year: '1950', value: 547 },
        { country: 'Europe', year: '1999', value: 729 },
        { country: 'Europe', year: '2050', value: 408 },
        { country: 'Oceania', year: '1750', value: 200 },
        { country: 'Oceania', year: '1800', value: 200 },
        { country: 'Oceania', year: '1850', value: 200 },
        { country: 'Oceania', year: '1900', value: 460 },
        { country: 'Oceania', year: '1950', value: 230 },
        { country: 'Oceania', year: '1999', value: 300 },
        { country: 'Oceania', year: '2050', value: 300 }
      ]
      const lines = new Chart({
        container: 'lines',
        autoFit: true,
        height: 500
      })

      lines.data(linesdata)
      lines.scale('year', {
        type: 'linear',
        tickInterval: 50
      })
      lines.scale('value', {
        nice: true
      })

      lines.tooltip({
        showCrosshairs: true,
        shared: true
      })

      lines
        .area()
        .adjust('stack')
        .position('year*value')
        .color('country')
      lines
        .line()
        .adjust('stack')
        .position('year*value')
        .color('country')

      lines.interaction('element-highlight')

      lines.render()
    }
  }
}
</script>
