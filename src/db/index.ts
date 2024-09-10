// db.ts
import { ComponentItem, LinkNode } from '@/stores/components'
import Dexie, { type EntityTable } from 'dexie'
import { nanoid } from 'nanoid'

interface CanvasDbStore {
  id: string
  timestamp: number
  canvasStore: {
    componentList: ComponentItem[],
    curLinkNode: LinkNode,
    canvasWidth: number
    canvasHeight: number
    canvasColor: string
  }
}

const db = new Dexie('StoresDatabase') as Dexie & {
  canvas: EntityTable<
    CanvasDbStore,
    'id' // primary key 'id' (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  canvas: 'id, timestamp, canvasStore' // primary key 'id' (for the runtime!)
})

export const updateComponentsDb = (canvasStore: CanvasDbStore['canvasStore']) => {
  db.canvas.clear()
  db.canvas.add({
    id: nanoid(),
    timestamp: new Date().getTime(),
    canvasStore
  })
}

export type { CanvasDbStore }
export { db }