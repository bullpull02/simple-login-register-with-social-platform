import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import SignUp from './pages/signup'

export const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Dashboard />} path='/' />
        <Route element={<Login />} path='/auth/login' />
        <Route element={<SignUp />} path='/auth/signup' />
      </Routes>
    </>
  )
}