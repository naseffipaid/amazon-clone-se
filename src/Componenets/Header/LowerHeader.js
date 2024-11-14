import React from 'react'
import { IoMenu } from "react-icons/io5";
import classes from "./header.module.css"

const LowerHeader = () => {
  return (
    <div className={classes.lower_container}>
        <ul>
            <li>
            <IoMenu />
            <p>All</p>
                
            </li>
            <li>Toady's Deals</li>
            <li>Costumer Service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
        </ul>
    </div>
  )
}

export default LowerHeader;