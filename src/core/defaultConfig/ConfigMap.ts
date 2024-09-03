import { ComponentsName } from '@/types/components'
import { BaseColumnConfig } from './BaseColumnConfig'
import { BaseLineDefaultConfig } from './BaseLineDefaultConfig'

export const ConfigMap: Record<string, any> = {
  [ComponentsName.BaseColumn]: BaseColumnConfig,
  [ComponentsName.BaseLine]: BaseLineDefaultConfig,
}