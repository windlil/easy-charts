import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const defineStore = <T>(Store: StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]], [], T>) => create<T>()(devtools(immer(Store)))
