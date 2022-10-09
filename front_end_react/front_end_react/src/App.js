import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from './actions/login';
import './App.css';
import HomePage from './pages/HomePage';
// import Products from './pages/products/Products';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.userInfo)

  useEffect(() => {
    const user = {
      email: 'tuan4@gmail.com',
      password: '123456'
    }
    dispatch(loginRequest(user))
  }, [])
useEffect(() => {
  console.log(user);
})
  return (
    <div className="App">
      <HomePage/>
    </div>
  );
}

export default App;
