import { ComponentsName } from '@/core/static/limitType'
import { CommonConfig, CommonBaseSettingConfig, CommonDataMapSetting } from '../CommonConfig'
import { DragComponentItem } from '@/global'

const data = [
  { name: 'A', value: 0.08167 },
  { name: 'B', value: 0.01492 },
  { name: 'C', value: 0.02782 },
  { name: 'D', value: 0.04253 },
  { name: 'E', value: 0.12702 },
  { name: 'F', value: 0.02288 },
  { name: 'G', value: 0.02015 },
  { name: 'H', value: 0.06094 },
  { name: 'I', value: 0.06966 }
]

export const BaseColumnDragConfig: DragComponentItem = {
  name: '基础柱状图',
  key: ComponentsName.BaseColumn,
  type: 'column',
  img: 'https://xiaopujun.github.io/light-chaser-app/assets/base-column-DBv19rZt.png',
}

export const BaseColumnDefaultConfig = {
  name: '基础柱状图',
  componentType: 'chart',
  data,
  xField: 'name',
  yField: 'value',
  ...CommonConfig
}

export const BaseColumnSettingConfig = {
  'base': CommonBaseSettingConfig,
  'dataMap': CommonDataMapSetting,
}