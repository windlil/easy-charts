import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { defineStore } from './defineStore'

export type ComponentItem = {
  id: string
  name: string
  config: any
}

export class LinkNode {
  pre: any
  next: any
  componentList: any
  constructor(pre: any = null,next: any = null,componentList: any[] = []) {
    this.pre = pre
    this.next = next
    this.componentList = componentList
  }
}

export let currentNode = new LinkNode()

interface Store {
  previewComponentList: ComponentItem[]
  curHistoryAtEnd: boolean
  componentList: ComponentItem[]
  curComponent: ComponentItem | null
  addComponent: (component: ComponentItem) => void
  setCurComponent: (id: string) => void
  updateComponent: (config: any, id: string) => void
  deleteComponent: () => void
  redo: () => void
  undo: () => void
  initStore: (componentList: ComponentItem[], curLinkNode: LinkNode) => void
  updateCurComponentEvent: (id: string, eventName: string, eventConfig: any) => void
  updatePreviewComponent: (id: string, config: any) => void
  setPreviewComponent: (componentList: ComponentItem[]) => void
}

const getCurComponentById = (componentList: ComponentItem[], id: string) => {
  return componentList.find(component => component.id === id) ?? null
}

const useComponentsStore = defineStore<Store>((set, get) => ({
  previewComponentList: [],
  componentList: [],
  curComponent: null,
  curHistoryAtEnd: false,
  initStore(componentList, curLinkNode) {
    set(state => {
      state.componentList = componentList
      currentNode = curLinkNode
      if (!curLinkNode.next) {
        state.curHistoryAtEnd = true
      }
    })
  },
  updatePreviewComponent(id: string, config: any) {
    set(state => {
      const currentPreviewComponent = getCurComponentById(state.previewComponentList, id)!
      currentPreviewComponent.config = {
        ...currentPreviewComponent?.config,
        ...config,
      }
    })
  },
  setPreviewComponent(componentList) {
    set(state => {
      state.previewComponentList = componentList
    })
  },
  addComponent(component) {
    set((state) => {
      state.componentList.push(component)
      const componentList = [...get().componentList, component]
      const newNode = new LinkNode(currentNode, null, componentList)
      currentNode.next = newNode
      currentNode = newNode
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
    })
  },
  undo() {
    if (currentNode.pre) {
      currentNode = currentNode.pre
      set((state) => {
        state.componentList = currentNode.componentList

        if (!currentNode.next) {
          state.curHistoryAtEnd = true
        } else {
          state.curHistoryAtEnd = false
        }
      })
    }
  },
  redo() {
    if (currentNode.next) {
      currentNode = currentNode.next
      set((state) => {
        state.componentList = currentNode.componentList

        if (!currentNode.next) {
          state.curHistoryAtEnd = true
        } else {
          state.curHistoryAtEnd = false
        }
      })
    }
  },
  updateCurComponentEvent(id, eventName, eventConfig) {
    set((state) => {
      if (!state.curComponent) return
      const curComponent = getCurComponentById(state.componentList, id)!
      if (!curComponent.config.events) {
        curComponent.config.events = {}
      }
      if (!curComponent.config.events[eventName]) {
        curComponent.config.events[eventName] = {}
      }
      curComponent.config.events[eventName] = eventConfig
    })
  }
}))

export default useComponentsStore