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
    console.log(items)
    return items
  }, [componentList])

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
        <Form.Item label='点击事件'>
          <Select></Select>
        </Form.Item>
      </div>
    </div>
  )
}

export default EventFlow