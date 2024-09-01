import styles from './index.module.less'
import Header from './components/Header'
import Left from './components/Left'
import Right from './components/Right'
import Footer from './components/Footer'
import Canvas from './components/Canvas'

const EditorLayout = () => {
  return (
    <div className={styles.editorLayout}>
      <header className={styles.editorLayoutHeader}>
        <Header />
      </header>
      <div className={styles.editorLayoutContent}>
        <div className={styles.editorLayoutLeft}>
          <Left />
        </div>
        <div className={styles.editorLayoutCenter}>
          <Canvas />
        </div>
        <div className={styles.editorLayoutRight}>
          <Right />
        </div>
      </div>
      <footer className={styles.editorLayoutFooter}>
        <Footer />
      </footer>
    </div>
  )
}

export default EditorLayout