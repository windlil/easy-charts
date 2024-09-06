import { FC, memo } from 'react'
import { Column } from '@ant-design/charts'

const BaseColumn: FC<{
  config: any
}> = memo(({ config }) => {
  return <Column {...config} />
})

export default BaseColumn