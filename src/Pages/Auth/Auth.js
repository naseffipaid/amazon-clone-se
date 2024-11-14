import React, { useContext, useState } from 'react';
import classes from "./signup.module.css";
import { Link , useNavigate, useLocation} from "react-router-dom";
import { auth } from '../../Utility/firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import { DataContext } from '../../Componenets/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import {ClipLoader} from "react-spinners"



function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const [loading,setLoading] = useState({
    signin:false,
    signup:false 
  })
  const [{ user }, dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const navStateData = useLocation()
  console.log(navStateData)
 
  // console.log(user.emailVerified)

  const authHandler = async(e) =>{
    e.preventDefault()
    // console.log(e.target.name)
    if(e.target.name === "signin") {
      // firebase Auth
      setLoading({...loading, signin:true})
      signInWithEmailAndPassword(auth, email, password)
      .then((userInfo) =>{
        // console.log(userInfo)
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading,signin:false})
        navigate(navStateData?.state?.redirect || "/")
      }).catch((err) =>{
        // console.log(err.message);
        setError(err.message)
        setLoading({...loading, signin:false})
      })
      
    }else{
      setLoading({...loading, signup:true})
      createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo) =>{
        
        // console.log(userInfo)
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading, signup:false})
        navigate(navStateData?.state?.redirect || "/")
      }).catch((err) =>{
        // console.log(err)
        setError(err.message)
        setLoading({...loading, signup:false})
      })
    }
  }

  // console.log(password, email)
  return (
    <section className={classes.login}>
        {/* logo */}
        <Link to="/">
        <img src="https://images.seeklogo.com/logo-png/28/2/amazon-logo-png_seeklogo-286206.png?v=638657107000000000" alt="amazone logo"/>
        </Link>

        {/* form */}
        <div className={classes.login_container}>
          <h1>Sign In</h1>
          {navStateData?.state?.msg && (
            <small style={{
              padding:"5px",
              textAlign:"center",
              color:"red",
              fontWeight:"bold",
            }}>
              
              {navStateData.state.msg}
            </small>
          )}
          <form action="">
            <div>
              <label for="email">Email</label>
              <input value={email} onChange={(e) =>setEmail(e.target.value)} type="email" id='email'/>
            </div>
            <div>
              <label for="password">Password</label>
              <input value={password} onChange={(e) =>setPassword(e.target.value)} type="password" id='password'/>
            </div>
            <button onClick={authHandler} className={classes.login_signin} type='submit' name='signin'>
              {
                loading.signin? (<ClipLoader color="#812323" size={15}/>):("Sign In"

                )
              }
              </button>
          </form>
         {/* agreement */}
         <p>By signing-in you agree to AMAZON FAKE CLONE Conditions of use &
          sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
         </p>

         {/* signup button */}
         <button onClick={authHandler} type='submit' className={classes.login_register} name='signup'>
          {
            loading.signup?(<ClipLoader color="#812323"/>):("Create your Amazone Account")
          }
          </button>
         {
          error && <small style={{paddingTop: "5px", color:"red"}}>
            {error}
          </small>
         }

        </div>
        


    </section>
  )
}

export default Auth;