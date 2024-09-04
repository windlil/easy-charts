import { defineStore } from './defineStore'

interface Store {
  canvasWidth: number
  canvasHeight: number
  canvasColor: string
  scale: number
  showLeft: boolean
  showRight: boolean
  showLine: boolean
  updateCanvas: (newProps: any) => void
}

const useCanvasStore = defineStore<Store>((set) => ({
  canvasWidth: 1920,
  canvasHeight: 1080,
  showLeft: true,
  showRight: true,
  scale: 1,
  showLine: true,
  canvasColor: '#363636',
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