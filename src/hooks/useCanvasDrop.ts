import { useDrop } from 'react-dnd'
import useComponentsStore from '@/stores/components'
import { ConfigMap } from '@/core/map/configMap'
import { RefObject, useCallback } from 'react'
import useCanvasStore from '@/stores/canvas'
import { nanoid } from 'nanoid'

const positionToFixed = (position: number) => {
  return Number(position.toFixed(0))
}

const useCanvasDrop = (canvasRef: RefObject<HTMLDivElement>) => {
  const addComponent = useComponentsStore(state => state.addComponent)
  const scale = useCanvasStore(state => state.scale)

  const handleDrop = useCallback((item: any, monitor: any) => {
    const { top, left } = canvasRef.current!.getBoundingClientRect()
    const offsetX = monitor.getClientOffset()!.x - left
    const offsetY = monitor.getClientOffset()!.y - top
    
    const component: {
      id: string
      name: string,
      config: any
    } = {
      id: nanoid(12),
      name: item.name,
      config: {
        ...ConfigMap[item.name],
        x: positionToFixed(offsetX * (1 / scale)),
        y: positionToFixed(offsetY * (1 / scale))
      }
    }
    addComponent(component)
  }, [scale, addComponent])

  const [, drop] = useDrop(() => ({
    accept: 'component',
    drop: handleDrop
  }), [handleDrop, scale])

  return {
    drop
  }
}

export default useCanvasDrop