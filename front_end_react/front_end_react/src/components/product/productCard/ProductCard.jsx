import Carousel from 'react-material-ui-carousel'
import { Item } from '../../carousel/Carousel';
import './productCardStyle.css'



export const ProductCard = (props) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  const viewProductDetail = () => {
    console.log('log');
  }
  const { product } = props
  return (
    <div className='product-card' onClick = {viewProductDetail}>
      <div className="container">
        {
          product.inventory === 0 && (
            <div className="out-of-stock">
              <span>Hết hàng</span>
            </div>
          )
        }
        <div className="img">
          <Carousel>
            {product.image.length > 0 ? (
              product.image.map((item, index) => {
                return <Item key={index} item={item} />

              })
            ) : <Item item={'https://thegioirubik.com/wp-content/uploads/woocommerce-placeholder.png'}></Item>
            }
          </Carousel>
        </div>
       
        <div className="product">
          <div className="product-infor">
            <div className="name">
              <h3>{product.title}</h3>
              <h6>{product.category_name}</h6>
            </div>
          </div>
          <div className="product-price">
            <h4>{formatPrice(product.sale_price)}</h4>
            {
              product.discount > 0 &&
              <div className="discount" >
                <h6 className="old-price">
                  {formatPrice(product.starting_price)}
                </h6>
                {/* <span className="discount-persent">-{product.discount}%</span> */}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}


