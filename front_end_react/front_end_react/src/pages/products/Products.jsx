import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesRequest } from '../../actions/category'
import { getProductsRequest } from '../../actions/product'
import { SideBar } from '../../components/product/sideBar/SideBar'
import './Product.css'
import ProductList from './ProductList';
import { ContainerProduct } from './productStyle'

export default function Products() {

  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categoryList);

  useEffect(() => {
    dispatch(getProductsRequest())
    dispatch(getCategoriesRequest())
  }, [])
  return (
    <ContainerProduct>
      <SideBar className="side-bar-product" categories={categories} />
      <ProductList/>
    </ContainerProduct>
  )
}