import axios from 'axios'

export const request = async (method: 'GET' | 'POST', url: string, curComponent?: number) => {
  const res = await axios.request({
    method,
    url
  })
  console.log('resData', res)
  return res
}

// https://assets.antv.antgroup.com/g2/aapl.json