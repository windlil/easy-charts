import { renderComponents } from '@/core/render/renderComponents'
import useComponentsStore, { LinkNode } from '@/stores/components'
import Ruler from '@scena/react-ruler'
import { useEffect, useRef } from 'react'
import styles from './index.module.less'
import useRuler from '@/hooks/useRuler'
import useCanvasStore from '@/stores/canvas'
import useCanvasDrop from '@/hooks/useCanvasDrop'
import ToolBar from './tool-bar'
import { CanvasDbStore, db } from '@/db'

const Canvas = () => {
  const setCurComponent = useComponentsStore(state => state.setCurComponent)
  const curComponent = useComponentsStore(state => state.curComponent)
  const initStore = useComponentsStore(state => state.initStore)

  const canvasWidth = useCanvasStore(state => state.canvasWidth)
  const canvasHeight = useCanvasStore(state => state.canvasHeight)
  const canvasColor = useCanvasStore(state => state.canvasColor)
  const updateCanvas = useCanvasStore(state => state.updateCanvas)

  const containerRef = useRef<HTMLDivElement>(null)
  const layoutRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const verticalRulerRef = useRef<Ruler>(null)
  const horizontalRulerRef = useRef<Ruler>(null)


  const { containerMouseDown, handleScale, handlePos, zoom, unit, posX, posY } = useRuler(containerRef, layoutRef, canvasRef)
  const { drop } = useCanvasDrop(canvasRef)

  const handleContainerScroll = () => {
    handlePos()
  }

  const initDb = async() => {
    const store: CanvasDbStore | undefined = await db.canvas.orderBy('timestamp').reverse().first()
    initStore(store?.canvasStore.componentList ?? [], store?.canvasStore?.curLinkNode ?? new LinkNode())
    updateCanvas({
      canvasWidth: store?.canvasStore.canvasWidth ?? canvasWidth,
      canvasHeight: store?.canvasStore.canvasHeight ?? canvasHeight,
      canvasColor: store?.canvasStore.canvasColor ?? canvasColor,
    })
  }

  useEffect(() => {
    initDb()
  },[])

  useEffect(() => {
    handlePos()
    const remove1 = containerMouseDown()
    const remove2 = handleScale()
    window.addEventListener('resize', () => {
      verticalRulerRef.current?.resize()
      horizontalRulerRef.current?.resize()
    })
    window.addEventListener('contextmenu',function(e){
			e.preventDefault()
		})

    return () => {
      remove1()
      remove2()
    }
  }, [])

  return (
    <>
      <div className='bg-[#0f1011] h-7 w-full border-l border-b border-[#363636]'>
        <ToolBar curComponent={curComponent} />
      </div>
      <div className='flex h-full w-full border-l border-[#363636]'>
        <div className='w-[25px] h-full'>
          <div className='bg-[#0f1011] h-[25px] text-xs text-[#6b6b6b] select-none'>
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
              className={`${styles.contentLayout}`}
              style={{
              width: `${canvasWidth * 2}px`,
              height: `${canvasHeight * 2}px`
              }}
              onClick={() => setCurComponent('')}
            >
              <div
                ref={canvasRef}
                style={{
                  width: `${canvasWidth}px`,
                  height: `${canvasHeight}px`,
                  backgroundColor: canvasColor
                }}
                className={`${styles.contentCanvas} canvasContainer`}
              >
                <div ref={drop} className='absolute w-full h-full'>
                  {renderComponents()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Canvas