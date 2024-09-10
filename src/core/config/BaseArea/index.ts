import { ComponentsName } from '@/core/static/limitType'
import { CommonBaseSettingConfig, CommonConfig, CommonDataMapSetting } from '../CommonConfig'
import { DragComponentItem } from '@/global'

const data = [
  { 'name': 'area1', 'value': 80.24 },
  { 'name': 'area2', 'value': 30.35 },
  { 'name': 'area3', 'value': 50.84 },
  { 'name': 'area4', 'value': 49.92 },
  { 'name': 'area5', 'value': 70.8 },
]

export const BaseAreaDragConfig: DragComponentItem =  {
  name: '基础面积图',
  key: ComponentsName.BaseArea,
  type: 'area',
  img: '/chart-img/BaseArea.png'
}

export const BaseAreaDefaultConfig = {
  name: '基础面积图',
  componentType: 'chart',
  data,
  xField: 'name',
  yField: 'value',
  ...CommonConfig,
}

export const BaseAreaSettingConfig = {
  'base': CommonBaseSettingConfig,
  'dataMap': CommonDataMapSetting
}