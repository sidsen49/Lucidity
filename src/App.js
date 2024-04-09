import React from 'react';

import NavBar from './NavBar';
import InventoryStats from './InventoryStats';
import ProductList from './ProductList';
import EditModal from './Reusables/Modal';

function App() {
  return (
    <>
    <NavBar />
    <InventoryStats />
    <ProductList />
    <EditModal />
    </>
  );
}

export default App;
