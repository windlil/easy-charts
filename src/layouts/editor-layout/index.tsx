import styles from './index.module.less'

const EditorLayout = () => {
  return (
    <div className={styles.editorLayout}>
      <header className={styles.editorLayoutHeader}></header>
      <div className={styles.editorLayoutContent}>
        <div className={styles.editorLayoutLeft}></div>
        <div className={styles.editorLayoutCenter}></div>
        <div className={styles.editorLayoutRight}></div>
      </div>
    </div>
  )
}

export default EditorLayout