import styles from './index.module.less'
import Header from './components/Header'
import Left from './components/Left'
import Right from './components/Right'
import Footer from './components/Footer'
import Canvas from './components/Canvas'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { initComponentsDb } from '@/db'
import useComponentsStore, { currentNode } from '@/stores/components'
import useCanvasStore from '@/stores/canvas'

const EditorLayout = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [projectId, setProjectId] = useState<any>(null)
  const componentList = useComponentsStore(state => state.componentList)
  const canvasColor = useCanvasStore(state => state.canvasColor)
  const canvasHeight = useCanvasStore(state => state.canvasHeight)
  const canvasWidth = useCanvasStore(state => state.canvasWidth)

  useEffect(() => {
    // const values = location.state
    const projectId = searchParams.get('projectId')

    console.log('projectId',projectId)

    if (!projectId) {
      return navigate('/home')
    }

    setProjectId(projectId)
    initComponentsDb(projectId as string, {
      componentList,
      canvasColor,
      canvasHeight,
      canvasWidth,
      curLinkNode: currentNode
    })
  }, [])

  return (
    <div className={styles.editorLayout}>
      <header className={styles.editorLayoutHeader}>
        <Header projectId={projectId} />
      </header>
      <div className={styles.editorLayoutContent}>
        <div className={styles.editorLayoutLeft}>
          <Left />
        </div>
        <div className={styles.editorLayoutCenter}>
          <Canvas projectId={projectId} />
        </div>
        <div className={styles.editorLayoutRight}>
          <Right />
        </div>
      </div>
      <footer className={styles.editorLayoutFooter}>
        <Footer projectId={projectId} projectName={location?.state?.projectName} />
      </footer>
    </div>
  )
}

export default EditorLayout