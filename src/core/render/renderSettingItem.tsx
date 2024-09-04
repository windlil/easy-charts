import { Input, InputNumber } from 'antd'


const createSettingItem = (type: string) => {
  switch(type) {
    case 'input':
      return <Input />
    case 'number':
      return <InputNumber/>
  }
}

export default createSettingItem