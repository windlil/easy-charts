import React from 'react'
import { Column } from '@ant-design/charts'

const BaseColumn: React.FC<{
  config: any
}> = ({ config }) => {
  return <Column {...config} />
}

export default BaseColumn