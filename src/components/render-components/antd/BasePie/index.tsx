import { FC, memo } from 'react'
import { Pie } from '@ant-design/charts'

const BasePie:FC<{ config: any }> = memo(({ config }) => {
  return (
    <Pie {...config} />
  )
})

export default BasePie