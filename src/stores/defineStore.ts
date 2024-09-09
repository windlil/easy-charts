import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const defineStore = <T>(Store: StateCreator<T, [['zustand/immer', never], ['zustand/devtools', never]], [], T>) => create<T>()(immer(devtools(Store)))