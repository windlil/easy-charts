import { Area } from '@ant-design/charts'
import { FC } from 'react'

const BaseArea: FC<{
  config: any
}> = ({ config }) => {
  return <Area {...config}/>
}

export default BaseArea