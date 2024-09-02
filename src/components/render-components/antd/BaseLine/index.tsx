import React from 'react'
import { Line } from '@ant-design/charts'

const BaseLine: React.FC<{
  config: any
}> = ({ config }) => {
  
  return <Line {...config} />
}

export default BaseLine