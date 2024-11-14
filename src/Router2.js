import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Signup from './Pages/Auth/Auth'
import Payement from './Pages/Payement/Payement'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Landing from './Pages/Landing/Landing'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Auth from './Pages/Auth/Auth'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Componenets/ProtectedRoute/ProtectedRoute'
const stripePromise = loadStripe
('pk_test_51QKksDHxC6XUY3cp1lPDckWBlYvPxzOAEmXf1b639iDJwlT19wMmD7zrGTp9CTACblPEkOO6B5hbJ6HcFO87XA6f00vgCdkzug');

function Router2() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/payement' element={
          <ProtectedRoute msg={"you must login to pay"} redirect={"/payement"}>
            <Elements stripe={stripePromise}>
            <Payement/>
          </Elements>
          </ProtectedRoute>
          
          } />
        <Route path='/orders' element={
          <ProtectedRoute msg={"you must login to access your orders"} redirect={"/orders"}>
            <Orders/>
          </ProtectedRoute>
          } />
        <Route path='/category/:categoryName' element={<Results/>} />
        <Route path='/products/:id' element={<ProductDetail/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </Router>
    
  )
}

export default Router2