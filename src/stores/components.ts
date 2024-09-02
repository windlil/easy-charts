import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { BaseColumnConfig, BaseLineDefaultConfig } from '@/core/defaultConfig'

export type ComponentItem = {
  id: string
  name: string
  x: number
  y: number
  z: number
  config: any
}

interface Store {
  componentList: ComponentItem[]
  curComponent: ComponentItem | null
  addComponent: (component: ComponentItem) => void
  setCurComponent: (id: string) => void
}

const mockData: Store['componentList'] = [
  {
    id: '1',
    name: 'BaseLine',
    x: 9,
    y: 9,
    z: 0,
    config: BaseLineDefaultConfig
  },
  {
    id: '2',
    name: 'BaseColumn',
    x: 100,
    y: 100,
    z: 1,
    config: BaseColumnConfig
  },
]

const getCurComponentById = (componentList: ComponentItem[], id: string) => {
  return componentList.find(component => component.id === id) ?? null
}

const useComponentsStore = create<Store>()(immer(devtools((set) => ({
  componentList: mockData,
  curComponent: null,
  addComponent(component) {
    set((state) => {
      state.componentList.push(component)
      return state
    })
  },
  setCurComponent(id: string) {
    set(state => {
      state.curComponent = getCurComponentById(state.componentList, id)
      return state
    })
  }
}))))

export default useComponentsStore