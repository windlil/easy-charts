import EditorLayout from '@/layouts/EditoreLayout'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const EditorPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <EditorLayout></EditorLayout>
    </DndProvider>
  )
}

export default EditorPage