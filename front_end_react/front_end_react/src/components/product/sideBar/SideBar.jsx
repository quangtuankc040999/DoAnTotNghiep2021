import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesRequest } from '../../../actions/category';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import './Sidebar.css'
function valuetext(value) {
  return `${value}`;
}


export const SideBar = () => {
  const [idCategory, setIdCategory] = useState('')
  const [open, setOpen] = React.useState(false);
  const handleClick = (id) => {
    setIdCategory(id)
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categoryList);

  useEffect(() => {
    dispatch(getCategoriesRequest())
  }, [])

  return (
    <div>
      <List
        sx={{ width: '200%', bgcolor: 'background.paper', marginLeft: '30%', textTransform: 'uppercase', fontWeight: 'bold', color: ' rgba(102, 102, 102, 0.85)' }}
        aria-labelledby="nested-list-subheader"
      >
        <p className="danh-muc">DANH MỤC SẢN PHẨM</p>
        <div className="get-border"></div>
        {
          categories.map((category, i) => (
            category.categoryDetails.length === 0 ? (
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText primary={category.name} />
              </ListItemButton>
            ) : (
              <List>
                <ListItemButton onClick={() => handleClick(category._id)} sx={{ pl: 2 }}>
                  <ListItemText primary={category.name} />
                  {(open && category._id === idCategory) ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open && category._id === idCategory} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {
                      category.categoryDetails.map((categoryDetail, i) => (
                        <ListItemButton sx={{ pl: 6 }} >
                          <ListItemText primary={categoryDetail} />
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
