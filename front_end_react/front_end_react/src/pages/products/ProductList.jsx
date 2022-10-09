import React from 'react'
import { useSelector } from 'react-redux'
import { ProductCard } from '../../components/product/productCard/ProductCard'
import { Empty, Img, ProductListContainer } from './style'

export default function ProductList() {
  const products = useSelector(state => state.product.productList)

  return (
    <ProductListContainer className="infor-product">
      {products.length ? (products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))) : (
        <Empty>
          <Img
            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png"
          />
          Rất tiếc không có sản phẩm nào thỏa điều kiện tìm kiếm
        </Empty>
      )
      }
    </ProductListContainer>
  )
}
