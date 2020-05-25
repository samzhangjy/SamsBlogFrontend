import axios from 'axios'
import config from '../config/config'

export default () => {
  // axios.defaults.headers['Kinto-Authorization'] = `${config.serverToken}`
  return axios.create({
    baseURL: config.serverURL
  })
}
