import { FC } from 'react'
import { useDrag } from 'react-dnd'

const ComponentItem: FC<{
  name: string
  img: string
  id: string
}> = ({ name, img, id }) => {
  const [, drag] = useDrag(() => ({
    type: 'component',
    item: {
      name: id,
    },
  }))

  return (
    <div ref={drag} className='flex flex-col justify-center items-center w-full h-[110px] bg-[#1b1b1b] mb-4 text-xs'>
      <span className='w-full p-1 text-gray-400'>
        {name}
      </span>
      <div className='h-[86px]'>
        <img draggable={false} src={img} className='w-full h-full' />
      </div>
    </div>
  )
}

export default ComponentItem