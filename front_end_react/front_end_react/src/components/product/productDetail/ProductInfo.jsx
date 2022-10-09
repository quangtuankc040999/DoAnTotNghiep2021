import { Button, ButtonGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPrdductIntoCartRequest, getProductCardByUserIdRequest, updateProductInCartRequest } from '../../../actions/cart'
import { formatPrice } from '../../../utils/formatPrice'
import { ActionBuy, Category, Description, DescriptionTitle, Discount, DiscountPersent, OldPrice, P, ProductInfor, ProductPrice, Span, Title } from './style'

export default function ProductInfo(props) {
  const { product, cart, userInfo } = props
  const [productQuantity, setProductQuantity] = useState(1)
  const dispatch = useDispatch()

  const subtract = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1)
    }
  }
  const add = () => {
    if (productQuantity < product.inventory) {
      setProductQuantity(productQuantity + 1)
    }
  }
  const buyProduct = () => {
    if (cart.lenght > 0) {
      cart.forEach(element => {
        if (element.idProduct === product._id) {
          dispatch(updateProductInCartRequest(
            {
              userId: userInfo._id,
              product: {
                idProduct: product._id,
                quantity: productQuantity,
                quantity_old: element.quantity,
              }
            }
          ))
        } else {
          dispatch(addPrdductIntoCartRequest(
            { 
              userId: userInfo._id, 
              product: { 
                idProduct: product._id, 
                product: product, 
                quantity: productQuantity
              } 
            }))
        }
      });
    } else {
      dispatch(addPrdductIntoCartRequest(
        {
          userId: userInfo._id, 
          product: { 
            idProduct: product._id, 
            product: product, 
            quantity: productQuantity 
          } 
        }
      ))
    }
    dispatch(getProductCardByUserIdRequest(userInfo._id))
  }
  return (
    <ProductInfor>
      <Category>
        {product.category_name}
        <span> / </span>
        {product.category_detail}
      </Category>
      <Title>{product.title}</Title>
      <ProductPrice>
        {formatPrice(product.sale_price)}
        <Discount v-if="product.discount > 0">
          <OldPrice>
            {formatPrice(product.starting_price)}
          </OldPrice>
          <DiscountPersent>-{product.discount}%</DiscountPersent>
        </Discount>
      </ProductPrice>
      <P>Còn lại {product.inventory} sản phẩm</P>
      <ActionBuy>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={subtract}>-</Button>
          <Button>{productQuantity}</Button>
          <Button onClick={add}>+</Button>
        </ButtonGroup>
        <Button style={{ backgroundColor: "rgb(210,110,75)", marginLeft: '10px' }} variant="contained" onClick={buyProduct}>MUA HÀNG</Button>
      </ActionBuy>
      <p className="danh-muc">
        <DescriptionTitle>Danh mục: </DescriptionTitle>
        <Description>
          {product.category_name},{product.category_detail}
        </Description>
      </p>
    </ProductInfor >
  )
}