import { ComponentItem } from '@/stores/components'
import { Redo2, Undo2, RotateCcw, Trash2 } from 'lucide-react'
import { FC, memo } from 'react'
import useComponentsStore from '@/stores/components'

const ToolBar:FC<{
  curComponent: ComponentItem | null
}> = memo(({ curComponent }) => {
  const deleteComponent = useComponentsStore(state => state.deleteComponent)

  const handleDeleteCurrent = () => {
    if (!curComponent) return
    deleteComponent()
  }

  return (
    <div className='w-full h-full flex items-center justify-between px-4'>
      <div className='flex items-center gap-4'>
        <Undo2 className='cursor-pointer w-4 h-4' />
        <Redo2 className='cursor-pointer w-4 h-4 text-zinc-700' />
      </div>
      <div className='flex items-center gap-4'>
        <Trash2
          className='w-3 h-3'
          style={{
            color: curComponent ? '' : '#3f3f46',
            cursor: curComponent ? 'pointer' : 'unset'
          }}
          onClick={handleDeleteCurrent}
        />
        <RotateCcw className='cursor-pointer w-3 h-3' />
      </div>
    </div>
  )
})

export default ToolBar