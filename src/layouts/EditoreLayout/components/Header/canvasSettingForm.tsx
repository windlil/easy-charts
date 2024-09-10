import { FC, useState } from 'react'
import { Form, InputNumber, Switch, Button, ColorPicker } from 'antd'
import useCanvasStore from '@/stores/canvas'

import { ReloadOutlined } from '@ant-design/icons'


const CanvasSettingForm: FC<{
  setIsModalOpen: (value: boolean) => void
  messageApi: any
  form: any
}> = ({ setIsModalOpen, messageApi, form }) => {
  const updateCanvas = useCanvasStore(state => state.updateCanvas)
  const canvasColor = useCanvasStore(state => state.canvasColor)
  const canvasWidth = useCanvasStore(state => state.canvasWidth)
  const canvasHeight = useCanvasStore(state => state.canvasHeight)
  const showLine = useCanvasStore(state => state.showLine)
  const [buttonDisable, setButtonDisable] = useState(true)
  const [color, setColor] = useState(canvasColor)

  const handleFinish = (newProps: any) => {
    updateCanvas({
      ...newProps,
      canvasColor: color
    })
    setIsModalOpen(false)
    messageApi.success('成功修改！')
  }

  const handleReset = () => {
    form.setFieldsValue({
      canvasHeight,
      canvasWidth,
      showLine,
    })
    setColor(canvasColor)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleColorChange = (_: unknown, css: string) => {
    setColor(css)
    setButtonDisable(false)
  }

  return (
    <Form
      className='my-5'
      form={form}
      onFinish={handleFinish}
      onValuesChange={() => setButtonDisable(false)}
    >
      <Form.Item label='宽度' name='canvasWidth'>
        <InputNumber min={800}></InputNumber>
      </Form.Item>
      <Form.Item label='长度' name='canvasHeight'>
        <InputNumber min={600}></InputNumber>
      </Form.Item>
      <Form.Item label='颜色'>
        <ColorPicker value={color} onChange={handleColorChange} showText />
      </Form.Item>
      <Form.Item label='辅助线' name='showLine'>
        <Switch></Switch>
      </Form.Item>
      <div className='w-full flex gap-4 justify-end'>
        <Button icon={<ReloadOutlined />} onClick={handleReset} />
        <Button onClick={handleCancel}>
          取消
        </Button>
        <Button disabled={buttonDisable} type='primary' htmlType='submit'>
          保存
        </Button>
      </div>
    </Form>
  )
}

export default CanvasSettingForm