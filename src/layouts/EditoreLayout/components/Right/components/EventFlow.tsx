import { CommonBaseActionsConfig } from "@/core/config/CommonConfig"
import useComponentsStore from "@/stores/components"
import { Form, Menu, Select } from "antd"
import { useMemo } from "react"


const EventFlow = () => {
  const componentList = useComponentsStore(state => state.componentList)

  const menuItems = useMemo(() => {
    const items = componentList.map((comp) => {
      return {
        label: comp.config.name,
        key: comp.id
      }
    })
    return items
  }, [componentList])

  const renderFormItem = (child: any) => {
    console.log(child)
    return child.map((item: any) => {
      switch(item.type) {
        case 'select':
          return (
            <div key={item.label}>
              <Form.Item name={item.name} label={item.label}>
                <Select options={item.options} />
              </Form.Item>
              {item.childSetting && renderFormItem(item.childSetting)}
            </div>
          )
      }
      return null
    })
  }

  return (
    <div className='w-[95vw] h-[90vh] flex gap-2'>
      <Menu
        items={menuItems}
        style={{
          width: 200,
          height: '100%',
          border: 0
        }}
      />
      <div className='flex-1 p-4 px-20 bg-neutral-800'>
        <Form>
          {renderFormItem(CommonBaseActionsConfig)}
        </Form>
      </div>
    </div>
  )
}

export default EventFlow