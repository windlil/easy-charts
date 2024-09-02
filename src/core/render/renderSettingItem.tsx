import { Input, InputNumber } from 'antd'

export const renderSettingItem = (type: string, options?: any) => {
  switch(type){
    case 'input':
      return <Input></Input>
    case 'number':
      return <InputNumber></InputNumber>
  }
}