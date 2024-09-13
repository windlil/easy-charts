import axios from 'axios'

export const request = async (method: 'GET' | 'POST', url: string) => {
  console.log(axios)
  const res = await axios.request({
    method,
    url
  })
  return res
}

// https://assets.antv.antgroup.com/g2/aapl.json