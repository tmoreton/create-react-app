import React, { Component } from 'react'
import history from '../history'
import { connect } from 'react-redux'
import flatten from 'lodash/flatten'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sideBarRoutes } from '../routes'

export class ModuleIndex extends Component {

  render() {
    let routes = []
    const roles = this.props.user.roles
    if (roles.length > 0) {
      const roleNames = roles.map(role => role.name)
      sideBarRoutes.forEach(group => {
        const groupedRoutes = group.routes.filter(route => {
          return roleNames.some(roleName => route.roles.some(routeRole => roleName === routeRole))
        })
        routes.push(groupedRoutes)
      })
      routes = flatten(routes)
    }

    return (
      <div className="container my-5">
        <div className="row">
          {routes.map((route) => (
            <div key={route.name} className="cursor-pointer hover-darken col-md-3 border border-dark rounded text-center p-3 h-100" onClick={() => history.push(route.path) }>
              <FontAwesomeIcon className="text-muted feather h-100" icon={route.icon} size="2x" />
              <h5 className="my-2">{route.name}</h5>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(ModuleIndex)
