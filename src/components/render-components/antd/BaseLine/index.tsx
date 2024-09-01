import React from 'react'
import { Line } from '@ant-design/charts'
import { BaseLineDefaultConfig } from '@/core/defaultConfig'

const BaseLine: React.FC = () => {
  
  return <Line {...BaseLineDefaultConfig} />
}

export default BaseLine