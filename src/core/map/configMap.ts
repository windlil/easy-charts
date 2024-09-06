import { ComponentsName } from './nameMap'
import { 
  BaseColumnConfig,
  BaseLineDefaultConfig,
  BasePieConfig,
  BaseAreaConfig
} from '../defaultConfig'

export const ConfigMap: Record<string, any> = {
  [ComponentsName.BaseColumn]: BaseColumnConfig,
  [ComponentsName.BaseLine]: BaseLineDefaultConfig,
  [ComponentsName.BasePie]: BasePieConfig,
  [ComponentsName.BaseArea]: BaseAreaConfig,
}