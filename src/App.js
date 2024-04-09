import React from 'react';

import NavBar from './NavBar';
import InventoryStats from './InventoryStats';
import ProductList from './ProductList';
import Modal from './Reusables/Modal';

function App() {
  return (
    <>
    <NavBar />
    <InventoryStats />
    <ProductList />
    <Modal />
    </>
  );
}

export default App;
