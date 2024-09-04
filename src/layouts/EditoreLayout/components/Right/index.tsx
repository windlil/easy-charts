import { Menu as AntdMenu, Form, Input, Empty } from 'antd'
import { settingAttributeMenuList } from '@/global'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import createSettingItem from '@/core/render/renderSettingItem'
import useComponentsStore from '@/stores/components'
import { SettingMap } from '@/core/settingMap'
import { nanoid } from 'nanoid'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import useCanvasStore from '@/stores/canvas'

const Right = () => {
  const curComponent = useComponentsStore(state => state.curComponent)
  const updateComponent = useComponentsStore(state => state.updateComponent)
  const updateCanvas = useCanvasStore(state => state.updateCanvas)
  const showRight = useCanvasStore(state => state.showRight)

  const [currentSettingKey, setCurrentSettingKey] = useState('base')
  const [form] = Form.useForm()

  const handleClickSettingMenu = (items: any) => {
    if (!showRight) {
      updateCanvas({
        showRight: true
      })
    }
    setCurrentSettingKey(items.key)
  }

  const handleClose = () => {
    updateCanvas({
      showRight: false
    })
    handleClickSettingMenu({key: ''})
  }

  const handleBlur = () => {
    if (curComponent) {
      updateComponent(form.getFieldsValue(), curComponent.id)
    }
  }

  useEffect(() => {
    curComponent && form?.setFieldsValue({
      ...curComponent,
      ...curComponent?.config
    })
  }, [curComponent, form])

  return (
    <div className='h-full flex justify-between'>
      {showRight && <div className='w-60'>
        <div className='flex justify-between w-full text-sm bg-[#040404] p-4 py-3 border-b border-[#363636] mb-4'>
          <span>基础</span>
          <span className='cursor-pointer' onClick={handleClose}>
            <MenuUnfoldOutlined />
          </span>
        </div>
        {curComponent ? <>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            size='small'
            form={form}
            onBlur={handleBlur}
          >
            {currentSettingKey === 'base' && <Form.Item label={'ID'} className='mb-4'>
              <Input disabled value={curComponent.id}></Input>
            </Form.Item>}
            {SettingMap[curComponent.name][currentSettingKey] && 
            SettingMap[curComponent.name][currentSettingKey].map((item: any) => (
              <Form.Item name={item.name} className='mb-4' label={item.label} key={nanoid()}>
                {createSettingItem(item.type)}
              </Form.Item>
            ))}
          </Form>
        </> : <Empty className='mt-56' image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂未选中任何组件'} />}
      </div>}
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