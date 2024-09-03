import ComponentItem from '@/components/render-components/ComponentItem'
import { ComponentItem as ComponentItemType } from '@/global'
import { FC, useMemo } from 'react'

const ComponentList:FC<{
  curSelectedType: string
  componentArray: ComponentItemType[] | []
}> = ({ curSelectedType, componentArray }) => {
  const renderList = useMemo(() => {
    if (curSelectedType === 'all') {
      return componentArray
    } else {
      return componentArray.filter(comp => comp.type === curSelectedType)
    }
  }, [curSelectedType, componentArray])

  return (
    <div className='w-full h-full'>
      {renderList.length ? renderList.map(comp => (
        <ComponentItem name={comp.name} id={comp.key} key={comp.key} img={comp.img} />
      )) : null}
    </div>    
  )
}

export default ComponentList