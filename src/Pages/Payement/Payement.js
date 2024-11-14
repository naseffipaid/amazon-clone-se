import React, { useContext, useState } from 'react'
import classes from "./payement.module.css"
import Layout from '../../Componenets/Layout/Layout'
import { DataContext } from '../../Componenets/DataProvider/DataProvider'
import ProductCard from "../../Componenets/Product/ProductCard"
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormatter from '../../Componenets/CurrrencyFormat/CurrencyFormatter'
import { axiosInstance } from '../../Api/axios'
import {ClipLoader } from "react-spinners"
import { db } from '../../Utility/firebase'
import { useNavigate } from 'react-router-dom'
import { type } from '@testing-library/user-event/dist/type'
import { Type } from '../../Utility/action.type'


function Payement() {

  const [{basket, user}, dispatch] = useContext(DataContext)
  const totalItem = basket?.reduce((amount, item) =>{
    return item.amount + amount
  },0)

  const total = basket.reduce((amount,item) =>{
    return item.price * item.amount + amount
  },0)

  const [cardError, setCardError] = useState(null)
  const [processing, setProcessing] = useState(false)

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const handleChange = (e) =>{
    console.log(e)
    e?.error?.message? setCardError(e?.error?.message):setCardError("")
  }

  const handlePayment = async(e) =>{
  
    e.preventDefault()
     // backend functions contact to the client secret

    try {
      setProcessing(true)
      const response = await axiosInstance({
        method:"POST",
        url:`/payment/create?total=${total*100}`,
      })
      console.log(response.data)
      const clientSecret = response.data?.clientSecret
// 2. client side , react , confirmation

      const {paymentIntent} = await stripe.confirmCardPayment(
        clientSecret, 
        {
          payment_method:{
            card: elements.getElement(CardElement)
          }
        }
       
      )
      // console.log(paymentIntent)
      // 3. after confirm order firestore database save and clear the bascket

     await db
     .collection("users")
     .doc(user.uid)
     .collection("orders")
     .doc(paymentIntent.id)
     .set({
      basket:basket,
      amount:paymentIntent.amount,
      created:paymentIntent.created
     })
// emptying the basket after payemnt is made and stored in database
       
       dispatch({
        type:Type.EMPTY_BASKET
       })    
  
      setProcessing(false)
      navigate("/orders", {state:{msg:"you have placed new Order"}})
    } catch (error) {
      console.log(error)
      setProcessing(false)
    }
 
   
  }

  return (
    <Layout>
      {/* header */}
        <div className={classes.payment_header}>
          Checkout ({totalItem}) items
        </div>
        {/* payement method */}
        <section className={classes.Payment}>
          {/* address */}
          <div className={classes.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email}</div>
              <div>123 React Lane</div>
              <div> Churchil Road</div>
            </div>
          </div>
          <hr/>

          {/* products */}
          <div className={classes.flex}>
            <h3>Review items and Delivery</h3>
            <div>
              {
                basket?.map((item) =><ProductCard product={item} flex={true}/>)
              }
            </div>
          </div>
          <hr/>

          {/* card form */}
          <div className={classes.flex}>
            <h3>payment methods</h3>
            <div className={classes.payment_card_container}>
              <div className={classes.payment_details}>
                <form onSubmit={handlePayment}>
                  {/* error */}
                {cardError && <small>{cardError}</small>}
                {/* card element */}
                  <CardElement onChange={handleChange}/>

                  {/* price */}
                  <div className={classes.payment_price}>
                    <div>
                      <span style={{display:"flex", gap:"10px"}}>
                        <p>Total order</p> |<CurrencyFormatter amount={total}/>
                      </span>
                    </div>
                    <button type='submit'>
                      {
                        processing? (
                        <div className={classes.loading}>
                        <ClipLoader color='gray' size={15} />
                        <p>Please Wait</p>
                        </div>
                        ):("Pay Now")
                      }
                      
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </section>
    </Layout>
  )
}

export default Payement