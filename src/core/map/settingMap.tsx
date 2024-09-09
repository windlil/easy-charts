import { ComponentsName } from '@/core/map/nameMap'
import { BaseColumnSettingConfig } from '../settingConfig/baseColumn'

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

const BaseDataMapSetting= [
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
    [SettingType.Base]: [...SettingBase, BaseColumnSettingConfig],
    [SettingType.DataMap]: BaseDataMapSetting
  },
  [ComponentsName.BaseArea]: {
    [SettingType.Base]: SettingBase,
    [SettingType.DataMap]: BaseDataMapSetting
  },
  [ComponentsName.BaseLine]:{
    [SettingType.Base]: SettingBase,
    [SettingType.DataMap]: BaseDataMapSetting
  },
  [ComponentsName.BasePie]: {
    [SettingType.Base]: SettingBase,
    [SettingType.DataMap]: PieDataMapSetting
  }
}