import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import * as Styles from './mobileSidebar'
import Sidebar from '../Sidebar/Sidebar'
// import logo from '../../assets/icons/logo.svg'

export default function TemporaryDrawer({ pathname }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300, backgroundColor: '#faffff', height: '100%', position: 'relative' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        {/* <img src={logo} alt="" className="mobile__logo" /> */}
        {/* <div style={{ fontWeight: 'bold', fontSize: '45px', textAlign: 'center', margin: '50px auto 70px auto' }}>
            MINT ENGINE
        </div> */}
        {/* <Divider style={{ marginTop: '100px' }} /> */}
        <div>
          <Sidebar mobile />
        </div>
    </Box>
  );

  return (
    <Styles.Root>
        <IconButton onClick={toggleDrawer('left', true)}>
            <MenuIcon sx={{ color: 'white', fontSize: '30px' }} />
        </IconButton>
        <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
        >
            {list('left')}
        </Drawer>
    </Styles.Root>
  );
}
