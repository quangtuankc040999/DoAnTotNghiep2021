import React from 'react'
import routers from '../router'
import { Route, Routes , BrowserRouter as Router } from 'react-router-dom'
import Navigation from '../components/navigation/Navigation';
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
        <Navigation></Navigation>
        {showContentMenus(routers)}
      </div>
    </Router>

  )
}
