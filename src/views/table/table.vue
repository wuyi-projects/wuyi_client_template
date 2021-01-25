<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row>
        <el-col :span="12">
          <div>
            <el-card class="box-card">
              <div id="roomTypeCheckIn" />
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div id="news" />
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-card class="box-card">
            <div id="lines" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div id="histtogram" />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

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
      const lineData = [
        { month: 'Jan', city: 'Tokyo', temperature: 7 },
        { month: 'Jan', city: 'London', temperature: 3.9 },
        { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
        { month: 'Feb', city: 'London', temperature: 4.2 },
        { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
        { month: 'Mar', city: 'London', temperature: 5.7 },
        { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
        { month: 'Apr', city: 'London', temperature: 8.5 },
        { month: 'May', city: 'Tokyo', temperature: 18.4 },
        { month: 'May', city: 'London', temperature: 11.9 },
        { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
        { month: 'Jun', city: 'London', temperature: 15.2 },
        { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
        { month: 'Jul', city: 'London', temperature: 17 },
        { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
        { month: 'Aug', city: 'London', temperature: 16.6 },
        { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
        { month: 'Sep', city: 'London', temperature: 14.2 },
        { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
        { month: 'Oct', city: 'London', temperature: 10.3 },
        { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
        { month: 'Nov', city: 'London', temperature: 6.6 },
        { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
        { month: 'Dec', city: 'London', temperature: 4.8 }
      ]

      const line = new Chart({
        container: 'lines',
        autoFit: true,
        height: 500
      })

      line.data(lineData)
      line.scale({
        month: {
          range: [0, 1]
        },
        temperature: {
          nice: true
        }
      })

      line.tooltip({
        showCrosshairs: true,
        shared: true
      })

      line.axis('temperature', {
        label: {
          formatter: val => {
            return val + ' °C'
          }
        }
      })

      line
        .line()
        .position('month*temperature')
        .color('city')
        .shape('smooth')

      line
        .point()
        .position('month*temperature')
        .color('city')
        .shape('circle')
      line.render()
    }
  }
}
</script>
