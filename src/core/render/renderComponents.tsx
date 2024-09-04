import { createElement, FC, memo, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { componentMap } from '../componentMap'
import useComponentsStore, { ComponentItem } from '@/stores/components'
import { nanoid } from 'nanoid'
import Moveable from 'react-moveable'

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
  const updateComponent = useComponentsStore(state => state.updateComponent)

  const [target, setTarget] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = document.querySelector(`[data-componentid="${curComponent?.id}"]`) as HTMLDivElement
    setTarget(el)
  }, [curComponent])
  
  return <>
    {components.map((component) => {
      return (
        <Component component={component} key={component.id} isActive={curComponent?.id === component.id} />
      )
    })}
    <Moveable
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