import {
  PieChartOutlined, 
  FontSizeOutlined, 
  HeatMapOutlined,
  AppstoreAddOutlined,
  EllipsisOutlined, 
  DatabaseOutlined
} from '@ant-design/icons'
import { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number];

export const mainMenuItems: MenuItem[] = [
  {
    key: 'chart',
    label: '图表',
    icon: <PieChartOutlined />
  },
  {
    key: 'equipment',
    label: '设备',
    icon: <HeatMapOutlined />
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

export const chartMenuItems: MenuItem[] = [
  {
    key: 'all',
    label: '全部',
  },
  {
    key: 'line',
    label: '折线图',
  },
  {
    key: 'columnl',
    label: '柱形图',
  },
  {
    key: 'pie',
    label: '饼形图',
  },
  {
    key: 'dashboard',
    label: '仪表盘',
  },
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
    label: '主题',
    key: 'theme'
  }
]