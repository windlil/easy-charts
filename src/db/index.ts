import { ComponentItem, LinkNode } from '@/stores/components'
import Dexie, { type EntityTable } from 'dexie'

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

interface ProjectDbStore {
  id: string
  name: string
  desc: string
  createDate: number
}

const db = new Dexie('StoresDatabase') as Dexie & {
  canvas: EntityTable<
    CanvasDbStore,
    'id'
  >,
  project: EntityTable<
    ProjectDbStore,
    'id'
  >,
}

db.version(1).stores({
  canvas: 'id, timestamp, canvasStore',
  project: 'id, name, desc, createDate',
})

export const updateProjectDb = (id: string, name: string, desc: string, createDate: number) => {
  db.project.add({
    id,
    name,
    desc,
    createDate,
  })
}

export const updateCanvasById = async (id: string, updates: Partial<CanvasDbStore>) => {
  try {
    await db.canvas.update(id, updates)
  } catch (error) {
    console.error('Failed to update canvas by id:', error)
  }
}

export const getCanvasById = async (id: string) => {
  try {
    const canvas = await db.canvas.get(id ?? '')
    return canvas
  } catch (error) {
    console.error('Failed to get canvas by id:', error)
    return null
  }
}

export const initComponentsDb = async (id: string, canvasStore: CanvasDbStore['canvasStore']) => {
  const canvas = await getCanvasById(id)
  if (!canvas) {
    db.canvas.add({
      id,
      timestamp: new Date().getTime(),
      canvasStore
    })
  }
}

export const updateComponentsDb = async (id: string, canvasStore: CanvasDbStore['canvasStore']) => {
  if (!id) {
    return
  }

  await updateCanvasById(id, {
    canvasStore
  })
}

export const getProjectsDb = async () => {
  try {
    const projects = await db.project.orderBy('createDate').reverse().toArray()
    return projects
  } catch {
    return []
  }
}

export const removeProjectById = async (id: string) => {
  db.canvas.delete(id)
  db.project.delete(id)
}

export type { CanvasDbStore }
export { db }