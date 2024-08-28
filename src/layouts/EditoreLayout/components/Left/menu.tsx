import { Menu as AntdMenu } from 'antd'
import styles from './index.module.less'
import { ChartList, chartMenuItems, mainMenuItems } from '@/global'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import ComponentList from './ComponentList'
import { useMemo, useState } from 'react'

const Menu = () => {
  const [mainMenuSelectedKey, setMainMenuSelectedKey] = useState('chart')
  const [subMenuSelectedKey, setSubMenuSelectedKey] = useState('all')

  const menuData = useMemo<{
    title: string
    subMenuItems: any[]
    showComponent: any
  }>(() => {
    switch(mainMenuSelectedKey) {
      case 'chart':
        return {
          title: '组件列表',
          subMenuItems: chartMenuItems,
          showComponent: <ComponentList componentArray={ChartList} curSelectedType={subMenuSelectedKey} />
        }
      case 'equipment':
        return {
          title: '设备列表',
          subMenuItems:[],
          showComponent: <ComponentList componentArray={[]} curSelectedType={subMenuSelectedKey} />
        }
      case 'word':
        return {
          title: '文字组件',
          subMenuItems: [],
          showComponent: <ComponentList componentArray={[]} curSelectedType={subMenuSelectedKey} />
        }
      case 'material':
        return {
          title: '素材列表',
          subMenuItems: [],
          showComponent: <ComponentList componentArray={[]} curSelectedType={subMenuSelectedKey} />
        }
      case 'tree':
        return {
          title: '图层',
          subMenuItems: [],
          showComponent: <ComponentList componentArray={[]} curSelectedType={subMenuSelectedKey} />
        }
      default:
        return {
          title: '',
          subMenuItems: [],
          showComponent: <ComponentList componentArray={[]} curSelectedType={subMenuSelectedKey} />
        } 
    }
  }, [mainMenuSelectedKey, subMenuSelectedKey])

  const handleMainMenuClick = (items: { key: string }) => {
    setMainMenuSelectedKey(items.key)
    setSubMenuSelectedKey('all')
  }

  const handleSubMenuClick = (items: { key: string }) => {
    setSubMenuSelectedKey(items.key)
  }

  return (
    <div className={styles.menu}>
      <div className={styles.mainMenu}>
        <AntdMenu
          selectedKeys={[mainMenuSelectedKey]}
          style={{ width: '48px', border: 0 }}
          mode='inline'
          items={mainMenuItems}
          onClick={handleMainMenuClick}
        />
      </div>
      <div className='w-full'>
        <div className='flex items-center justify-between w-full border-b border-[#3f3f3f] p-4 text-xs'>
          <span>
            {menuData.title}
          </span>
          <span className='cursor-pointer'>
            <MenuFoldOutlined />
          </span>
        </div>
        <div className='h-full flex'>
          <div className={styles.subMenu}>
            <AntdMenu
              style={{ width: '65px', border: 0 }}
              mode='inline'
              items={menuData.subMenuItems}
              onClick={handleSubMenuClick}
              selectedKeys={[subMenuSelectedKey]}
            />
          </div>
          <div className='flex-1 p-3'>
            {menuData.showComponent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu