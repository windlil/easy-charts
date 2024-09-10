import { Button, Menu, Modal, Table } from 'antd'
import { AlignCenter, Github } from 'lucide-react'
import { AppstoreAddOutlined, SwitcherOutlined } from '@ant-design/icons'
import { useState } from 'react'
import AddForm from './AddForm'

const Items = [
  {
    label: '现有项目',
    key: 'design',
    icon: <AppstoreAddOutlined />
  },
  {
    label: '开发模版',
    key: 'template',
    icon: <SwitcherOutlined />
  }
]

const dataSource = [
  {
    key: '1',
    name: '大屏可视化1',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '大屏可视化2',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]

const columns: any = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text: any, record: any, index: number) => `${index + 1}`,
    align: 'center',
  },
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    width: 180,
    render: () => {
      return <div className='flex gap-4 justify-center'>
        <Button type='primary' size={'small'}>进入</Button>
        <Button type='primary' danger size={'small'}>删除</Button>
      </div>
    }
  }
]
const Home = () => {
  const [addModal, setAddModal] = useState(false)

  const handleAddNewDesign = () => {
    setAddModal(true)
  }

  return (
    <div className='w-full h-full overflow-hidden'>
      <Modal title='新建项目' width={380} open={addModal} onCancel={() => setAddModal(false)} footer={null}>
        <AddForm />
      </Modal>
      <div className='flex items-center justify-between px-10 py-3 border-b border-neutral-700'>
        <span>EasyCharts</span>
        <span className='border-2 p-2 rounded-full border-neutral-700 cursor-pointer hover:border-white transition'>
          <Github className='w-4 h-4' />
        </span>
      </div>
      <div className='flex h-full'>
        <div className='flex flex-col items-center h-full p-4 w-40 border-neutral-700 border-r'>
          <Menu defaultSelectedKeys={['design']} items={Items} className='w-full text-center' style={{
            border: 0
          }} />
        </div>
        <div className='flex-1 h-full flex justify-center pt-6'>
          <div className='w-[95%] h-[90%] bg-white/10 rounded-md'>
            <div className='h-12 px-6 flex justify-between items-center border-b border-neutral-700'>
              <span className='font-bold text-sm'>
                现有项目:
              </span>
              <Button onClick={handleAddNewDesign}>
                新建项目
              </Button>
            </div>
            <div className='p-4'>
              <Table dataSource={dataSource} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home