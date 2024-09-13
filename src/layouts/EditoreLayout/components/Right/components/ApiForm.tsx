import { Button, Form, Input, InputNumber } from 'antd'
import { validateJSON } from '../DataSetting'
import useComponentsStore from '@/stores/components'
import { request } from '@/request'
import { Editor } from '@monaco-editor/react'
import { useEffect, useRef } from 'react'

const ApiForm = (props: any) => {
  const { messageApi, curComponent } = props
  const [form] = Form.useForm()
  const updateComponent = useComponentsStore(state => state.updateComponent)

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
      console.log()
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
  }

  useEffect(() => {
    form.setFieldsValue(curComponent.config?.request)
  }, [])

  return (
    <div className='w-full'>
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
          <InputNumber min={0} placeholder='置空为关闭' />
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
    </div>
  )
}

export default ApiForm