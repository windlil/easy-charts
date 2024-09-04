import { FC, useMemo } from 'react'
import useComponentsStore from '@/stores/components'

const TreeList:FC<{
  curSelectedType: string
}> = ({ curSelectedType }) => {
  const componentList = useComponentsStore(state => state.componentList)
  const curComponent = useComponentsStore(state => state.curComponent)
  const setCurComponent = useComponentsStore(state => state.setCurComponent)

  const renderComponents = useMemo(() => {
    if (curSelectedType === 'all') {
      return componentList
    }
    return componentList.filter(comp => {
      return comp.config.componentType === curSelectedType
    })
  }, [componentList, curSelectedType])

  const handleItemClick = (id: string) => {
    if (id === curComponent?.id) return
    setCurComponent(id)
  }

  return (
    <div className='w-full'>
      {renderComponents?.map(component => (
        <div
          key={component.id}
          className='px-2 py-1 
          transition-all
          mb-2 text-xs cursor-pointer
          bg-[#343434] rounded-sm hover:bg-[#274f93] hover:text-white'
          style={{
            backgroundColor: curComponent?.id === component.id ? '#274f93' : ''
          }}
          onClick={() => handleItemClick(component.id)}
        >
          {component.config.name}
        </div>
      ))}
    </div>
  )
}

export default TreeList