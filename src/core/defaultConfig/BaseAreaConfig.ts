import { CommonConfig } from './common/CommonConfig'

const data = [
  {'name':'area1','value':80.24},
  {'name':'area2','value':30.35},
  {'name':'area3','value':50.84},
  {'name':'area4','value':49.92},
  {'name':'area5','value':70.8},
]

export const BaseAreaConfig = {
  name: '基础面积图',
  componentType: 'chart',
  data,
  xField: 'name',
  yField: 'value',
  ...CommonConfig,
}