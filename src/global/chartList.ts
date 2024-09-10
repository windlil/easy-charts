import { BaseAreaDragConfig, BaseLineDragConfig, BasePieDragConfig, BaseColumnDragConfig } from '@/core/config'
import { DragComponentItem } from './menu'

// 左侧图表列表
export const ChartList: DragComponentItem[] = [
  BaseLineDragConfig,
  BaseAreaDragConfig,
  BasePieDragConfig,
  BaseColumnDragConfig,
]