import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';
import { border } from '@mui/system';

export default function NavDrawer() {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[{
          text: 'Trang chủ',
          path: '/'
        }, {
          text: 'Sản phẩm',
          path: '/products'
        }, {
          text: 'Blog',
          path: '/blog'
        }].map((obj, index) => (
          <ListItem key={obj.text} >
            <ListItemButton>
              <ListItemText primary={obj.text}  onClick={ () => {navigate(`${obj.path}`)}} 
              style = {{
                marginLeft: "5%",
                alignSelf: "center",
                fontWeight: "500",
                fontSize: "1em",
                color:"rgba(102, 102, 102, 0.85)",
                textTransform: "uppercase",
              }}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} style={{
            fontSize: 25,
            padding: '6px',
            border: "1px solid black",
            borderRadius: "15px",
            marginTop:"35%",
            color: 'black'
          }}> <CgMenu/> </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}