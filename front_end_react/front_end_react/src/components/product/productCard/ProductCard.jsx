import Carousel from 'react-material-ui-carousel'
import { Navigate, useNavigate } from 'react-router-dom';
import { Item } from '../../carousel/Carousel';
import { H3, H4, H6, Image, OldPrice, OutOfStock, ProductContainer, ProductDetail, ProductInfor, ProductPrice, Span } from './style';



export const ProductCard = (props) => {
  const navigate = useNavigate();
  const formatPrice = (price) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  const { product } = props
  return (
    <div className='product-card' onClick = {() => {
      localStorage.setItem('product_id', product._id)
      navigate(`/products/product-detail/${product._id}`)
    }}>
      <ProductContainer>
        {
          product.inventory === 0 && (
            <OutOfStock>
              <Span>Hết hàng</Span>
            </OutOfStock>
          )
        }
        <Image>

          <Carousel>
            {product.image.length > 0 ? (
              product.image.map((item, index) => {
                return <Item key={index} item={item} />

              })
            ) : <Item item={'https://thegioirubik.com/wp-content/uploads/woocommerce-placeholder.png'}></Item>
            }
          </Carousel>
        </Image>
        
       
        <ProductDetail>
          <ProductInfor>
            <div className="name">
              <H3>{product.title}</H3>
              <H6>{product.category_name}</H6>
            </div>
          </ProductInfor>
          <ProductPrice>
            <H4>{formatPrice(product.sale_price)}</H4>
            {
              product.discount > 0 &&
              <div className="discount" >
                <H4>
                  <OldPrice>
                  {formatPrice(product.starting_price)}
                  </OldPrice>
                </H4>
              </div>
            }
          </ProductPrice>
        </ProductDetail>
      </ProductContainer>
    </div>
  )
}


