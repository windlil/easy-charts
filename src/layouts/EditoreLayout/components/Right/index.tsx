import { Menu as AntdMenu, Form, Input, Empty } from 'antd'
import { settingAttributeMenuList } from '@/global'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import createSettingItem from '@/core/render/renderSettingItem'
import useComponentsStore, { ComponentItem } from '@/stores/components'
import { SettingMap } from '@/core/static/map/settingMap'
import { nanoid } from 'nanoid'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import useCanvasStore from '@/stores/canvas'
import DataSetting from './DataSetting'
import DataMapSetting from './DataMapSetting'

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
  }

  const handleBlur = () => {
    if (curComponent) {
      updateComponent(form.getFieldsValue(), curComponent.id)
    }
  }

  const renderSetting = (curComponent: ComponentItem) => {
    switch(currentSettingKey) {
      case 'data':
        return <DataSetting curComponent={curComponent} />
      case 'dataMap':
        return <DataMapSetting curComponent={curComponent} />
      default:
        return (
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
            {SettingMap?.[curComponent.name]?.[currentSettingKey] && 
            SettingMap[curComponent.name][currentSettingKey].map((item: any) => (
              <Form.Item name={item.name} className='mb-4' label={item.label} key={nanoid()}>
                {createSettingItem(item.type)}
              </Form.Item>
            ))}
          </Form>
        )
    }
  }

  useEffect(() => {
    curComponent && form?.setFieldsValue({
      ...curComponent,
      ...curComponent?.config
    })
  }, [curComponent, form])

  return (
    showRight ? 
    <div className='h-full'>
      <div className={styles.menuContainer}>
        <AntdMenu
          mode='horizontal'
          style={{ width: '100%', border: 0 }}
          items={settingAttributeMenuList}
          onClick={handleClickSettingMenu}
          selectedKeys={[currentSettingKey]}
        />
        <div className='mr-4 cursor-pointer'>
          <MenuUnfoldOutlined onClick={handleClose} className='text-zinc-600' />
        </div>
      </div>
      <div className='w-72 h-full mt-4 overflow-scroll pb-20'>
        {curComponent ? renderSetting(curComponent) : <Empty className='mt-56' image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂未选中任何组件'} />}
      </div>
    </div> : null
  )
}

export default Right