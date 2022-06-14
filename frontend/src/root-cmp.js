import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { AppTopHeader } from '../src/cmps/app-top-header.jsx'
import { AppNavHeader } from '../src/cmps/app-nav-header.jsx'
import { AppFooter } from '../src/cmps/app-footer.jsx'
// import { ToyApp } from '../src/pages/toy-app.jsx'
import '../src/assets/scss/main.scss'

import routes from "./routes"

function _App(props) {
  return (
    // <div className="app-container">
    // <div id="app" className="with-new-header">
      <main className="app-container">
      {/* <div className="center-container"> */}
        <AppTopHeader />
        <AppNavHeader />
        {/* <ToyApp /> */}
        <Switch>
          {routes.map(route => (
            <Route path={route.path} exact key={route.path} component={route.component} />
            ))}
        </Switch>
    {/* </div> */}

      <AppFooter />
      </main>
    // </div>
  //  </div>
  )
}

function mapStateToProps(storeState) {
  return {
    // count: storeState.countModule.count,
    // status: storeState.statusModule.status
  }
}

export const App = connect(mapStateToProps)(_App)