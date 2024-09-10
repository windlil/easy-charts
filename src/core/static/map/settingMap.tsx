import { BaseAreaSettingConfig, BaseColumnSettingConfig, BaseLineSettingConfig, BasePieSettingConfig } from '@/core/config'
import { ComponentsName } from '../limitType'

export const SettingMap: Record<string, any> = {
  [ComponentsName.BaseColumn]:BaseColumnSettingConfig, 
  [ComponentsName.BaseArea]: BaseAreaSettingConfig,
  [ComponentsName.BaseLine]: BaseLineSettingConfig,
  [ComponentsName.BasePie]: BasePieSettingConfig
}