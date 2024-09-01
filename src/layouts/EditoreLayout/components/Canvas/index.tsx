import { renderComponents } from '@/core/render/renderComponents'

const components = [
  {
    name: 'BaseColumn'
  },
  {
    name: 'BaseLine'
  }
]

const Canvas = () => {
  return (
    <div>
      {renderComponents(components)}
    </div>
  )
}

export default Canvas