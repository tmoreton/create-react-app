import ReactDOM from 'react-dom'
import Raven from 'raven-js'
import './index.css'
import '@helloinspire/melodic/dist/css/melodic.min.css'
import AxiosInterceptor from './AxiosInterceptor'
import { makeMainRoutes } from './routes'

// if (process.env.NODE_ENV !== 'development') {
//   Raven.config(`${process.env.REACT_APP_SENTRY_DSN}`).install()
// }

AxiosInterceptor()

const routes = makeMainRoutes()

ReactDOM.render(
  routes,
  document.getElementById('root')
)
