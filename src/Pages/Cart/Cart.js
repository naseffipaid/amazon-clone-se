import React, { useContext } from 'react'
import classes from "./cart.module.css"
import Layout from '../../Componenets/Layout/Layout'
import { DataContext } from '../../Componenets/DataProvider/DataProvider'
import ProductCard from '../../Componenets/Product/ProductCard'
import CurrencyFormatter from '../../Componenets/CurrrencyFormat/CurrencyFormatter'
import { Link } from 'react-router-dom'
import { Type } from '../../Utility/action.type'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{basket, user}, dispatch] = useContext(DataContext)
  const total = basket.reduce((amount,item) =>{
    return item.price * item.amount + amount
  },0)
  // console.log(basket)
const increament = (item) =>{
  dispatch({
    type:Type.ADD_TO_BASKET,
    item
  })
}
const decreament = (id) =>{
  dispatch({
    type:Type.REMOVE_FROM_BASKET,
    id
  })
}

  return (
    <Layout>
        <section className={classes.container}>
          <div className={classes.cart_container}>
            <h2>Hello</h2>
            <h3>Your shoping basket</h3>
            <hr/>
            {
              basket?.length===0?(<p>Opps ! No item in your cart</p>):(
                basket?.map((item, i) =>{
                  return <section className={classes.cart_product}>
                    <ProductCard 
                    key={i}
                    product={item}
                    renderDesc={true}
                    flex={true}
                    renderAdd={false}
                    
                  />
                  <div className={classes.btn_container}>
                    <button className={classes.btn} onClick={()=>increament(item)}><IoIosArrowUp size={20}/></button>
                    <span>{item.amount}</span>
                    <button className={classes.btn} onClick={()=>decreament(item.id)}>< IoIosArrowDown size={20}/></button>
                  </div>
                  </section>
                  
                  
                  
                })
              )
            }
          </div>

          {basket?.length !==0&&(
            <div className={classes.subtotal}>
              <div>
                <p>Subtotal ({basket?.length} items)</p>
                <CurrencyFormatter amount={total}/>
              </div>
              <span>
                <input type="checkbox"/>
                <small>this order contains a gift</small>
              </span>
              <Link to="/payement">Continue to checkout</Link>
            </div>
          )}
          
        </section>
    </Layout>
  )
}

export default Cart