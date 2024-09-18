import axios from 'axios'

const Api = axios.create({
  baseURL: '../data/'
})

export default Api
