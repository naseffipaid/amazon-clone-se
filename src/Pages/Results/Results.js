import React, { useEffect, useState } from 'react'
import classes from "./results.module.css"
import Layout from '../../Componenets/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Componenets/Product/ProductCard'
import Loader from '../../Componenets/Loader'

function Results() {
    const [results, setResults] = useState([])
    const [isLoading, setIsloading] = useState(false)

    const {categoryName} = useParams()
    console.log(categoryName)

    useEffect(() =>{
        axios.get(`${productUrl}/products/category/${categoryName}`)
        // axios.get("https://fakestoreapi.com/products/category/jewelery")
    .then((res) =>{
        // console.log(res.data)
        setResults(res.data)
        setIsloading(false)
    }).catch((err) =>{
        console.log(err)
        setIsloading(false)
    })
    },[])
    

  return (
    <Layout>
        <section>
            <h1 style={{ padding: "30px"}}>Results</h1>
            <p style={{ padding: "30px"}}>Category / {categoryName}</p> 
            <hr /> 
            {isLoading? (<Loader/>) : (<div className={classes.products_container}>
                {results?.map((product) =>(
                    <ProductCard
                    key={product.id}

                    product={product} 
                    renderAdd={true}
                    />
                ))}

            </div>)}
            
        </section>
    </Layout>
  )
}

export default Results