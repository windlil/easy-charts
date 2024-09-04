import { RefObject, useState } from 'react'
import useCanvasStore from '@/stores/canvas'

const useRuler = (containerRef: RefObject<HTMLDivElement>, layoutRef: RefObject<HTMLDivElement>, canvasRef: RefObject<HTMLDivElement>) => {
  const updateCanvas = useCanvasStore(state => state.updateCanvas)

  const [zoom, setZoom] = useState(1)
  const [unit, setUnit] = useState(50)
  const [posX, setPosX] = useState(0)
  const [posY, setPosY] = useState(0)
  let isDraging = false
  let startX: number, startY: number
  let scale = 1

  const handleContainerMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.button !== 2) return 
    isDraging = true
    startX = e.pageX + containerRef.current!.scrollLeft
    startY = e.pageY + containerRef.current!.scrollTop
    layoutRef.current!.addEventListener('mousemove', containerMouseMove)
    layoutRef.current!.addEventListener('mouseup', containerMouseUp)
    layoutRef.current!.addEventListener('mouseleave', containerMouseLeave)
  }

  const containerMouseDown = () => {
    layoutRef.current?.addEventListener('mousedown', handleContainerMouseDown)
    return () => {
      layoutRef.current?.removeEventListener('mousedown', handleContainerMouseDown)
      layoutRef.current?.removeEventListener('mouseleave', containerMouseLeave)
    }
  }

  const containerMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const scrollLeft = startX - e.pageX
    const scrollTop = startY - e.pageY
    containerRef.current!.scrollLeft = scrollLeft
    containerRef.current!.scrollTop = scrollTop
  }

  const containerMouseUp = () => {
    isDraging = false
    layoutRef.current?.removeEventListener('mousemove', containerMouseMove)
    layoutRef.current?.removeEventListener('mouseup', containerMouseUp)
  }
  
  const containerMouseLeave = () => {
    if (isDraging) {
      layoutRef.current?.removeEventListener('mousemove', containerMouseMove)
      layoutRef.current?.removeEventListener('mouseup', containerMouseUp)
      isDraging = false
    }
  }

  // 处理ctrl+滚轮放大缩小画布
  const handleScale = () => {
    const handle = (e: WheelEvent) => {
      e.preventDefault()
      // 判断是否按下ctrl键
      if (e.ctrlKey) {
        if (e.deltaY > 0) {
          scale = scale > 0.5 ? scale - 0.1 : 0.5
          updateCanvas({scale})
          canvasRef.current!.style.scale = String(scale)
        } else {
          scale = scale < 2 ? scale + 0.1 : 2
          updateCanvas({scale})
          canvasRef.current!.style.scale = String(scale)
        }
        setZoom(scale)
        if (1.5 > scale && scale > 0.5 && unit !== 50) {
          setUnit(50)
        } else if (2 > scale && scale > 1.5 || (0.5 > scale)) {
          setUnit(100)
        }
      }
    }
    containerRef.current?.addEventListener('wheel', handle)
    return () => containerRef.current?.removeEventListener('wheel', handle)
  }

  // 处理标尺跟随位移
  const handlePos = () => {
    if (containerRef.current && canvasRef.current) {
      const {top: containerTop, left: containerLeft} = containerRef.current.getBoundingClientRect()
      const {top, left} = canvasRef.current.getBoundingClientRect()

      setPosX(Math.floor((containerLeft - left) / scale))
      setPosY(Math.floor((containerTop - top) / scale))
    }
  }

  return {
    containerMouseDown,
    handleScale,
    zoom,
    unit,
    posX,
    posY,
    handlePos
  }
}

export default useRuler