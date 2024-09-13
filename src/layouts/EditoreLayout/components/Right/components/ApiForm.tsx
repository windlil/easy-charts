import { Button, Form, Input, InputNumber, Modal } from 'antd'
import { validateJSON } from '../DataSetting'
import useComponentsStore from '@/stores/components'
import { request } from '@/request'
import { Editor } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'

const ApiForm = (props: any) => {
  const { messageApi, curComponent } = props
  const [form] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [showRequestTestModal, setShowRequestTestModal] = useState(false)
  const updateComponent = useComponentsStore(state => state.updateComponent)
  const [responseData, setResponseData] = useState<any>(null)
  const getDataButtonRef = useRef<any>(null)

  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  const onFinish = async (values: any) => {
    const { headers, params, url, method, interval } = values
    const stringFunction = editorRef.current.getValue()
    const func = new Function('return ' + stringFunction)()

    let result
    if (headers) {
      result = validateJSON(headers, messageApi)
      if (!result) return
    } 
    if (params) {
      result = validateJSON(params, messageApi)
      if (!result) return
    }

    const data = func(await request(method, url))

    if (!data) return

    updateComponent({
      dataSource: 'api',
      request: {
        url,
        method,
        headers,
        params,
        interval,
        stringFunction,
      },
      data,
    }, curComponent?.id)
    
    messageApi.success('保存成功！')
    setShowModal(false)
  }

  const handleGetDate = async () => {
    if (!curComponent?.config?.request) return
    const { stringFunction, method, url } = curComponent?.config?.request as any
    getDataButtonRef.current.disabled = true

    const func = new Function('return ' + stringFunction)()

    const data = func(await request(method, url))

    setResponseData(JSON.stringify(data))
  }

  const handleOpenTest = () => {
    if (curComponent?.config?.dataSource === 'static') {
      messageApi.warning('请先设置请求方式后再进行测试！')
      return
    }
    setShowRequestTestModal(true)
  }

  useEffect(() => {
    showModal && form?.setFieldsValue(curComponent.config?.request)
  }, [showModal, form, curComponent])

  return (
    <div className='w-full'>
      <Button onClick={() => setShowModal(true)} type='primary' className='w-full'>
        进入设置
      </Button>
      <Button className='w-full mt-4' onClick={handleOpenTest}>
        测试请求
      </Button>
      <Modal
        width={600}
        height={600}
        open={showModal}
        footer={null}
        title={'请求方式设置'}
        onCancel={() => setShowModal(false)}
        className='overflow-scroll'
      >
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item
            label='地址'
            name='url'
            rules={[
              { required: true, message: '请输入请求地址' },
              { type: 'url', message: '请输入有效的URL地址' },
            ]}
          >
            <Input placeholder='请输入请求地址' />
          </Form.Item>

          <Form.Item
            label='方法'
            name='method'
            rules={[
              { required: true, message: '请选择请求方法' },
              {
                pattern: /^(GET|POST)$/i,
                message: '请求方法只能是 GET 或 POST',
              },
            ]}
          >
            <Input placeholder='(POST \ GET)' />
          </Form.Item>

          <Form.Item
            label='请求头'
            name='headers'
          >
            <Input.TextArea placeholder='JSON格式' />
          </Form.Item>
          <Form.Item
            label='请求参数'
            name='params'
          >
            <Input.TextArea placeholder='JSON格式' />
          </Form.Item>
          <Form.Item
            label='轮询间隔(s)'
            name='interval'
          >
            <InputNumber min={0} placeholder='置空为关闭 只在预览页实现功能' />
          </Form.Item>
          <Form.Item label='回调函数'>
            <Editor
              onMount={handleEditorDidMount}
              theme='vs-dark'
              height={'200px'}
              defaultLanguage='javascript'
              defaultValue={`function callback(data) {\n return data?.data \n}`}
              options={{
                minimap: { enabled: false }
              }}
              className='border border-zinc-700'
            />
          </Form.Item>
          <Form.Item>
            <Button size='small' className='w-full' type='primary' htmlType='submit'>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        width={600}
        open={showRequestTestModal}
        onCancel={() => setShowRequestTestModal(false)}
        footer={null}
      >
        <div className='h-[500px] pt-8'>
          <Input.TextArea style={{resize: 'none'}} rows={16} disabled value={responseData}></Input.TextArea>
          <Button ref={getDataButtonRef} className='w-full mt-10' onClick={handleGetDate}>
            发起请求
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ApiForm