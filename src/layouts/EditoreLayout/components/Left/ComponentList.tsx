import ComponentItem from '@/components/render-components/ComponentItem'
import { ChartList } from '@/global/menu'

const ComponentList = () => {

  
  return (
    <div className='w-full h-full'>
      {ChartList.map((chart) => {
        return (
          <ComponentItem name={chart.name} key={chart.key} img={chart.img} />
        )
      })}
    </div>    
  )
}

export default ComponentList