import { ComponentsName } from '@/core/static/limitType'
import { CommonBaseSettingConfig, CommonConfig } from '../../CommonConfig'
import { DragComponentItem } from '@/global'

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
]

export const DragConfig: DragComponentItem = {
  name: '饼图',
  key: ComponentsName.BasePie,
  type: 'pie',
  img: '/chart-img/BasePie.png'
}

export const BasePieDefaultConfig = {
  name: '基础饼图',
  componentType: 'chart',
  data,
  angleField: 'value',
  colorField: 'type',
  label: {
    text: 'value',
    style: {
      fontWeight: 'bold',
    },
  },
  legend: {
    color: {
      title: false,
      position: 'right',
      rowPadding: 5,
    },
  },
  ...CommonConfig
}

export const BasePieSettingConfig = {
  'base': CommonBaseSettingConfig,
  'dataMap': [
    {
      name: 'colorField',
      label: '内容',
      type: 'select',
      default: 'type',
    },
    {
      name: 'angleField',
      label: '角度',
      type: 'select',
      default: 'value',
    },
  ]
}
