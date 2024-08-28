import { ScanEye, Save, Laptop, ChevronLeft } from 'lucide-react'
import TextButton from '@/components/view-components/TextButton'

const Header = () => {
  return (
    <div className='w-full h-full flex items-center justify-between px-4'>
      <div className='flex gap-2'>
        <TextButton icon={<ChevronLeft />}></TextButton>
      </div>
      <div>
        <TextButton icon={<Laptop />}>画布设置</TextButton>
      </div>
      <div>
        <div className='flex gap-2'>
          <TextButton icon={<Save />}>保存</TextButton>
          <TextButton icon={<ScanEye />}>预览</TextButton>
        </div>
      </div>
    </div>
  )
}

export default Header