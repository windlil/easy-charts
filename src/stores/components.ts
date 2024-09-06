import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type ComponentItem = {
  id: string
  name: string
  config: any
}

interface Store {
  componentList: ComponentItem[]
  curComponent: ComponentItem | null
  addComponent: (component: ComponentItem) => void
  setCurComponent: (id: string) => void
  updateComponent: (config: any, id: string) => void
  deleteComponent: () => void
}

const getCurComponentById = (componentList: ComponentItem[], id: string) => {
  return componentList.find(component => component.id === id) ?? null
}

const useComponentsStore = create<Store>()(devtools(immer((set) => ({
  componentList: [],
  curComponent: null,
  addComponent(component) {
    set((state) => {
      state.componentList.push(component)
    })
  },
  setCurComponent(id: string) {
    set(state => {
      state.curComponent = getCurComponentById(state.componentList, id)
    })
  },
  updateComponent(config, id) {
    set(state => {
      if (!state.curComponent) return
      const curComponent = getCurComponentById(state.componentList, id)!
      curComponent.config = {
        ...curComponent?.config,
        ...config,
      }
      state.curComponent = curComponent
    })
  },
  deleteComponent() {
    set((state) => {
      const index = state.componentList.findIndex(component => {
        component.id === state.curComponent?.id
      })
      state.componentList.splice(index, 1)
    })
  }
}))))

export default useComponentsStore