import React, {useState} from 'react';
import classes from './Authorization.module.css'
import {API_URL} from "../../utils/consts"
import {useDispatch, useSelector} from "react-redux"
import {setAdmin} from "../../store/admin/reducer"
import {Navigate} from "react-router-dom"

const Authorization = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authorizeAdmin = (event) => {
    event.preventDefault()
    const request = {
      email,
      password
    }
    fetch(`${API_URL}/admin/authorization`, {
      method: 'POST',
      credentials: 'include',
      redirect: 'follow',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }).then(response => {
      console.log(response)
      if (response.status === 200) {
      }
      return response.json()
    }).then(data => {
      dispatch(setAdmin(data.admin))
      localStorage.setItem('accessToken', data.accessToken)
    })
  }
  if (useSelector(state => state.admin.isAuth)){
    return <Navigate to={'/admin/records'} />
  }
  return (
    <div className={classes.authorization}>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-20 text-center text-3xl font-extrabold text-gray-900">Войти в аккаунт мониторинга</h2>
        </div>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1">
                  <input value={email} onChange={event => setEmail(event.target.value)} id="email" name="email" type="email" autoComplete="email" required=""
                         className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
              </div>
              <div><label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                <div className="mt-1">
                  <input value={password} onChange={event => setPassword(event.target.value)} id="password" name="password" type="password"
                         autoComplete="current-password" required=""
                         className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
              </div>
              <div>
                <button type="submit" onClick={authorizeAdmin}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Войти
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
