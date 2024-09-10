// db.ts
import { ComponentItem, LinkNode } from '@/stores/components'
import Dexie, { type EntityTable } from 'dexie'
import { nanoid } from 'nanoid'

interface ComponentDbStore {
  id: string
  timestamp: number
  componentStore: {
    componentList: ComponentItem[],
    curLinkNode: LinkNode
  }
}

const db = new Dexie('StoresDatabase') as Dexie & {
  components: EntityTable<
    ComponentDbStore,
    'id' // primary key 'id' (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  components: 'id, timestamp, componentStore' // primary key 'id' (for the runtime!)
})

export const updateComponentsDb = (componentList: ComponentItem[], curLinkNode: LinkNode) => {
  db.components.clear()
  db.components.add({
    id: nanoid(),
    timestamp: new Date().getTime(),
    componentStore: {
      curLinkNode,
      componentList
    }
  })
}

export type { ComponentDbStore }
export { db }