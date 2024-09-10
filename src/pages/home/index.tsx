import { Button, Menu, message, Modal, Popconfirm, Table } from 'antd'
import { Github } from 'lucide-react'
import { AppstoreAddOutlined, SwitcherOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import AddForm from './AddForm'
import { getProjectsDb, removeProjectById } from '@/db'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

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

const Home = () => {
  const [addModal, setAddModal] = useState(false)
  const [projectList, setProjectList] = useState<any[]>([])
  const navigate = useNavigate()
  const [messageApi, messageContext] = message.useMessage()
  
  const columns: any =useMemo(() => ( [
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
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
      render: (text: string) => {
        return (
          <span>{text.length ? text : '...'}</span>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      align: 'center',
      render: (createDate: number) => {
        return (
          <span>{dayjs(createDate).format('YYYY.MM.DD HH:mm:ss')}</span>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      width: 180,
      render: (_: any, record: any) => {
        const toDetail = () => {
          navigate(`/editor?projectId=${record.id}`,{
            state: {
              projectName: record.name,
              projectDesc: record.desc,
            }
          })
        }

        const deleteProject = () => {
          removeProjectById(record.id)
          messageApi.success('成功删除！')
          getList()
        }

        const confirm = () => {
          deleteProject()
        }

        return <div className='flex gap-4 justify-center'>
          <Button type='primary' size={'small'} onClick={toDetail}>进入</Button>
          <Popconfirm
            title='删除项目'
            description='确认删除该项目吗? 项目删除后无法重新恢复！'
            onConfirm={confirm}
            okText='确定'
            cancelText='取消'
            placement='topRight'
          >
            <Button type='primary' danger size={'small'}>删除</Button>
          </Popconfirm>
        </div>
      }
    }
  ]), [])

  const handleAddNewDesign = () => {
    setAddModal(true)
  }

  const getList = async () => {
    const list: any[] = await getProjectsDb()
    list.map((item) => {
      item.key = item.id
    })
    setProjectList(list)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div className='w-full h-full overflow-hidden'>
      {messageContext}
      <Modal title='新建项目' width={380} open={addModal} onCancel={() => setAddModal(false)} footer={null}>
        <AddForm />
      </Modal>
      <div className='flex items-center justify-between px-10 py-3 border-b border-neutral-700'>
        <span>EasyCharts</span>
        <a href='https://github.com/windlil/easy-charts' target='_blank' className='border-2 p-2 rounded-full border-neutral-700 cursor-pointer hover:border-white transition'>
          <Github className='w-4 h-4' />
        </a>
      </div>
      <div className='flex h-full'>
        <div className='flex flex-col items-center h-full p-4 w-40 border-neutral-700 border-r'>
          <Menu defaultSelectedKeys={['design']} items={Items} className='w-full text-center' style={{
            border: 0
          }} />
        </div>
        <div className='flex-1 h-full flex justify-center pt-6'>
          <div className='w-[95%] h-[90%] bg-gray-800/20 rounded-md'>
            <div className='h-12 px-6 flex justify-between items-center border-b border-neutral-700'>
              <span className='font-bold text-sm'>
                现有项目:
              </span>
              <Button onClick={handleAddNewDesign}>
                新建项目
              </Button>
            </div>
            <div className='p-4'>
              <Table pagination={{pageSize: 9}} dataSource={projectList} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home