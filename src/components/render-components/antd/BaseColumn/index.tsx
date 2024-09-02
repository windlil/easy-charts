import React, { memo } from 'react'
import { Column } from '@ant-design/charts'

const BaseColumn: React.FC<{
  config: any
}> = memo(({ config }) => {
  return <Column {...config} />
})

export default BaseColumn