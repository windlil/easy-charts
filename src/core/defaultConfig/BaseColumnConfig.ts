import { CommonConfig } from './CommonConfig'

const data = [
  { 'letter': 'A', 'frequency': 0.08167 },
  { 'letter': 'B', 'frequency': 0.01492 },
  { 'letter': 'C', 'frequency': 0.02782 },
  { 'letter': 'D', 'frequency': 0.04253 },
  { 'letter': 'E', 'frequency': 0.12702 },
  { 'letter': 'F', 'frequency': 0.02288 },
  { 'letter': 'G', 'frequency': 0.02015 },
  { 'letter': 'H', 'frequency': 0.06094 },
  { 'letter': 'I', 'frequency': 0.06966 }
]

export const BaseColumnConfig = {
  name: '基础柱状图',
  data,
  xField: 'letter',
  yField: 'frequency',
  label: {
    text: (d: any) => `${(d.frequency * 100).toFixed(1)}%`,
    textBaseline: 'bottom',
  },
  axis: {
    y: {
      labelFormatter: '.0%',
    },
  },
  theme: 'classicDark',
  ...CommonConfig
}