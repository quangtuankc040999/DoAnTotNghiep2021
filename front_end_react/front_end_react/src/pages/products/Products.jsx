import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsRequest } from '../../actions/product'
import { ProductCard } from '../../components/product/productCard/ProductCard';
import { SideBar } from '../../components/product/sideBar/SideBar'
import { ProductListContainer } from './style';
import './Product.css'
// import Pagination from '@mui/material/Pagination';
export default function Products() {

  const dispatch = useDispatch();
  const products = useSelector(state => state.product.productList)

  useEffect(() => {
    dispatch(getProductsRequest())
  }, [])

  return (
    <div className="container-product">
      <SideBar className="side-bar-product" />
      <ProductListContainer  className="infor-product">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))
        }
        {/* <Pagination count={10} /> */}
      </ProductListContainer>
    </div>

  )
}
