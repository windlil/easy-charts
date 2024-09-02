import { renderComponents } from '@/core/render/renderComponents'
import useComponentsStore from '@/stores/components'

const Canvas = () => {
  const componentList = useComponentsStore(state => state.componentList)

  return (
    <div className='relative'>
      {renderComponents(componentList)}
    </div>
  )
}

export default Canvas