import { ComponentsName } from '@/core/map/nameMap'

const enum SettingType {
  Base = 'base',
  Data = 'data',
  DataMap = 'dataMap',
  
  action = 'action',
}

const SettingBase = [
  {
    name: 'name',
    label: '名称',
    type: 'input',
  },
  {
    name: 'width',
    label: '宽度',
    type: 'number',
  },
  {
    name: 'height',
    label: '高度',
    type: 'number',
  },
  {
    name: 'x',
    label: 'x轴',
    type: 'number'
  },
  {
    name: 'y',
    label: 'y轴',
    type: 'number'
  },
  {
    name: 'z',
    label: '层级',
    type: 'number'
  },
]

const BaseSettingData= [
  {
    name: 'xField',
    label: 'x轴',
    type: 'select',
    default: 'name',
  },
  {
    name: 'yField',
    label: 'y轴',
    type: 'select',
    default: 'value',
  }
]

const PieDataMapSetting = [
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

export const SettingMap: Record<string, any> = {
  [ComponentsName.BaseColumn]: {
    [SettingType.Base]: SettingBase,
    [SettingType.DataMap]: BaseSettingData
  },
  [ComponentsName.BaseArea]: {
    [SettingType.Base]: SettingBase,
    [SettingType.DataMap]: BaseSettingData
  },
  [ComponentsName.BaseLine]:{
    [SettingType.Base]: SettingBase,
    [SettingType.DataMap]: BaseSettingData
  },
  [ComponentsName.BasePie]: {
    [SettingType.Base]: SettingBase,
    [SettingType.DataMap]: PieDataMapSetting
  }
}