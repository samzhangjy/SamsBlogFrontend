import Api from '@/services/Api'

export default {
  getAllTags () {
    return Api().get('tags/all')
  },
  getTag (tagName) {
    return Api().get(`tags/${tagName}`)
  }
}
