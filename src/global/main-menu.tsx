import { ReactNode } from 'react'
import {
  PieChartOutlined, 
  FontSizeOutlined, 
  HeatMapOutlined,
  AppstoreAddOutlined,
  DatabaseOutlined
} from '@ant-design/icons'

interface MenuItem {
  key: string
  label: string
  icon?: ReactNode
}

export interface ComponentItem {
  name: string
  key: string
  type: ComponentType
  img: string
}


type ComponentType = 'line' | 'pie' | 'column' | 'dashboard' | 'all'

export const mainMenuItems: MenuItem[] = [
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

export const settingAttributeMenuList: MenuItem[] = [
  {
    label: '基础',
    key: 'base'
  },
  {
    label: '样式',
    key: 'style',
  },
  {
    label: '数据',
    key: 'data',
  },
  {
    label: '映射',
    key: 'dataMap',
  },
]