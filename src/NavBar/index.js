import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import './NavBar.css';
import { setUserAction } from '../Actions/userActions';


const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: 'white',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.userReducer.userType === 'Admin');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" class="appBarStyle">
        <Toolbar className='toolBarStyle'>
        <Stack direction="row" spacing={1} alignItems="center">
        <Typography class="navBarText">User</Typography>
        <AntSwitch checked={isAdmin}  onChange={(e) => e.target.checked === false ? dispatch(setUserAction('User')) : dispatch(setUserAction('Admin'))} inputProps={{ 'aria-label': 'ant design' }} />
        <Typography class="navBarText">Admin</Typography>
        </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
