import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesRequest } from '../../../actions/category';
import { getProductsByCategoryRequest } from '../../../actions/product';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Route, Routes, BrowserRouter as Router, Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

export const SideBar = (props) => {
  const [idCategory, setIdCategory] = useState('')
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {categories} = props
  const handleClick = (id) => {
    setIdCategory(id)
    setOpen(!open);
  };
  const callApi = (e, name) => {
    dispatch(getProductsByCategoryRequest(name))
  }

  return (
    <div>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper', marginLeft: '30%', textTransform: 'uppercase', fontWeight: 'bold', color: ' rgba(102, 102, 102, 0.85)' }}
        aria-labelledby="nested-list-subheader"
      >
        <p className="danh-muc">DANH MỤC SẢN PHẨM</p>
        <div className="get-border"></div>
        {
          categories.map((category, i) => (
            category.categoryDetails.length === 0 ? (
              <ListItemButton sx={{ pl: 2 }}>
                <Link to={`/products/${category.name}`} >
                  <ListItemText primary={category.name} onClick={ (e) => callApi(e, category.name)} />
                </Link>
              </ListItemButton>
            ) : (
              <List>
                <ListItemButton onClick={() => handleClick(category._id)} sx={{ pl: 2 }}>
                  <Link to={`/products/${category.name}`}  >
                    <ListItemText primary={category.name} onClick={(e) => callApi(e, category.name)} />
                  </Link>
                  {(open && category._id === idCategory) ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open && category._id === idCategory} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {
                      category.categoryDetails.map((categoryDetail, i) => (
                        <ListItemButton sx={{ pl: 6 }} >
                          <Link to={`/products/${category.name}/${categoryDetail}`} >
                            <ListItemText primary={categoryDetail} onClick={(e) => callApi(e, `${category.name}/${categoryDetail}`)}  />
                          </Link>
                        </ListItemButton>
                      ))
                    }
                  </List>
                </Collapse>
              </List>
            )
          )
          )
        }
      </List>
    </div>
  )
}