import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsRequest } from '../../actions/product'
import { ProductCard } from '../../components/product/productCard/ProductCard';
import { SideBar } from '../../components/product/sideBar/SideBar'
import { ProductListContainer } from './style';
import './Product.css'
import ProductList from './ProductList';
import { useLocation } from "react-router-dom";

export default function Products() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsRequest())
  }, [])


 

  return (
    <div className="container-product">
      <SideBar className="side-bar-product" />
      <ProductList/>
    </div>

  )
}
