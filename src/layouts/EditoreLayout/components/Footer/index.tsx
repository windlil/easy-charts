import { Switch } from 'antd'
import useCanvasStore from '@/stores/canvas'
import useComponentsStore, { currentNode } from '@/stores/components'
import { MenuFoldOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { updateComponentsDb } from '@/db'
import dayjs from 'dayjs'

const Footer = () => {
  const scale = useCanvasStore(state => state.scale)
  const showRight = useCanvasStore(state => state.showRight)
  const updateCanvas = useCanvasStore(state => state.updateCanvas)
  const componentList = useComponentsStore(state => state.componentList)
  const canvasWidth = useCanvasStore(state => state.canvasWidth)
  const canvasHeight = useCanvasStore(state => state.canvasHeight)
  const canvasColor = useCanvasStore(state => state.canvasColor)

  const [isAutoSave, setIsAutoSave] = useState(true)
  const [lastSaveDate, setLastSavedate] = useState<any>()
  

  const switchSaveHandle = (value: boolean) => {
    if (value) {
      updateComponentsDb({
        componentList,
        curLinkNode: currentNode,
        canvasWidth,
        canvasHeight,
        canvasColor
      })
      setLastSavedate(dayjs().format('YYYY.MM.DD HH:mm:ss'))
    }
    setIsAutoSave(value)
  }

  useEffect(() => {
    let timer: any
    if (isAutoSave) {
      timer = setInterval(() => {
        updateComponentsDb({
          componentList,
          curLinkNode: currentNode,
          canvasWidth,
          canvasHeight,
          canvasColor
        })
        setLastSavedate(dayjs().format('YYYY.MM.DD HH:mm:ss'))
      }, 1000 * 10)
    }
    return () => {
      timer && clearInterval(timer)
    }
  }, [isAutoSave, componentList, canvasWidth, canvasHeight, canvasColor])

  return (
    <>
      <div className='flex gap-4'>
        <div className='flex items-center gap-2 pr-2 border-r border-[#363636]'>
          <Switch size={'small'} value={isAutoSave} onChange={switchSaveHandle} />
          <span>自动保存</span>
          {isAutoSave && lastSaveDate && <span className='text-neutral-500 w-32'>({lastSaveDate})</span>}
        </div>
        <div className='text-gray-400'>
          <span>当前项目：</span>
          <span>大屏数据可视化</span>
        </div>
      </div>
      <div className='flex gap-1'>
        <div className='w-[80px]'>
          <span>缩放：{(scale * 100).toFixed(0)}%</span>
        </div>
        <div className='w-[60px] mr-1'>
          <span>图层：{componentList.length}</span>
        </div>
        <div className='w-[20px]'>
          {!showRight ? <MenuFoldOutlined onClick={() => updateCanvas({showRight: true})} /> : null}
        </div>
      </div>
    </>
  )
}

export default Footer