import { ReactNode } from 'react'
import {
  PieChartOutlined, 
  FontSizeOutlined, 
  AppstoreAddOutlined,
  DatabaseOutlined
} from '@ant-design/icons'
import { subMenuItem } from '.'
import { ComponentsName } from '@/core/static/limitType'

interface MainMenuItem {
  key: string
  label: string
  icon?: ReactNode
}

export interface DragComponentItem {
  name: string
  key: ComponentsName
  type: ComponentType
  img: string
}

type ComponentType = 'line' | 'pie' | 'column' | 'area' | 'all'

// 左侧主菜单
export const mainMenuItems: MainMenuItem[] = [
  {
    key: 'chart',
    label: '图表',
    icon: <PieChartOutlined />
  },
  {
    key: 'word',
    label: '文字',
    icon: <FontSizeOutlined />
  },
  {
    key: 'material',
    label: '素材',
    icon: <AppstoreAddOutlined />
  },
  {
    key: 'tree',
    label: '图层',
    icon: <DatabaseOutlined />
  }
]

//二级菜单 - 图表
export const chartMenuItems: subMenuItem[] = [
  {
    key: 'all',
    label: '全部',
  },
  {
    key: 'line',
    label: '折线图',
  },
  {
    key: 'area',
    label: '面积图',
  },
  {
    key: 'column',
    label: '柱形图',
  },
  {
    key: 'pie',
    label: '饼形图',
  },
]

// 二级菜单 - 图层
export const treeMenuItems = [
  {
    key: 'all',
    label: '全部',
  },
  {
    key: 'chart',
    label: '图表',
  },
  {
    key: 'word',
    label: '文字'
  },
  {
    key: 'material',
    label: '素材',
  },
]

// 右侧设置菜单
export const settingAttributeMenuList: MainMenuItem[] = [
  {
    label: '样式',
    key: 'base'
  },
  {
    label: '数据',
    key: 'data',
  },
  {
    label: '映射',
    key: 'dataMap',
  },
  {
    label: '交互',
    key: 'action',
  },
]
