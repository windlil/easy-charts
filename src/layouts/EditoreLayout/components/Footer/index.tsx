import { Switch } from 'antd'

const Footer = () => {
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
          <span>缩放：100%</span>
          <span></span>
        </div>
        <div className='w-[80px]'>
          <span>图层：1000</span>
          <span></span>
        </div>
      </div>
    </>
  )
}

export default Footer