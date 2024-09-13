import { getCanvasById } from '@/db'
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { renderPreviewComponents } from '@/core/render/renderComponents'
import { ComponentItem } from '@/stores/components'

const Preview = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [componentList, setComponentList] = useState<ComponentItem[]>([])
  const [canvas, setCanvas] = useState<any>({})

  const getComponentList = async (projectId: string) => {
    const canvas = await getCanvasById(projectId)
    setComponentList(canvas?.canvasStore?.componentList ?? [])
    setCanvas({
      canvasWidth: canvas?.canvasStore.canvasWidth,
      canvasHeight: canvas?.canvasStore.canvasHeight,
      canvasColor: canvas?.canvasStore.canvasColor
    })
  }

  useEffect(() => {
    const projectId = searchParams.get('projectId')

    if (!projectId) return
    getComponentList(projectId)

    if (!projectId) {
      return navigate('/home')
    }
  }, [])

  return (
    <div
      className='w-full h-full flex justify-center items-center overflow-hidden'
    >
      <div 
        className='relative'
        style={{
          width: canvas?.canvasWidth,
          height: canvas?.canvasHeight,
          backgroundColor: canvas?.canvasColor
        }}
      >
        {renderPreviewComponents(componentList)}
      </div>
    </div>
  )
}

export default Preview