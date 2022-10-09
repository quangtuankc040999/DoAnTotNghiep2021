import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../actions/product';
import { Item } from '../../components/carousel/Carousel';

export default function ProductDetail() {
    const formatPrice = (price) => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "VND",
        }).format(price);
    }
    let productId = localStorage.getItem('product_id')
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductById(productId))
    }, [])

    const productById = useSelector(state => state.product.product);
    return (
        <div className="product-detail">
            <div className="container-product">
                <div className="list-img">
                    <div className="img">
                        <div className="img">
                            <Carousel>
                                {productById && productById.image && productById.image.length > 0 ? (
                                    productById.image.map((item, index) => {
                                        return <Item key={index} item={item} />

                                    })
                                ) : <Item item={'https://thegioirubik.com/wp-content/uploads/woocommerce-placeholder.png'}></Item>
                                }
                            </Carousel>
                        </div>
                        <div className="product-infor">
                            <div className="category">
                                {productById.category_name}
                                <span> / </span>
                                {productById.category_detail}
                            </div>
                            <p className="title">{productById.title}</p>
                            <div className="price">
                                <h4>{formatPrice(productById.sale_price)}</h4>
                                <div className="discount" v-if="productById.discount > 0">
                                    <h6 className="old-price">
                                        {formatPrice(productById.starting_price)}
                                    </h6>
                                    <h6 className="discount-persent">-{productById.discount}%</h6>
                                </div>
                            </div>
                            <p>Còn lại {productById.inventory} sản phẩm</p>

                            <p className="danh-muc">
                                <span>Danh mục: </span> {productById.category_name},{
                                    productById.category_detail
                                }
                            </p>
                        </div >
                    </div >
                </div >
            </div >
        </div >
    )
}
