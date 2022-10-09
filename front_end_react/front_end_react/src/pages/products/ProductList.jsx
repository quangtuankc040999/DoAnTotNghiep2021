import React from 'react'
import {  useSelector } from 'react-redux'
import { ProductCard } from '../../components/product/productCard/ProductCard'
import { ProductListContainer } from './style'

export default function ProductList() {
    const products = useSelector(state => state.product.productList)
 
  return (
    <ProductListContainer className="infor-product">
        {products.length ? products.map((product, i) => (
          <ProductCard key={i} product={product} />
        )): <div>K co san pham</div>
        }
      </ProductListContainer>
  )
}
