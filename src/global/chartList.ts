import { DragComponentItem } from './menu'

// const context = import.meta.webpackContext('@/core/config/chart', {
//   recursive: true,
//   regExp: /\.ts$/,
// })

const initChartList = () => {
  const ChartList = []
  const modules: any = import.meta.glob('/src/core/config/chart/**/index.ts',{eager: true})

  for (const key in modules) {
    modules[key]?.DragConfig && ChartList.push(modules[key].DragConfig)
  }

  return ChartList
}

initChartList()

// 左侧图表列表
export const ChartList: DragComponentItem[] = initChartList()