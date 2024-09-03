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
  updateComponent: (config: any) => void
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
  updateComponent(config) {
    set(state => {
      if (!state.curComponent) return
      const curComponent = getCurComponentById(state.componentList, state.curComponent.id)!
      curComponent.config = {
        ...curComponent?.config,
        ...config,
      }
    })
  }
}))))

export default useComponentsStore