import Api from '@/services/Api'

export default {
  addPost (credentials) {
    return Api().post('post/new', credentials)
  },
  getLatestPosts () {
    return Api().get('post/latest')
  },
  getAllPosts () {
    return Api().get('post/all')
  },
  getPost (postId) {
    return Api().get(`post/get/${postId}`)
  },
  searchPost (credentials) {
    return Api().post('post/search', credentials)
  },
  editPost (postId, credentials) {
    return Api().post(`post/edit/${postId}`, credentials)
  },
  deletePost (postId) {
    return Api().delete(`post/delete/${postId}`)
  }
}
