import React, { memo } from 'react'
import { Line } from '@ant-design/charts'

const BaseLine: React.FC<{
  config: any
}> = memo(({ config }) => {
  return <Line {...config} />
})

export default BaseLine