import React from 'react'
import {Carousel} from "react-responsive-carousel"
import classes from "./carousel.module.css" 
import {img} from "./img/data"
import "react-responsive-carousel/lib/styles/carousel.min.css";



function ImageCarousel() {
  return (
    <div>
 <Carousel
        autoplay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        
        >
            {
                img.map((imageLink) =>{
                    return <img key={imageLink} className={classes.myImage} src={imageLink} alt='caroele'/>
                })
            }
        </Carousel> 
        <div className={classes.hero_image}></div>      

    </div>
  )
}

export default ImageCarousel