import useComponentsStore, { ComponentItem } from '@/stores/components'
import { Button, Form, Select } from 'antd'
import { FC, useEffect, useMemo } from 'react'
import { SettingMap } from '@/core/static/map/settingMap'
import { nanoid } from 'nanoid'

export const renderDataMapSettingItem = (type: string, options: any) => {
  switch (type) {
    case 'select':
      return <Select options={options} />
  }
}

/**
 * key: name
 * value: name
 * @returns 
 */

const DataMapSetting: FC<{
  curComponent: ComponentItem
}> = ({ curComponent }) => {
  const updateComponent = useComponentsStore(state => state.updateComponent)
  const [form] = Form.useForm()

  const options = useMemo(() => {
    return Object.keys(curComponent.config.data[0]).map(key => {
      return {
        value: key,
        label: key,
      }
    })
  }, [curComponent.config])

  const handleSave = () => {
    updateComponent(form.getFieldsValue(), curComponent.id)
  }

  useEffect(() => {
    form.setFieldsValue(curComponent.config)
  }, [curComponent.config, form])

  return (
    <div className='px-4'>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        size='small'
        form={form}
        labelAlign='left'
      >
        {SettingMap?.[curComponent.name]?.['dataMap'] && 
        SettingMap[curComponent.name]['dataMap'].map((item: any) => (
          <Form.Item name={item.name} className='mb-4' label={item.label} key={nanoid()}>
            {renderDataMapSettingItem(item.type, options)}
          </Form.Item>
        ))}
      </Form>
      <div className='w-full flex justify-center'>
        <Button onClick={handleSave} type='primary' className='w-64 mx-auto'>
          保存
        </Button>
      </div>
    </div>
  )
}

export default DataMapSetting