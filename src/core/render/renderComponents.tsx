import { createElement } from 'react'
import { componentMap } from '../componentMap'
import useComponentsStore, { ComponentItem } from '@/stores/components'

export const renderComponents = (components: ComponentItem[]) => {
  const curComponent = useComponentsStore(state => state.curComponent)
  const setCurComponent = useComponentsStore(state => state.setCurComponent)

  const handleClickComponent = (component: ComponentItem) => {
    setCurComponent(component.id)
  }

  return components.map((component) => {
    return (
      <div
        className='absolute border border-dashed border-transparent hover:border-[#44526bc8]'
        style={{
          left: component.x,
          top: component.y,
          zIndex: component.z,
          borderColor: curComponent?.id === component.id ? '#3c7cec' : ''
        }}
        key={Math.random()}
        onClick={() => handleClickComponent(component)}
      >
        {createElement((componentMap as any)[component.name], {config: component.config})}
      </div>
    )
  })
}