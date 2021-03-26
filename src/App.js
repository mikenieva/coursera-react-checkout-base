import React from 'react'
import './App.css';

import Header from './components/Header'
import Products from './components/Products'
import Checkout from './components/Checkout'

import ProductsState from './context/ProductsState'

function App() {

  return (
    <>
      <ProductsState>
        <Header />
        
          <div className="flex">
            <Products />
            <Checkout />
          </div>
        </ProductsState>
    </>
    
  );
}

export default App;
