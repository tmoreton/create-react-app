import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sideBarRoutes } from '../routes'

export class Sidebar extends Component {

  isActive(name) {
    return this.props.activeModule === name ? 'active' : ''
  }

  render() {

    let routes = []
    const roles = this.props.user.roles
    if (roles.length > 0) {
      const roleNames = roles.map(role => role.name)
      routes = sideBarRoutes.map(group => {
        const groupedRoutes = group.routes.filter(route => {
          return roleNames.some(roleName => route.roles.some(routeRole => roleName === routeRole))
        })
        return {
          label: groupedRoutes.length === 0 ? '' : group.label,
          routes: groupedRoutes,
        }
      })
    }

    if (routes.length === 0) return ''

    return (
      <nav className="col-2 px-2 d-none d-md-block bg-light sidebar d-print-none">
        <div className="sidebar-sticky">
          <ul className="nav flex-column ml-2">
            {routes.map((group, i) => (
              <div key={`route-${i}-${group.label}`} className="mb-3">
                <li className="font-weight-bold">{group.label}</li>
                <ul className="list-unstyled">
                  {group.routes.map((route) => (
                    <li key={route.name} className="nav-item">
                      <Link className={'nav-link ' + this.isActive(route.name)} to={route.path}>
                        <FontAwesomeIcon className="feather" icon={route.icon} />
                        {route.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    activeModule: state.activeModule,
  }
}

export default connect(mapStateToProps)(Sidebar)
