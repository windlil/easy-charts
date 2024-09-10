import { ComponentsName } from '../limitType'
import {
  BaseColumnDefaultConfig,
  BaseLineDefaultConfig,
  BasePieDefaultConfig,
  BaseAreaDefaultConfig
} from '@/core/config/index'

export const ConfigMap: Record<string, any> = {
  [ComponentsName.BaseColumn]: BaseColumnDefaultConfig,
  [ComponentsName.BaseLine]: BaseLineDefaultConfig,
  [ComponentsName.BasePie]: BasePieDefaultConfig,
  [ComponentsName.BaseArea]: BaseAreaDefaultConfig,
}