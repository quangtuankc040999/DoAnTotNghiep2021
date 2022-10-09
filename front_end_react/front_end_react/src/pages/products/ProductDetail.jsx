import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCardByUserIdRequest } from '../../actions/cart';
import { getProductById } from '../../actions/product';
import { Item } from '../../components/carousel/Carousel';
import ProductInfo from '../../components/product/productDetail/ProductInfo';

export default function ProductDetail() {
  const productId = localStorage.getItem('product_id')
  const user = useSelector(state => state.login.userInfo)
  const cart = useSelector(state => state.cart.cart)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductById(productId))
  }, [])
  useEffect(() => {
    if (user) {
      dispatch(getProductCardByUserIdRequest(user._id))
    }
  }, [])

  const productById = useSelector(state => state.product.product);
  return (
    <div className="product-detail">
      <div style={{ width: '350px', height: '400px' }}>
        <Carousel>
          {productById && productById.image && productById.image.length > 0 ? (
            productById.image.map((item, index) => {
              return <Item key={index} item={item} />

            })
          ) : <Item item={'https://thegioirubik.com/wp-content/uploads/woocommerce-placeholder.png'}></Item>
          }
        </Carousel>
      </div>

      <ProductInfo userInfo={user} product={productById} cart={cart}></ProductInfo>
    </div >
  )
}