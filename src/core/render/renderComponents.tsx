import { createElement, FC, memo, MouseEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import { componentMap } from '../componentMap'
import useComponentsStore, { ComponentItem } from '@/stores/components'
import { nanoid } from 'nanoid'
import Moveable from 'react-moveable'
import useCanvasStore from '@/stores/canvas'

const Component:FC<{
  component: ComponentItem
  isActive: boolean
}> = memo(({ component }) => {
  const setCurComponent = useComponentsStore(state => state.setCurComponent)
  let moveableEl: HTMLElement | null = null
  const componentRef = useRef<HTMLDivElement>(null)

  const handleClickComponent: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setCurComponent(component.id)
  }

  useEffect(() => {
    moveableEl = document.querySelector(`.moveable-control-box-${component.id}`)
  }, [])

  return (
    <>
      <div
        data-componentid={component.id}
        ref={componentRef}
        className='absolute border border-dashed border-transparent hover:border-[#44526bc8]'
        style={{
          transform: `translate(${component.config.x}px,${component.config.y}px)`,
          zIndex: component.config.z,
          // borderColor: isActive ? '#2196F3' : ''
        }}
        key={nanoid()}
        onClick={handleClickComponent}
      >
        {createElement((componentMap as any)[component.name], {config: component.config})}
      </div>
    </>
  )
})

export const renderComponents = (components: ComponentItem[]) => {
  const curComponent = useComponentsStore(state => state.curComponent)
  const componentList = useComponentsStore(state => state.componentList)
  const updateComponent = useComponentsStore(state => state.updateComponent)
  const { canvasWidth, canvasHeight } = useCanvasStore()

  const targetsRef = useRef<any>([])
  const [target, setTarget] = useState<HTMLDivElement | null>(null)

  const verticalGuidelines = useMemo(() => {
    const Lines = new Array(Math.floor(canvasWidth / 100)).fill(0)

    for (let i = 0; i < Lines.length; i++) {
      Lines[i] = i * 100
      if (i === Lines.length - 1) {
        Lines[i] = canvasWidth
      }
    }
    return Lines
  }, [canvasWidth])

  const horizontalGuidelines = useMemo(() => {
    const Lines = new Array(Math.floor(canvasHeight / 100)).fill(0)

    for (let i = 0; i < Lines.length; i++) {
      Lines[i] = i * 100
      if (i === Lines.length - 1) {
        Lines[i] = canvasHeight
      }
    }
    return Lines
  }, [canvasHeight])

  useEffect(() => {
    const result = document.querySelectorAll('[data-componentid]')
    targetsRef.current = Array.from(result)
  }, [componentList])

  useEffect(() => {
    const el = document.querySelector(`[data-componentid='${curComponent?.id}']`) as HTMLDivElement
    setTarget(el)
  }, [curComponent])

  useEffect(() => {

  }, [curComponent])
  
  return <>
    {components.map((component) => {
      return (
        <Component component={component} key={component.id} isActive={curComponent?.id === component.id} />
      )
    })}
    <Moveable
      snappable={true}
      snapThreshold={2}
      verticalGuidelines={verticalGuidelines}
      horizontalGuidelines={horizontalGuidelines}
      elementGuidelines={targetsRef.current}
      elementSnapDirections={{'top':true,'right':true,'bottom':true,'left':true,'center': true, 'middle': true}}
      snapDirections={{'top':true,'right':true,'bottom':true,'left':true,'center': true, 'middle': true}}
      isDisplaySnapDigit={true}
      target={target}
      origin={false}
      edge={false}
      draggable={true}
      resizable={true}
      onDrag={({
        target,
        transform,
      }) => {
        target!.style.transform = transform
      }}
      onDragEnd={({ lastEvent }) => {
        if (!lastEvent?.beforeTranslate) return
        const [x, y] = lastEvent.beforeTranslate as number[]
        updateComponent({
          x,
          y
        }, curComponent!.id)
      }}
      onResize={({width, height}) => {
        target!.style.width = `${width}px`
        target!.style.height = `${height}px`
      }}
      onResizeEnd={({ lastEvent }) => {
        updateComponent({
          width: lastEvent.width,
          height: lastEvent.height
        }, curComponent!.id)
      }}
    />
  </>
}