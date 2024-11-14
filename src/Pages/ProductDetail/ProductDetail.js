import React, { useEffect, useState } from 'react'
import Layout from '../../Componenets/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from "../../Componenets/Product/ProductCard"
import Loader from '../../Componenets/Loader'

function ProductDetail() {
    const {id} = useParams()
    console.log(id)
    const [value, setValue] = useState([])
    const [isLoading, setIsloading] = useState()

    useEffect(() => {
        setIsloading(true);
        axios.get(`${productUrl}/products/${id}`) 
        .then((res) => {
            setValue(res.data)
            setIsloading(false);
            // console.log(res.data)
        }).catch((error) => {
            console.error("Error fetching product:", error);
            setIsloading(false);
        })
    },[])


  return (
    <Layout>
        {isLoading? (<Loader/>) : (<ProductCard
        product={value}
        flex ={true}
        renderDesc={true}
        renderAdd={true}

        />)}
        
    </Layout>
  )
}

export default ProductDetail;