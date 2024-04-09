import React, { useRef } from 'react';
import { useSelector, UseDispatch, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Modal.css';
import { toggleEdit, editAction } from '../../Actions/editAction';
import { setData } from '../../Actions/productDataAction';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditModal() {

  const dispatch = useDispatch();
  const productData = useSelector(state => state.dataReducer.data);
  const isEdit = useSelector(state => state.dataReducer.isEdit);
  const selectedProduct = useSelector(state => state.dataReducer.editProductData);

  const price = () => {
    const dollarSign = selectedProduct.price && selectedProduct.price.slice(0, 1) === '$';
    if(dollarSign) {
      return selectedProduct.price.slice(1, selectedProduct.price.length)
    }
    return selectedProduct.price || 0
  }
  // This function helps in showing the value without the dollar sign.
  const value = () => {
    const dollarSign = selectedProduct.value && selectedProduct.value.slice(0, 1) === '$';
    if(dollarSign) {
      return selectedProduct.value.slice(1, selectedProduct.value.length)
    }
    return selectedProduct.value || 0;
  }
  // This Function is update selected product entry.
  const updateField = (data, name) => {
    const newSelectedProduct = {...selectedProduct};
    if (name === 'price' || name === 'value') (newSelectedProduct[name] = `$${data || 0}`)
    else (newSelectedProduct[name] = data);
    dispatch(editAction(newSelectedProduct));
  }
  //This function is saving the changed data to the product data present.
  const updateEditedField = () => {
    const index = productData.findIndex((productName) => selectedProduct.name === productName.name);
    const newProductData = [...productData];
    newProductData[index] = selectedProduct;
    dispatch(setData(newProductData));
  }

   return (
    <>
      <Modal
        open={isEdit}
        onClose={() => {dispatch(toggleEdit(false))}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit the product
          </Typography>
          <Typography variant="body1" component="h2">
            {selectedProduct.name}
          </Typography>
          <div className="modalBody">
          <TextField
          label="Category"
          id="standard-size-small"
          defaultValue={selectedProduct.category}
          size="small"
          variant="standard"
          onChange={(e) => {
            updateField(e.target.value, 'category')
          }}
        />
        <TextField
          label="Price"
          id="standard-size-normal"
          defaultValue={price()}
          variant="standard"
          onChange={(e) => {
            updateField(e.target.value, 'price')
          }}
        />
        <TextField
          label="Quantity"
          id="standard-size-small"
          defaultValue={selectedProduct.quantity}
          size="small"
          variant="standard"
          onChange={(e) => {
            updateField(e.target.value, 'quantity')
          }}
        />
        <TextField
          label="Value"
          id="standard-size-normal"
          defaultValue={value()}
          variant="standard"
          onChange={(e) => {
            updateField(e.target.value, 'value')
          }}
        />
          </div>
        <Button variant="text" onClick={() => {
          updateEditedField();
          dispatch(toggleEdit(false))
        }}>Save</Button>
        </Box>
      </Modal>
    </>
  );
}