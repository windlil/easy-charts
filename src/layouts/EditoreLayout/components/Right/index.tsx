import { Menu as AntdMenu, Form, Input } from 'antd'
import { settingAttributeMenuList } from '@/global'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { renderSettingItem } from '@/core/render/renderSettingItem'
import useComponentsStore from '@/stores/components'
import { SettingMap } from '@/core/settingMap'
import { nanoid } from 'nanoid'

const Right = () => {
  const curComponent = useComponentsStore(state => state.curComponent)
  const updateComponent = useComponentsStore(state => state.updateComponent)
  const [currentSettingKey, setCurrentSettingKey] = useState('base')
  const [form] = Form.useForm()

  const handleClickSettingMenu = (items: any) => {
    setCurrentSettingKey(items.key)
  }

  const handlePropsChange = (values: any) => {
    if (curComponent) {
      updateComponent(values, curComponent.id)
    }
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
        {curComponent ? <>
          <div className='w-full text-sm bg-[#040404] p-4 py-3 border-b border-[#363636] mb-4'>
            基础
          </div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            size='small'
            form={form}
            onValuesChange={handlePropsChange}
          >
            <Form.Item label={'ID'}>
              <Input disabled value={curComponent.id} className='text-xs'></Input>
            </Form.Item>
            {SettingMap[curComponent.name][currentSettingKey] && 
            SettingMap[curComponent.name][currentSettingKey].map((item: any) => (
              <Form.Item name={item.name} className='mb-4' label={item.label} key={nanoid()}>
                {renderSettingItem(item.type)}
              </Form.Item>
            ))}
          </Form>
        </> : null}
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