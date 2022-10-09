import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByCategoryRequest, getProductsRequest } from '../../actions/product'
import { ProductCard } from '../../components/product/productCard/ProductCard'
import { ProductListContainer } from './style'

export default function ProductList() {
    const products = useSelector(state => state.product.productList)
 
  return (
    <ProductListContainer className="infor-product">
        {products.length && products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))
        }
      </ProductListContainer>
  )
}
