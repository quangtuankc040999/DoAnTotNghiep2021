import React from 'react'
import routers from '../router'
import { Route, Routes , BrowserRouter as Router } from 'react-router-dom'
export default function MainPage() {
  const showContentMenus = (routers) => {
    let result = null;
    if (routers.length > 0) {
      result = routers.map((route, i) => {
        return (<Route
          key={i}
          path={route.path}
          exact={route.exact}
          element={route.main()}
        />)
      })
    }
    return <Routes>{result}</Routes>
  }
  return (
    <Router>
      <div>
        {showContentMenus(routers)}
      </div>
    </Router>

  )
}
