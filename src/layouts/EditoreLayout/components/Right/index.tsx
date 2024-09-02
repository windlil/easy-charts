import { Menu as AntdMenu, Form } from 'antd'
import { settingAttributeMenuList } from '@/global'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { renderSettingItem } from '@/core/render/renderSettingItem'
import useComponentsStore from '@/stores/components'
import { SettingMap } from '@/core/settingMap'

const Right = () => {
  const curComponent = useComponentsStore(state => state.curComponent)
  const [currentSettingKey, setCurrentSettingKey] = useState('base')
  const [form] = Form.useForm()

  const handleClickSettingMenu = (items: any) => {
    setCurrentSettingKey(items.key)
  }

  useEffect(() => {
    curComponent && form?.setFieldsValue({
      ...curComponent,
      ...curComponent?.config
    })
  }, [curComponent, form])

  return (
    <div className='w-full h-full flex justify-between'>
      <div className='w-full'>
        <div className='w-full text-sm bg-[#040404] p-4 py-3 border-b border-[#363636] mb-4'>
          基础
        </div>
        {curComponent ?(
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            size='small'
            form={form}
          >
            {SettingMap[curComponent.name]['base'].map(item => (
              <Form.Item name={item.name} className='mb-4' label={item.label} key={Math.random()}>
                {renderSettingItem(item.type)}
              </Form.Item>
            ))}
          </Form>) : null
        }
      </div>
      <div className={styles.menuContainer}>
        <AntdMenu
          style={{ width: '100%', border: 0 }}
          items={settingAttributeMenuList}
          onClick={handleClickSettingMenu}
          selectedKeys={[currentSettingKey]}
        />
      </div>
    </div>
  )
}

export default Right