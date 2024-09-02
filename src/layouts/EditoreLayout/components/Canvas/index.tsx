import { renderComponents } from '@/core/render/renderComponents'
import useComponentsStore from '@/stores/components'

const Canvas = () => {
  const componentsStore = useComponentsStore(state => state.componentList)

  return (
    <div className='relative'>
      {renderComponents(componentsStore)}
    </div>
  )
}

export default Canvas