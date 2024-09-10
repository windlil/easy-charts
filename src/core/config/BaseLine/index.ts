import { ComponentsName } from '@/core/static/limitType'
import { CommonBaseSettingConfig, CommonConfig, CommonDataMapSetting } from '../CommonConfig'
import { DragComponentItem } from '@/global'

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
]

export const BaseLineDragConfig: DragComponentItem = {
  name: '基础折线图',
  key: ComponentsName.BaseLine,
  type: 'line',
  img: '/chart-img/BaseLine.png'
}

export const BaseLineDefaultConfig = {
  name: '基础折线图',
  componentType: 'chart',
  data,
  xField: 'year',
  yField: 'value',
  ...CommonConfig
}

export const BaseLineSettingConfig = {
  'base': CommonBaseSettingConfig,
  'dataMap': CommonDataMapSetting
}
