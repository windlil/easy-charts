import useComponentsStore, { ComponentItem } from '@/stores/components'
import { Button, Form, Select, message } from 'antd'
import { FC, useEffect, useRef, useState } from 'react' 
import { Editor } from '@monaco-editor/react'
import ApiForm from './components/ApiForm'

export const validateJSON = (json: string, messageApi: any) => {
  try {
    JSON.parse(json)
    return true
  } catch(error){
    messageApi.error('请输入正确的JSON格式数据!')
    return false
  }
}

const DataSetting:FC<{
  curComponent: ComponentItem
}> = ({ curComponent }) => {
  const updateComponent = useComponentsStore(state => state.updateComponent)
  const [source, setSource] = useState(curComponent?.config?.dataSource)
  const [messageApi, messageContext] = message.useMessage()

  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  const handleSelectChange = (key: string) => {
    setSource(key)
  }

  const handleClickSave = () => {
    const json = editorRef.current.getValue()
    const isTrueJson = validateJSON(json, messageApi)
    if (isTrueJson) {
      updateComponent({
        data: JSON.parse(json),
        dataSource: 'static',
      }, curComponent.id)
      messageApi.success('成功更新数据!')
    }
  }

  useEffect(() => {
    setSource(curComponent?.config?.dataSource)
    console.log('刷新了', curComponent?.config?.dataSource)
  }, [curComponent.config.dataSource, curComponent])

  return (
    <div className='px-4'>
      {messageContext}
      <Form>
        <Form.Item className='mb-2' label='数据来源'>
          <Select 
            value={source}
            onChange={handleSelectChange}
            options={[
              {
                value: 'api',
                label: '接口请求',
              },
              {
                value: 'static',
                label: '静态数据'
              }
            ]} 
          />
        </Form.Item>
      </Form>
      <p className='text-xs mb-4'>
        ⚠️ 如果数据的key发生修改，需要重新修改映射
      </p>
      {source === 'static' ? (
      <>
        <Editor
          onMount={handleEditorDidMount}
          theme='vs-dark'
          height={'500px'}
          defaultLanguage='json'
          value={JSON.stringify(curComponent?.config?.data, null, 2)}
          options={{
            minimap: { enabled: false }
          }}
          className='border border-zinc-700'
        />
        <Button onClick={handleClickSave} type='primary' className='w-full mt-4' size='small'>
          保存
        </Button>
      </>) : <ApiForm messageApi={messageApi} curComponent={curComponent} />}
    </div>
  )
}

export default DataSetting