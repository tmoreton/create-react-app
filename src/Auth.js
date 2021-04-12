/* global alert: false */
import auth0 from 'auth0-js'
import axios from 'axios'
import get from 'lodash/get'
import history from './history'

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
    clientID: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
    redirectUri: `${process.env.REACT_APP_AUTH0_REDIRECT_URI}`,
    audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email offline_access',
  })

  connection = 'Internal'

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  handleAuthentication(getUser, clearLogIn) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.getGarconToken(authResult.accessToken)
          .then(res => {
            const body = res.data
            const error = body.error || body.errorMessage
            if (error) {
              return this.handleError(error)
            }
            this.setSession(authResult, body.token, getUser)
          }, error => {
            clearLogIn()
            const body = get(error, 'response.data', { error: error.error })
            this.handleError(body.error || body.errorMessage)
          })
      } else {
        history.replace('/')
      }
    })
  }

  handleAuthError(error) {
    const response = (error && error.response) || error || {}
    const message = get(response, 'original.response.body.message') || response.error_description || response.message || response.description
    this.handleError(message)
  }

  handleError(message) {
    localStorage.clear()
    history.replace('/')
    alert(`Something went wrong.\nDetails: ${message}`)
  }

  setSession(authResult, idToken, getUser) {
    localStorage.setItem('expiresAt', this.expiresAt(authResult))
    localStorage.setItem('accessToken', authResult.accessToken)
    localStorage.setItem('idToken', idToken)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + idToken
    this.scheduleRenewal()
    getUser(authResult.idTokenPayload.email)
  }

  login(email, password) {
    this.auth0.login({
      realm: this.connection,
      email,
      password,
    }, (err) => {
      if (err) return this.handleAuthError(err)
    })
  }

  logout() {
    localStorage.removeItem('expiresAt')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    clearTimeout(this.tokenRenewalTimeout)
    history.replace('/')
  }

  signup(email, password) {
    this.auth0.signup({
      connection: this.connection,
      email,
      password,
    }, (err) => {
      if (err) return this.handleAuthError(err)
      alert(`We sent an email to ${email}. Please confirm your email and log in again.`)
    })
  }

  forgotPassword(email) {
    this.auth0.changePassword({
      connection: this.connection,
      email,
    }, function(err, resp) {
      if (err) {
        return this.handleAuthError(err)
      } else {
        return alert(`Succes! ${resp}`)
      }
    })
  }

  getUserInfo(accessToken, getUser) {
    this.auth0.client.userInfo(accessToken, (err, user) => {
      if (!err) {
        getUser(user.email)
      }
    })
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
    return new Date().getTime() < expiresAt
  }

  checkToken(getUser) {
    this.auth0.checkSession({},
      (err, result) => {
        if (err) {
          return this.handleAuthError(err)
        } else {
          localStorage.setItem('accessToken', result.accessToken)
          localStorage.setItem('expiresAt', this.expiresAt(result))
          this.scheduleRenewal()
          this.getUserInfo(result.accessToken, getUser)
        }
      }
    )
  }

  renewTokenTimeout() {
    this.auth0.checkSession({},
      (err, result) => {
        if (err) {
          return this.handleAuthError(err)
        } else {
          localStorage.setItem('accessToken', result.accessToken)
          localStorage.setItem('expiresAt', this.expiresAt(result))
          this.scheduleRenewal()
        }
      }
    )
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
    const delay = expiresAt - Date.now()
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewTokenTimeout()
      }, delay)
    }
  }

  async getGarconToken(accessToken) {
    return axios.post(`${process.env.REACT_APP_GARCON_API}/tokens`, {}, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }

  expiresAt(authResult) {
    return JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
  }
}
