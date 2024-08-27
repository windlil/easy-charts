import styles from './index.module.less'
import Left from './components/Left'

const EditorLayout = () => {
  return (
    <div className={styles.editorLayout}>
      <header className={styles.editorLayoutHeader}></header>
      <div className={styles.editorLayoutContent}>
        <div className={styles.editorLayoutLeft}>
          <Left />
        </div>
        <div className={styles.editorLayoutCenter}></div>
        <div className={styles.editorLayoutRight}></div>
      </div>
    </div>
  )
}

export default EditorLayout