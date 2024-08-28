import { FC, ReactNode } from 'react'
import styles from './index.module.less'

const TextButton: FC<{
  children?: ReactNode
  size?: 'small'
  icon?: ReactNode
}> = ({ children, icon, size }) => {
  return (
    <button
      style={{
        fontSize: size === 'small' ? '12px' : '14px'
      }}
      className={`
      ${styles.icon}
      icon flex
      items-center
      outline-none border-0 bg-transparent
      hover:text-[#1668DC] transition active:text-[#3380ec] mx-1`}
    >
      {icon && (
        <span className='mr-1 w-[18px] h-[18px]'>
          {icon}
        </span>
      )}
      {children && (
        <span>
          {children}
        </span>
      )}
    </button>
  )
}

export default TextButton