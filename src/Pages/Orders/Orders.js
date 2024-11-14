import React , {useContext, useEffect, useState} from 'react'
import classes from "./orders.module.css"
import Layout from '../../Componenets/Layout/Layout'
import { db } from '../../Utility/firebase'
import { DataContext } from '../../Componenets/DataProvider/DataProvider'
import ProductCard from '../../Componenets/Product/ProductCard'

function Orders() {

  const [{user}, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([])

  useEffect(() =>{
    if(user){
      db.collection("users").doc(user.uid).collection("orders").orderBy("created", "desc").onSnapshot((snaphot) =>{
        console.log(snaphot)
        
        setOrders(
          snaphot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data()
          }))
        )
      })
    }else{
      setOrders([])
    }
  },[])


  return (
    <Layout>
        <section className={classes.container}>
          <div className={classes.orders_container}>
            <h2>Your Orders</h2>
            {orders?.length === 0 && <div style={{padding:"20px"}}>
              you don't have orders yet
              </div>

            }
            {/* ordered Items */}
            <div>
              {
                orders?.map((eachOrder, i) =>{

                  return (
                    <div key={i} >
                      <hr/>
                      <p>Order ID: {eachOrder.id}</p>
                      {
                        eachOrder?.data?.basket?.map(order=>{
                          return <ProductCard
                             flex={true}
                             product={order}
                             key={order.id}
                            
                          />
                        })
                      }

                    </div>
                  )
                })
              }
            </div>
          </div>
        </section>
    </Layout>
  )
}

export default Orders