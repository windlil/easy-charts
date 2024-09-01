import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface Store {
  componentList: any[]
}

const useComponentsStore = create<Store>()(immer(devtools((set) => ({
  componentList: []
}))))

export default useComponentsStore