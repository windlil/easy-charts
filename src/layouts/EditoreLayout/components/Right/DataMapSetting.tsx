import { ComponentItem } from '@/stores/components'
import { Button, Form, Select } from 'antd'
import { FC, useMemo, useState } from 'react'
import { SettingMap } from '@/core/settingMap'
import { nanoid } from 'nanoid'

const createSettingItem = (type: string, key: string, field?: any[]) => {
  const defaultValue = field?.map((item) => {
    if (item.key === key) {
      console.log(item.value)
    }
  })
  switch(type) {
    case 'select':
      return <Select options={field} defaultValue={defaultValue}  />
    default:
      return null
  }
}

const DataMapSetting: FC<{
  curComponent: ComponentItem
}> = ({ curComponent }) => {
  const [form] = Form.useForm()
  const [data] = useState(curComponent.config.data)
  const optionsList: any[] = [Object.keys(data[0])][0]

  const fields = useMemo(() => {
    const xField = curComponent.config.xField
    const yField = curComponent.config.yField
    return [
      {
        value: xField,
        key: xField,
      },
      {
        value: yField,
        key: yField
      }
    ]
  }, [curComponent])

  return (
    <div className='px-4'>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        size='small'
        form={form}
        labelAlign='left'
      >
        {SettingMap[curComponent.name]['dataMap'] && 
        SettingMap[curComponent.name]['dataMap'].map((item: any) => (
          <Form.Item name={item.name} className='mb-4' label={item.label} key={nanoid()}>
            {/* {createSettingItem(item.type, item.key, fields)} */}
          </Form.Item>
        ))}
      </Form>
      <div className='w-full flex justify-center'>
        <Button type='primary' size='small' className='w-64 mx-auto'>
          保存
        </Button>
      </div>
    </div>
  )
}

export default DataMapSetting