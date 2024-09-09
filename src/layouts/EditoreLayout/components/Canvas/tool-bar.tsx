import { ComponentItem } from '@/stores/components'
import { Redo2, Undo2, RotateCcw, Trash2 } from 'lucide-react'
import { FC, memo, useMemo } from 'react'
import useComponentsStore from '@/stores/components'

const ToolBar:FC<{
  curComponent: ComponentItem | null
}> = memo(({ curComponent }) => {
  const deleteComponent = useComponentsStore(state => state.deleteComponent)
  const redo = useComponentsStore(state => state.redo)
  const undo = useComponentsStore(state => state.undo)
  const componentList = useComponentsStore(state => state.componentList)
  const curLinkNode = useComponentsStore(state => state.curLinkNode)

  const undoDisabledStyle: React.CSSProperties = useMemo(() => {
    if (componentList.length === 0) {
      return {
        cursor: 'not-allowed',
        color: '#3f3f46'
      }
    } else {
      return {
        cursor: 'pointer',
        color: ''
      }
    }
  }, [componentList])

  const redoDisabledStyle: React.CSSProperties = useMemo(() => {
    console.log(curLinkNode)
    if (!curLinkNode?.next) {
      return {
        cursor: 'not-allowed',
        color: '#3f3f46'
      }
    } else {
      return {
        cursor: 'pointer',
        color: ''
      }
    }
  }, [componentList, curLinkNode])

  const handleDeleteCurrent = () => {
    if (!curComponent) return
    deleteComponent()
  }

  const handleUnDo = () => {
    undo()
  }

  const handleReDo = () => {
    redo()
  }

  return (
    <div className='w-full h-full flex items-center justify-between px-4'>
      <div className='flex items-center gap-4'>
        <Undo2 className='cursor-pointer w-4 h-4' onClick={handleUnDo} style={undoDisabledStyle} />
        <Redo2 className='cursor-pointer w-4 h-4' onClick={handleReDo} style={redoDisabledStyle}  />
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