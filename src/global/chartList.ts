import { DragComponentItem } from './menu'

const context = import.meta.webpackContext('@/core/config/chart', {
  recursive: true,
  regExp: /\.ts$/,
})

const initChartList = () => {
  const ChartList = []
  for (const path of context.keys()) {
    const mod: any = context(path)
    // ChartList.push(mod?.DragConfig)
    mod?.DragConfig && ChartList.push(mod?.DragConfig)
  }
  return ChartList
}

initChartList()

// 左侧图表列表
export const ChartList: DragComponentItem[] = initChartList()