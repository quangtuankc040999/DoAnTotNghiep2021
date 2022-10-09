import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { NavContainer, Container, Logo, Content, Action, Cart } from './Navigation';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavDrawer from './NavDrawer';
import { Badge, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navigation(props) {
  const user = useSelector(state => state.login.userInfo);
  const {cart} = props
  const [totalProduct, setTotalProduct] = useState(0);

  const navigate = useNavigate();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  useEffect(() => {
    setTotalProduct(totalQuantity())
  }, )
  const totalQuantity = () =>  {
    return cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
  }
  return (
    <Container>
      <NavContainer>
        <Content>
          <Logo>
            <a href="/">
              <img width='250' height='100' src="https://www.supanova.com.au/wp-content/uploads/2022/05/rubiks-logo.png" alt='' />
            </a>
          </Logo>
          <TextField
            id="standard-textarea"
            label="Tìm kiếm"
            variant="standard"
            style={{ width: '20%', marginTop: '13px' }}
          />


          {
            user &&
            (<Action onClick={() => { navigate(`/profile`) }}>Xin chào: {user.firstName} {user.lastName}  <FaUserAlt /></Action>)
          }
          {
            user &&
            (<Cart onClick={() => { navigate(`/cart`) }}> Giỏ hàng/0đ
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={totalProduct} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton></Cart>)
          }
          <NavDrawer></NavDrawer>

        </Content>
      </NavContainer>
    </Container>
  )
}
