import { defineStore } from './defineStore'

interface Store {
  canvasWidth: number
  canvasHeight: number
  canvasGrid: boolean
  scale: number
  updateCanvas: (newProps: any) => void
}

const useCanvasStore = defineStore<Store>((set) => ({
  canvasWidth: 1920,
  canvasHeight: 1080,
  canvasGrid: false,
  scale: 1,
  updateCanvas(newProps: any) {
    set(state => {
      return {
        ...state,
        ...newProps
      }
    })
  }
}))

export default useCanvasStore