import { FC, memo } from 'react'
import { Line } from '@ant-design/charts'

const BaseLine: FC<{
  config: any
}> = memo(({ config }) => {
  return <Line {...config} />
})

export default BaseLine