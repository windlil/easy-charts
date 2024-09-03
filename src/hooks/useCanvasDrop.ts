import { useDrop } from 'react-dnd'
import useComponentsStore from '@/stores/components'
import { ConfigMap } from '@/core/defaultConfig/ConfigMap'
import { RefObject } from 'react'

const useCanvasDrop = (canvasRef: RefObject<HTMLDivElement>) => {
  const addComponent = useComponentsStore(state => state.addComponent)

  const [, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: any, monitor) => {
      const { top, left } = canvasRef.current!.getBoundingClientRect()
      const offsetX = monitor.getClientOffset()!.x - left
      const offsetY = monitor.getClientOffset()!.y - top
      console.log(top, left, offsetX, offsetY)
      const component: {
        id: string
        name: string,
        config: any
      } = {
        id: String(Math.random()),
        name: item.name,
        config: {
          ...ConfigMap[item.name],
          x: offsetX,
          y: offsetY
        }
      }

      addComponent(component)
    }
  }))

  return {
    drop
  }
}

export default useCanvasDrop