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
    key: 'column',
    label: '柱形图',
  },
  {
    key: 'pie',
    label: '饼形图',
  },
  {
    key: 'dashboard',
    label: '仪表盘',
  },
]

export const ChartList: ComponentItem[] = [
  {
    name: '折线图',
    key: 'BaseLine',
    type: 'line',
    img: 'https://xiaopujun.github.io/light-chaser-app/assets/base-area-CtNnIUUi.png'
  },
  {
    name: '饼图',
    key: 'BasePie',
    type: 'pie',
    img: 'https://xiaopujun.github.io/light-chaser-app/assets/pie-CRAHHn6h.png',
  },
  {
    name: '柱状图',
    key: 'BaseColumn',
    type: 'column',
    img: 'https://xiaopujun.github.io/light-chaser-app/assets/base-column-DBv19rZt.png',
  },
  {
    name: '仪表盘',
    key: 'BaseDashboard',
    type: 'dashboard',
    img: 'https://xiaopujun.github.io/light-chaser-app/assets/radar-B2krN29c.png'
  }
]