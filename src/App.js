import './App.css';
import {useDispatch} from "react-redux"
import AppRouter from "./components/AppRouter/AppRouter"
import jwt_decode from "jwt-decode";
import {setAdmin} from "./store/admin/reducer"
import Header from "./components/Header/Header"

function App() {
  const dispatch = useDispatch()
  if (localStorage.getItem('accessToken')) {
    const decoded = jwt_decode(localStorage.getItem('accessToken'))
    dispatch(setAdmin({...decoded}))
  }
  return (
    <div className="App">
      <AppRouter/>
    </div>
  )
}

export default App;
