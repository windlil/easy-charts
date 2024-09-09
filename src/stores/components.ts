import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type ComponentItem = {
  id: string
  name: string
  config: any
}

class LinkNode {
  pre: any
  next: any
  componentList: any
  constructor(pre: any = null,next: any = null,componentList: any[] = []) {
    this.pre = pre
    this.next = next
    this.componentList = componentList
  }
}

let currentNode = new LinkNode()

interface Store {
  componentList: ComponentItem[]
  curComponent: ComponentItem | null
  curLinkNode: LinkNode
  addComponent: (component: ComponentItem) => void
  setCurComponent: (id: string) => void
  updateComponent: (config: any, id: string) => void
  deleteComponent: () => void
  redo: () => void
  undo: () => void
}

const getCurComponentById = (componentList: ComponentItem[], id: string) => {
  return componentList.find(component => component.id === id) ?? null
}

const useComponentsStore = create<Store>()(devtools(immer((set, get) => ({
  componentList: [],
  curComponent: null,
  curLinkNode: {
    pre: null,
    next: null,
    componentList: []
  },
  addComponent(component) {
    set((state) => {
      state.componentList.push(component)
      const componentList = [...get().componentList, component]
      const newNode = new LinkNode(currentNode, null, componentList)
      currentNode.next = newNode
      currentNode = newNode
      state.curLinkNode = currentNode
    })
  },
  setCurComponent(id: string) {
    set(state => {
      state.curComponent = getCurComponentById(state.componentList, id)
    })
  },
  updateComponent(config, id) {
    set((state) => {
      if (!state.curComponent) return
      const curComponent = getCurComponentById(state.componentList, id)!
      curComponent.config = {
        ...curComponent?.config,
        ...config,
      }
      state.curComponent = curComponent

      const componentList = structuredClone(get().componentList)
      const _curComponent = getCurComponentById(componentList, id)!
      _curComponent.config = {
        ..._curComponent?.config,
        ...config,
      }
      const newNode = new LinkNode(currentNode, null, componentList)
      currentNode.next = newNode
      currentNode = newNode
      state.curLinkNode = currentNode
    })
  },
  deleteComponent() {
    set((state) => {
      const index = state.componentList.findIndex(component => {
        component.id === state.curComponent?.id
      })
      state.componentList.splice(index, 1)
      const componentList = [...get().componentList]
      const newNode = new LinkNode(currentNode, null, componentList.splice(index, 1))
      currentNode.next = newNode
      currentNode = newNode
      state.curLinkNode = currentNode
    })
  },
  undo() {
    if (currentNode.pre) {
      currentNode = currentNode.pre
      set((state) => {
        state.componentList = currentNode.componentList
        state.curLinkNode = currentNode
      })
    }
  },
  redo() {
    if (currentNode.next) {
      currentNode = currentNode.next
      set((state) => {
        state.componentList = currentNode.componentList
        state.curLinkNode = currentNode
      })
    }
  },

}))))

export default useComponentsStore