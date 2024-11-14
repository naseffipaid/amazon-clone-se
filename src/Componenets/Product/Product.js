import React, { useEffect, useState } from 'react'
import axios from "axios"
import  ProductCard from "./ProductCard"
import classes from "./product.module.css"
import Loader from '../Loader';

function Product() {
    const [products, setProducts] = useState();
    const [isLoading, setIsloading] = useState(false)

    useEffect(() =>{
        axios.get('https://fakestoreapi.com/products')
        .then((res) =>{
            console.log(res)
            setProducts(res.data)
            setIsloading(false)
        }).catch((err) =>{
            console.log(err)
            setIsloading(false)
        })
    },[])


  return (

    <>
    {
        isLoading? (<Loader/>) : (<section className={classes.products_container}>
            {
                products?.map((single) =>(
                     <ProductCard renderAdd={true} product = {single} key={single.id}/>
                ))
            }
       </section>)
    }
    
    </>
    
  )
}

export default Product