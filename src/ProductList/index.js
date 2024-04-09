import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import './Table.css'

import { fetchData, setData } from '../Actions/productDataAction';
import { editAction, toggleEdit } from '../Actions/editAction';

const ProductList = () => {
  const visibleProductUUID = useRef('');
  const dispatch = useDispatch();

  const productsData = useSelector(state => state.dataReducer.data);
  const userType = useSelector(state => state.userReducer.userType)

  React.useEffect(() => {
    dispatch(fetchData());
  }, [])

  // This Function helps in toggling the model for editing.
  const selectEditData = (index) => {
    return dispatch(editAction(productsData[index]))
  }

  // This function helps in visibility of selected product or all product.
  const toggleVisibility = (uuid) => {
    let newProductData = [...productsData];
   if (visibleProductUUID.current === uuid) {
    visibleProductUUID.current = ''
    newProductData = newProductData.map((element) => {
      element['isShow'] = true;
      return element;
    })
   } else {
    visibleProductUUID.current = uuid;
    newProductData = newProductData.map((element) => {
      if (element['uuid'] === uuid) {
        element['isShow'] = true;
      } else {
        element['isShow'] = false;
      }
      return element;
    })
   }
   dispatch(setData(newProductData))
  }

  // This function deletes products from redux store.
  const deleteProduct = (uuid) => {
    let newProductData = [...productsData];
    newProductData = newProductData.filter((element) => {
      if(element.uuid !== uuid) { 
        element['isShow'] = true
        return element; 
      }
    })
    dispatch(setData(newProductData));
  }

  return (
    <TableContainer component={Paper} sx={{marginTop: 10}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" classes="tableTopMargin">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Qyantity</TableCell>
            <TableCell align="right">Value</TableCell>
            {userType === 'Admin' ? <TableCell align="right">Action</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {productsData.map((productData, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > {productData.isShow ? <>
              <TableCell component="th" scope="row">
                {productData.name}
              </TableCell>
              <TableCell align="right">{productData.category}</TableCell>
              <TableCell align="right">{productData.price}</TableCell>
              <TableCell align="right">{productData.quantity}</TableCell>
              <TableCell align="right">{productData.value}</TableCell>
              {userType === 'Admin' ? <TableCell align="right">{<><CreateIcon onClick={() => {
                dispatch(toggleEdit(true));
                selectEditData(index);
              }}/> <VisibilityIcon onClick={() => {toggleVisibility(productData.uuid)}} /> <ClearIcon onClick={() => {deleteProduct(productData.uuid)}} /> </>}</TableCell> : null}
              </> : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductList;
