import { Menu as AntdMenu } from 'antd'
import { settingAttributeMenuList } from '@/global'
import styles from './index.module.less'

const Right = () => {
  return (
    <div className='w-full h-full flex justify-between'>
      <div>

      </div>
      <div className={styles.menuContainer}>
        <AntdMenu
          style={{ width: '100%', border: 0 }}
          items={settingAttributeMenuList}
        />
      </div>
    </div>
  )
}

export default Right