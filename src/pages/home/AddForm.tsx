import { Button, Form, Input } from 'antd'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'
import { updateProjectDb } from '@/db'

const AddForm = () => {
  const navigate = useNavigate()

  const handleFinish = (values: any) => {
    const uid = nanoid()
    console.log(values)
    updateProjectDb(uid, values.projectName, values.projectDesc ?? '', new Date().getTime())
    navigate(`/editor?projectId=${uid}`,{
      state: values
    })
  }

  return (
    <Form className='pt-4' onFinish={handleFinish}>
      <Form.Item 
        name='projectName'
        label='项目名称' 
        rules={[{ required: true, message: '请输入项目名称!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name='projectDesc' label='项目描述' className='ml-2'>
        <Input.TextArea rows={5} />
      </Form.Item>
      <div>
        <Button htmlType='submit' type='primary' className='w-full'>
          创建
        </Button>
      </div>
    </Form>
  )
}

export default AddForm