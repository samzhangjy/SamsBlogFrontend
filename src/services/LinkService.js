import Api from '@/services/Api'

export default {
  addLink (credentials) {
    return Api().post('links/add', credentials)
  },
  getAllLinks () {
    return Api().get('links/all')
  },
  getLink (linkId) {
    return Api().get(`links/${linkId}`)
  },
  editLink (linkId, credentials) {
    return Api().post(`links/edit/${linkId}`, credentials)
  },
  deleteLink (linkId) {
    return Api().delete(`links/delete/${linkId}`)
  }
}
