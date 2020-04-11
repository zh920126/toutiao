import axios from '@/utils/myaxios.js'
export const uploadFile = (file) => {
  return axios({
    method: 'post',
    url: '/upload',
    data: file
  })
}
