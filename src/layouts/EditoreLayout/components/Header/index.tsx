import { ScanEye, Save, Laptop, ChevronLeft } from 'lucide-react'
import TextButton from '@/components/view-components/TextButton'
import { FC, useEffect, useState } from 'react'
import { Modal, Form,  message } from 'antd'
import useCanvasStore from '@/stores/canvas'
import useComponentsStore, { LinkNode } from '@/stores/components'
import { currentNode } from '@/stores/components'
import { updateComponentsDb } from '@/db'
import CanvasSettingForm from './canvasSettingForm'
 
const Header:FC<{ projectId: string }> = ({ projectId }) => {
  const canvasWidth = useCanvasStore(state => state.canvasWidth)
  const canvasHeight = useCanvasStore(state => state.canvasHeight)
  const canvasColor = useCanvasStore(state => state.canvasColor)
  const showLine = useCanvasStore(state => state.showLine)
  const componentList = useComponentsStore(state => state.componentList)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form] = Form.useForm()


  const [messageApi, messageContext] = message.useMessage()

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleSave = () => {
    if (componentList.length) {
      updateComponentsDb(projectId, {
        componentList,
        curLinkNode: currentNode,
        canvasWidth,
        canvasHeight,
        canvasColor
      })
    } else {
      updateComponentsDb(projectId, {
        componentList,
        curLinkNode: new LinkNode(),
        canvasWidth,
        canvasHeight,
        canvasColor
      })
    }
    messageApi.success('成功保存！')
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
          <CanvasSettingForm setIsModalOpen={setIsModalOpen} messageApi={messageApi} form={form} />
        </Modal>
        <div className='flex gap-2'>
          <TextButton icon={<ChevronLeft />}></TextButton>
        </div>
        <div className='flex gap-12 items-center'>
          <TextButton icon={<Laptop />} onClick={handleOpenModal}>画布设置</TextButton>
        </div>
        <div>
          <div className='flex gap-2'>
            <TextButton icon={<Save />} onClick={handleSave}>保存</TextButton>
            <TextButton icon={<ScanEye />}>预览</TextButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header