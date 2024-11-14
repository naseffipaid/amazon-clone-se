import React from 'react'
import {categoryImage} from "./CatgoryFullInfos"
import   CategoryCard from "./CategoryCard"
import classes from "./category.module.css"

function Category() {
  return (
    <section className={classes.category_container}>
        {
            categoryImage.map((single) => {
                return <CategoryCard data = {single}/> 
            })
        }
    </section>
  )
}

export default Category;