import { Menu as AntdMenu } from 'antd'
import styles from './index.module.less'
import { chartMenuItems, mainMenuItems } from './static'

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
      <div className={styles.subMenu}>
        <AntdMenu
          style={{ width: '65px', border: 0 }}
          mode='inline'
          items={chartMenuItems}
        />
      </div>
    </div>
  )
}

export default Menu