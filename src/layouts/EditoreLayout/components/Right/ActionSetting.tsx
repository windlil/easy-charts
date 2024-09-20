import { Button, Modal } from 'antd'
import { FC, useState } from 'react'
import EventFlow from './components/EventFlow'

const ActionSetting:FC = () => {
  const [open, setOpen] = useState(false)

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div className='w-full px-4'>
      <Button className='w-full' onClick={() => setOpen(true)}>
        打开事件配置
      </Button>
      <Modal
        width='100vw'
        style={{
          maxWidth: '100vw',
          top: 0,
          paddingBottom: 0
        }}
        bodyStyle={{
          height: '100vh'
        }}
        open={open}
        footer={null}
        onCancel={handleCancel}
      >
        <div className='w-full h-full flex justify-center items-center'>
          <EventFlow />
        </div>
      </Modal>
    </div>
  )
}

export default ActionSetting