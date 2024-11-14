import React from 'react'
import Layout from '../../Componenets/Layout/Layout'
import ImageCarousel from "../../Componenets/Carousel/ImageCarousel"
import Category from "../../Componenets/Category/Category"
import Product from "../../Componenets/Product/Product"


function Landing() {
  return (
  <Layout>
     <ImageCarousel/>
     <Category/>
     <Product/>
 </Layout>
  )
}

export default Landing