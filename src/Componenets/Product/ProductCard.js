import React, { useContext } from 'react'
import classes from "./product.module.css"
import Rating from "@mui/material/Rating"
import CurrencyFormatter from "../../Componenets/CurrrencyFormat/CurrencyFormatter"
import { Link } from "react-router-dom"
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'

function ProductCard({product, flex, renderDesc, renderAdd}) {
    const {image,title,rating,price,id, description} = product;
    
    const [state, dispatch] = useContext(DataContext)

    // console.log(state)

    const addTocart = () =>{
        dispatch({
            type:Type.ADD_TO_BASKET,
            item:{
                image,title,rating,price,id, description
            }
        })
    }
  return (
    <div className={`${classes.card_container} ${flex?classes.product_flexed : ''}`}>
        <Link to={`products/${id}`}>
            <img src={image} alt=""/>
        </Link>
        <div>
            <h3>{title}</h3>
            {renderDesc && <div style={{maxWidth:"750px"}}>{description}</div>}
            <div className={classes.rating}>
                {/* rating */}
                <Rating value={rating?.rate} precision={0.1}/>
                {/* count */}
                <small>{rating?.count}</small>

            </div>
            <div>
                {/* price */}
                <CurrencyFormatter amount={price}/>
            </div>
            {
                renderAdd && <button className={classes.button} onClick={addTocart}>
                add to cart
            </button>
            }
            
        </div>
    </div>
  )
}

export default ProductCard