import { ComponentsName } from '@/types/components'

const enum SettingType {
  Base = 'base',
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

export const SettingMap: Record<string, any> = {
  [ComponentsName.BaseColumn]: {
    [SettingType.Base]: SettingBase,
  },
  [ComponentsName.BaseLine]:{
    [SettingType.Base]: SettingBase,
  }
}