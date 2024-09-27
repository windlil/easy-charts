import useComponentsStore from '@/stores/components'
import { Editor } from '@monaco-editor/react'
import { Modal } from 'antd'
import useMessage from 'antd/es/message/useMessage'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

export const validateJSON = (json: string, messageApi: any) => {
  try {
    JSON.parse(json)
    return true
  } catch(error){
    messageApi.error('请输入正确的JSON格式数据!')
    return false
  }
}

const CustomerConfigModal = forwardRef((_, ref) => {
  const curComponent = useComponentsStore(state => state.curComponent)
  const [show, setShow] = useState(false)
  const [messageApi, messageContext] = useMessage()
  const updateComponent = useComponentsStore(state => state.updateComponent)
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  const handleOk = () => {
    if (!editorRef.current) return
    const json = editorRef.current.getValue()
    const isTrueJson = validateJSON(json, messageApi)

    if (isTrueJson) {
      updateComponent(JSON.parse(json), curComponent!.id)
      messageApi.success('更新成功')
    }
  }

  useImperativeHandle(ref,() => ({
    handleShow() {
      setShow(true)
    }
  }))

  return (
    <Modal 
      open={show}
      width={800}
      onCancel={() => setShow(false)}
      onOk={handleOk}
      title='自定义配置'
      okText='确定'
      cancelText='取消'
    >
      {messageContext}
      <Editor
        onMount={handleEditorDidMount}
        theme='vs-dark'
        height={'500px'}
        defaultLanguage='json'
        value={JSON.stringify(curComponent?.config, null, 2)}
        options={{
          minimap: { enabled: false }
        }}
        className='border border-zinc-700'
      />
    </Modal>
  )
})

export default CustomerConfigModal