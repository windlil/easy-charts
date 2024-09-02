import { createElement, FC, memo } from 'react'
import { componentMap } from '../componentMap'
import useComponentsStore, { ComponentItem } from '@/stores/components'

const Component:FC<{
  component: ComponentItem
}> = memo(({ component }) => {
  const setCurComponent = useComponentsStore(state => state.setCurComponent)

  const handleClickComponent = (component: ComponentItem) => {
    setCurComponent(component.id)
  }

  return (
    <div
      className='absolute border border-dashed border-transparent hover:border-[#44526bc8]'
      style={{
        left: component.config.x,
        top: component.config.y,
        zIndex: component.config.z,
      }}
      key={Math.random()}
      onClick={() => handleClickComponent(component)}
    >
      {createElement((componentMap as any)[component.name], {config: component.config})}
    </div>
  )
})

export const renderComponents = (components: ComponentItem[]) => {
  return components.map((component) => {
    return (
      <Component component={component} />
    )
  })
}