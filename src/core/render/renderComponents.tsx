import { createElement, FC, memo } from 'react'
import { componentMap } from '../componentMap'
import useComponentsStore, { ComponentItem } from '@/stores/components'

const Component:FC<{
  component: ComponentItem
  isActive: boolean
}> = memo(({ component, isActive }) => {
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
        borderColor: isActive ? '#2196F3' : ''
      }}
      key={Math.random()}
      onClick={() => handleClickComponent(component)}
    >
      {createElement((componentMap as any)[component.name], {config: component.config})}
    </div>
  )
})

export const renderComponents = (components: ComponentItem[]) => {
  const curComponent = useComponentsStore(state => state.curComponent)
  
  return components.map((component) => {
    return (
      <Component component={component} key={component.id} isActive={curComponent?.id === component.id} />
    )
  })
}