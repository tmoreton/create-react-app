import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Auth from './Auth'
import Main from './components/Main'
import AuthButton from './components/AuthButton'
import Sidebar from './components/Sidebar'

import './App.css'
import 'rodal/lib/rodal.css'
import 'react-table/react-table.css'
import './stylesheets/create-schedule-modal.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserClock,
  faStore,
  faTimes,
  faHandshake,
  faClock,
  faCheck,
  faGlobe,
  faFlask,
  faUserAstronaut,
  faBullhorn,
  faChartPie,
  faMoneyBill,
  faSlidersH,
  faSpinner,
  faChevronDown,
  faChevronUp,
  faHome,
  faDollarSign,
  faTrash,
  faClipboardList,
  faQuestionCircle,
  faTools,
  faUsers,
  faAddressCard,
  faBuilding,
  faKey,
  faCalendar,
  faMapMarker,
  faFlag,
  faCoins,
  faHandHoldingUsd,
  faFile,
  faStreetView,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUserClock,
  faStore,
  faTimes,
  faHandshake,
  faClock,
  faCheck,
  faGlobe,
  faFlask,
  faUserAstronaut,
  faBullhorn,
  faChartPie,
  faMoneyBill,
  faSlidersH,
  faSpinner,
  faChevronDown,
  faChevronUp,
  faHome,
  faDollarSign,
  faTrash,
  faClipboardList,
  faQuestionCircle,
  faTools,
  faUsers,
  faAddressCard,
  faBuilding,
  faKey,
  faCalendar,
  faMapMarker,
  faFlag,
  faCoins,
  faHandHoldingUsd,
  faFile,
  faStreetView,
  faSitemap,
)

class App extends Component {

  render() {

    const auth = new Auth()

    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <Link className="navbar-brand col-1 mr-0 d-flex align-items-center" to="/">
            <img alt="logo" className="pt-1" src="/lumen_white.png" style={{ width: '25%' }} />
            <span className="ml-2" style={{ 'marginTop': '0.1em' }}>Lighthouse</span>
          </Link>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <AuthButton auth={auth} {...this.props} />
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <Main auth={auth}>
              {this.props.children}
            </Main>
          </div>
        </div>
      </div>
    )
  }
}

export default App
