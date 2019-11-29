import axios from 'axios'

export const get = (url) => {
  return axios({
    url,
  })
  .then((result) => {
    return result.data.data
  })
}

export const post = (url, data) => {
  return axios({
    url,
    method: 'POST',
    data
  })
  .then(result => {
    return result.data.data
  })
}