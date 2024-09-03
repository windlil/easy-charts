import { ScanEye, Save, Laptop, ChevronLeft } from 'lucide-react'
import TextButton from '@/components/view-components/TextButton'
import { useEffect, useState } from 'react'
import { Modal, Form, InputNumber, Switch, Button, message } from 'antd'
import useCanvasStore from '@/stores/canvas'

const Header = () => {
  const canvasWidth = useCanvasStore(state => state.canvasWidth)
  const canvasHeight = useCanvasStore(state => state.canvasHeight)
  const canvasGrid = useCanvasStore(state => state.canvasGrid)
  const updateCanvas = useCanvasStore(state => state.updateCanvas)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(true)
  const [form] = Form.useForm()

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleFinish = (newProps: any) => {
    updateCanvas(newProps)
    setIsModalOpen(false)
    message.success('成功修改！')
  }

  useEffect(() => {
    form.setFieldsValue({
      canvasHeight,
      canvasWidth,
      canvasGrid
    })
  }, [form])

  return (
    <div className='w-full h-full flex items-center justify-between px-4'>
      <Modal
        width={380}
        title='画布设置'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form className='my-5' form={form} onFinish={handleFinish} onValuesChange={() => setButtonDisable(false)}>
          <Form.Item label='宽度' name='canvasWidth'>
            <InputNumber min={800}></InputNumber>
          </Form.Item>
          <Form.Item label='长度' name='canvasHeight'>
            <InputNumber min={600}></InputNumber>
          </Form.Item>
          <Form.Item label='背景网格' name='canvasGrid'>
            <Switch></Switch>
          </Form.Item>
          <div className='w-full flex justify-end'>
            <Button className='mr-4' onClick={handleCancel}>
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
  )
}

export default Header