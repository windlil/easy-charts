import BaseArea from '@/components/render-components/antd/BaseArea'
import BaseColumn from '@/components/render-components/antd/BaseColumn'
import BaseLine from '@/components/render-components/antd/BaseLine'
import BasePie from '@/components/render-components/antd/BasePie'
import { ComponentsName } from '../limitType'

export const componentMap = {
  [ComponentsName.BaseColumn]: BaseColumn,
  [ComponentsName.BaseLine]: BaseLine,
  [ComponentsName.BasePie]: BasePie,
  [ComponentsName.BaseArea]: BaseArea
}