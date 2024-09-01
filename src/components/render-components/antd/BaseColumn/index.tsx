import React from 'react'
import { Column } from '@ant-design/charts'
import { BaseColumnConfig } from '@/core/defaultConfig'

const BaseColumn: React.FC = () => {
  return <Column {...BaseColumnConfig} />
}

export default BaseColumn