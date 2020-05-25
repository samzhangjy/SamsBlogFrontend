import Api from '@/services/Api'

export default {
  login (credentials) {
    console.log(Api().post('login', credentials))
    return Api().post('login', credentials)
  },
  loginRemember (credentials) {
    return Api().post('login/remember', credentials)
  },
  resetPassword (credentials) {
    return Api().post('login/reset', credentials)
  }
}
