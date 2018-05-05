<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import { debounce } from '@/utils'

const animationDuration = 5000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '30%'
    },
    height: {
      type: String,
      default: '100%'
    },
    barData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    barData: {
      handler(newVal) {
        this.initChart()
      },
      deep: true
    }
  },
  created() {
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const _data = this.barData
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 40,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['移动', '联通', '电信'],
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#5A6164',
            fontSize: '12'
          },
          axisTick: {
            show: false,
            alignWithLabel: false
          }
        }],
        yAxis: [{
          show: false
        }],
        series: [{
          type: 'bar',
          stack: 'vistors',
          barWidth: '80%',
          legendHoverLink: false,
          data: [_data.CMCC, _data.UNICOM, _data.CHINANET],
          animationDuration,
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#333'
            }
          },
          itemStyle: {
            normal: {
              color: '#248eff'
            }
          }
        }]
      })
    }
  }
}
</script>
