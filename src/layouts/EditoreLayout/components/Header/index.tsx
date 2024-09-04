import { ScanEye, Save, Laptop, ChevronLeft } from 'lucide-react'
import TextButton from '@/components/view-components/TextButton'
import { useEffect, useRef, useState } from 'react'
import { Modal, Form, InputNumber, Switch, Button, message, ColorPicker } from 'antd'
import useCanvasStore from '@/stores/canvas'
import { ReloadOutlined } from '@ant-design/icons'
 
const Header = () => {
  const canvasColor = useCanvasStore(state => state.canvasColor)
  const canvasWidth = useCanvasStore(state => state.canvasWidth)
  const canvasHeight = useCanvasStore(state => state.canvasHeight)
  const showLine = useCanvasStore(state => state.showLine)
  const updateCanvas = useCanvasStore(state => state.updateCanvas)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(true)
  const [color, setColor] = useState(canvasColor)
  const [form] = Form.useForm()
  const formRef = useRef(null)

  const [messageApi, messageContext] = message.useMessage()

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

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

  const handleColorChange = (_: unknown, css: string) => {
    setColor(css)
    setButtonDisable(false)
  }

  useEffect(() => {
    isModalOpen && form.setFieldsValue({
      canvasHeight,
      canvasWidth,
      showLine,
    })
  }, [form, isModalOpen])

  return (
    <>
      {messageContext}
      <div className='w-full h-full flex items-center justify-between px-4'>
        <Modal
          width={380}
          title='画布设置'
          open={isModalOpen}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            ref={formRef}
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
        </Modal>
        <div className='flex gap-2'>
          <TextButton icon={<ChevronLeft />}></TextButton>
        </div>
        <div>
          <TextButton icon={<Laptop />} onClick={handleOpenModal}>画布设置</TextButton>
        </div>
        <div>
          <div className='flex gap-2'>
            <TextButton icon={<Save />}>保存</TextButton>
            <TextButton icon={<ScanEye />}>预览</TextButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header