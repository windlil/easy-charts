import { Switch } from 'antd'
import useCanvasStore from '@/stores/canvas'
import useComponentsStore from '@/stores/components'
import { MenuFoldOutlined } from '@ant-design/icons'

const Footer = () => {
  const scale = useCanvasStore(state => state.scale)
  const showRight = useCanvasStore(state => state.showRight)
  const updateCanvas = useCanvasStore(state => state.updateCanvas)
  const componentList = useComponentsStore(state => state.componentList)

  return (
    <>
      <div className='flex gap-4'>
        <div className='flex items-center gap-2 pr-4 border-r border-[#363636]'>
          <Switch checked size={'small'} />
          <span>自动保存</span>
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