import React from 'react'
import routers from '../router'
import { Route, Routes , BrowserRouter as Router } from 'react-router-dom'
import Navigation from '../components/navigation/Navigation.jsx';
import { useSelector } from 'react-redux';
export default function MainPage() {
  const cart = useSelector(state => state.cart.cart);

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
        <Navigation cart={cart}></Navigation>
        {showContentMenus(routers)}
      </div>
    </Router>

  )
}
