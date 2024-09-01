import { createElement } from 'react'
import { componentMap } from '../componentMap'

export const renderComponents = (components: any[]) => {
  return components.map(({ name }) => {
    return createElement((componentMap as any)[name], {key: Math.random()})
  })
}