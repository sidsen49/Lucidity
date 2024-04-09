import React from 'react';
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import './Inventory.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const InventoryStats = () => {
  // This function calculates the total no of product.
  const totalProduct = useSelector(state => state.dataReducer.data.length);

  // Below function helps in removing the dollar and adds the value
  const totalStoreValue = useSelector(state => { 
    let totalValue = 0;
    state.dataReducer.data.forEach((product) => {
      if (product.value !== '0') {
        totalValue = totalValue + parseInt(product.value.slice(1, product.value.length))}
      })
      return totalValue 
  });

  // counts of stock item
  const outOfStock = useSelector(state => 
    (state.dataReducer.data.filter((data) => data.quantity === 0)).length
  )
  
  // counts no of different category.
  const noOfCategory = useSelector(state => {
    const uniqueDict = {};
    const uniqueList = [];
    state.dataReducer.data.forEach((product) => {
      if (!uniqueDict[(product.category).toLowerCase()]) {
        uniqueDict[product.category.toLowerCase()] = true;
        uniqueList.push(product.category);
      }
    })
    return uniqueList.length;
  })

  return (
    <section>
      <Typography class="inventoryHeader" variant="h1" mt={2}>
        Inventory Stats
      </Typography>
      <Box sx={{ flexGrow: 1 }} mt={4}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item>
            <div className={'iconText'}>
              <ShoppingCartIcon />{' '}
              Product Count
            </div>
            <Typography variant="body2">{totalProduct}</Typography>
          </Item>
        </Grid>
        <Grid item xs={3}>
        <Item>
            <div className={'iconText'}>
              <CurrencyExchangeIcon />{' '}
              Total Store Value
            </div>
            <Typography variant="body2">{totalStoreValue}</Typography>
          </Item>
        </Grid>
        <Grid item xs={3}>
        <Item>
            <div className={'iconText'}>
              <RemoveShoppingCartIcon />{' '}
              Out of stocks
            </div>
            <Typography variant="body2">{outOfStock}</Typography>
          </Item>
        </Grid>
        <Grid item xs={3}>
        <Item>
            <div className={'iconText'}>
              <CategoryIcon /> {' '}
              No of category
            </div>
            <Typography variant="body2">{noOfCategory}</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </section>
  )
}

export default InventoryStats;
