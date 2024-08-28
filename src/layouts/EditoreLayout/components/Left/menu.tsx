import { Menu as AntdMenu } from 'antd'
import styles from './index.module.less'
import { chartMenuItems, mainMenuItems } from '@/global/menu'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import ComponentList from './ComponentList'

const Menu = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.mainMenu}>
        <AntdMenu
          style={{ width: '48px', border: 0 }}
          mode='inline'
          items={mainMenuItems}
        />
      </div>
      <div className='w-full'>
        <div className='flex items-center justify-between w-full border-b border-[#3f3f3f] p-4 text-xs'>
          <span>图表列表</span>
          <span className='cursor-pointer'>
            <MenuFoldOutlined />
          </span>
        </div>
        <div className='h-full flex'>
          <div className={styles.subMenu}>
            <AntdMenu
              style={{ width: '65px', border: 0 }}
              mode='inline'
              items={chartMenuItems}
            />
          </div>
          <div className='flex-1 p-3'>
            <ComponentList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu