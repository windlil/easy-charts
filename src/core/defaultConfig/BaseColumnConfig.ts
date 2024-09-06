import { CommonConfig } from './common/CommonConfig'

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

export const BaseColumnConfig = {
  name: '基础柱状图',
  componentType: 'chart',
  data,
  xField: 'name',
  yField: 'value',
  ...CommonConfig
}