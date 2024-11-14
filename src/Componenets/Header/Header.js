import React, { useContext } from 'react'
import { BiCart } from "react-icons/bi";
import classes from "./header.module.css"
import { Link } from "react-router-dom"
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import  LowerHeader from "./LowerHeader"
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';

const Header = () => {
  const [{basket, user}, dispatch] = useContext(DataContext)
  // console.log(basket.length)
  const totalItem = basket?.reduce((amount, item) =>{
    return item.amount + amount
  },0)


  return (
    <section className={classes.fixed}>
        <section className={classes.header_container}>
            <div className={classes.logo_container}>
                {/* logo */}
                <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo"/>
                </Link>
                <div className={classes.delivery}>  
                {/* delivery */}
                <span>
                <SlLocationPin/>
                </span>
                <div>
                  <p>Delivered to</p>
                  <span>Ethiopia</span>
                </div>
              </div> 
            </div>
            <div className={classes.search}>
              {/* search bar */}
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" placeholder='search product'/>
              <BsSearch size={39}/>
            </div>
            {/* right side link */}
            <div className={classes.order}>
              <Link to="/" className={classes.language}>
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="flag"/>
                <select>
                  <option value="">En</option>
                </select>
                </Link>
              {/* three componenets */}
              <Link to={!user && "/auth"}>
                <div>
                  {
                    user?(
                      <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                    </>
                    ):(
                      <>
                    <p>Hello, Sign In</p>
                    <span>Acount & lists</span>
                    </>
                  )}
 
                </div>
              </Link>
              {/* orders */}
              <Link to="/orders">
                <p>returns</p>
                <span>orders</span>
              </Link>
              {/* cart */}
              <Link to='/cart' className={classes.cart} >
              <BiCart size={35} />
              <span>{totalItem}</span>
              </Link>
            </div>
        </section>
        <LowerHeader/>
    </section>
  )
}

export default Header