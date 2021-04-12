import axios from 'axios'
import Auth from './Auth'

const INVALID_LOGIN_ERROR_TYPES = ['NoSuchAccount', 'EmailNeedsVerificationError', 'InactiveAccount']

export default () => {

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('idToken')

  axios.interceptors.response.use(response => {
    return response
  },
  error => {

    if (error.response && INVALID_LOGIN_ERROR_TYPES.includes(error.response.data.type)) throw error

    const originalRequest = error.config
    const retries = JSON.parse(localStorage.getItem('retries')) || 0

    const allowRetry = retries <= 1 && (error.response.status === 401 || error.response.status === 403)
    if (allowRetry) {
      localStorage.setItem('retries', retries + 1)

      const auth = new Auth()
      return auth.getGarconToken(localStorage.getItem('accessToken'))
        .then(res => {
          localStorage.setItem('retries', 0)
          const token = res.data.token
          setIdTokenInStorage(token)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          originalRequest.headers['Authorization'] = 'Bearer ' + token
          return axios(originalRequest)
        })
    }

    throw error
  })

  function setIdTokenInStorage(token) {
    localStorage.setItem('idToken', token)
  }
}
