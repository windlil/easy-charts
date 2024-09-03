import { renderComponents } from '@/core/render/renderComponents'
import useComponentsStore from '@/stores/components'
import Ruler from '@scena/react-ruler'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import useRuler from '@/hooks/useRuler'

const Canvas = () => {
  const [width] = useState(800)
  const [height] = useState(600)

  const containerRef = useRef<HTMLDivElement>(null)
  const layoutRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const verticalRulerRef = useRef<Ruler>(null)
  const horizontalRulerRef = useRef<Ruler>(null)

  const componentList = useComponentsStore(state => state.componentList)
  const { containerMouseDown, handleScale, handlePos, zoom, unit, posX, posY } = useRuler(containerRef, layoutRef, canvasRef)


  /**
   * Canvas container scroll event handler 
   */
  const handleContainerScroll = () => {
    handlePos()
  }

  useEffect(() => {
    handlePos()
    const remove1 = containerMouseDown()
    const remove2 = handleScale()
    window.addEventListener('resize', () => {
      verticalRulerRef.current?.resize()
      horizontalRulerRef.current?.resize()
    })

    return () => {
      remove1()
      remove2()
    }
  }, [])

  return (
    <div className='flex h-full w-full border-l border-[#363636]'>
      <div className='w-[25px] h-full'>
        <div className='bg-[#0f1011] h-[25px] text-xs text-[#6b6b6b]'>
          px
        </div>
        <Ruler
          ref={verticalRulerRef}
          type='vertical'
          lineColor={'#363636'}
          textColor={'rgb(156,163,175, 0.8)'}
          backgroundColor={'#0f1011'}
          negativeRuler={true}
          segment={2}
          textOffset={[10, 0]}
          scrollPos={posY}
          zoom={zoom}
          unit={unit}
        />
      </div>
      <div className='h-full flex-1'>
        <div className='h-[25px]'>
          <Ruler
            ref={horizontalRulerRef}
            type='horizontal'
            lineColor={'#363636'}
            textColor={'rgb(156,163,175, 0.8)'}
            backgroundColor={'#0f1011'}
            negativeRuler={true}
            segment={3}
            textOffset={[0, 10]}
            scrollPos={posX}
            zoom={zoom}
            unit={unit}
          />
        </div>
        <div
          ref={containerRef}
          onScroll={handleContainerScroll}
          className={styles.contentContainer}
        >
          <div 
            ref={layoutRef}
            className={styles.contentLayout}
            style={{
            width: `${width * 2}px`,
            height: `${height * 2}px`
            }}
          >
            <div
              ref={canvasRef}
              style={{
                width: `${width}px`,
                height: `${height}px`
              }}
              className={styles.contentCanvas}
            >
              {renderComponents(componentList)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Canvas