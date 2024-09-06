import { subMenuItem } from '.'
import { ComponentItem } from './main-menu'

export const chartMenuItems: subMenuItem[] = [
  {
    key: 'all',
    label: '全部',
  },
  {
    key: 'line',
    label: '折线图',
  },
  {
    key: 'area',
    label: '面积图',
  },
  {
    key: 'column',
    label: '柱形图',
  },
  {
    key: 'pie',
    label: '饼形图',
  },
]

export const ChartList: ComponentItem[] = [
  {
    name: '折线图',
    key: 'BaseLine',
    type: 'line',
    img: '/chart-img/BaseLine.png'
  },
  {
    name: '面积图',
    key: 'BaseArea',
    type: 'area',
    img: '/chart-img/BaseArea.png'
  },
  {
    name: '饼图',
    key: 'BasePie',
    type: 'pie',
    img: '/chart-img/BasePie.png'
  },
  {
    name: '柱状图',
    key: 'BaseColumn',
    type: 'column',
    img: 'https://xiaopujun.github.io/light-chaser-app/assets/base-column-DBv19rZt.png',
  },
]