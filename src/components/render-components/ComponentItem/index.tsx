import { FC } from 'react'

const ComponentItem: FC<{
  name: string
  img: string
}> = ({ name, img }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-[110px] bg-[#1b1b1b] mb-4 text-xs'>
      <span className='w-full p-1 text-gray-400'>
        {name}
      </span>
      <div className='h-[86px]'>
        <img src={img} className='w-full h-full' />
      </div>
    </div>
  )
}

export default ComponentItem