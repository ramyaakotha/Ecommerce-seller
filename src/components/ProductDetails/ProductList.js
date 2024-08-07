import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProductItem from './ProductItem';
import AddProductButton from './AddProductButton';
import ProductPicker from './ProductPicker';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const addProduct = () => {
    setProducts([...products, { id: uuidv4(), title: '', variants: [], image: null }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
  };

  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const openPicker = (product) => {
    setEditProduct(product);
    setPickerOpen(true);
  };

  const handleSelectProduct = (selectedProducts) => {
    const updatedProducts = products.reduce((acc, product) => {
      if (product.id === editProduct.id) {
        // Add selected products, each with a new UUID
        selectedProducts.forEach(selectedProduct => {
          acc.push({ ...selectedProduct, id: uuidv4() });
        });
      } else {
        acc.push(product);
      }
      return acc;
    }, []);

    setProducts(updatedProducts);
    setPickerOpen(false);
  };


  return (
    <div className='products'>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          updateProduct={updateProduct}
          removeProduct={removeProduct}
          openPicker={openPicker}
        />
      ))}
      <AddProductButton addProduct={addProduct} />
      <ProductPicker isOpen={isPickerOpen} onClose={() => setPickerOpen(false)} onSelect={handleSelectProduct} />
    </div>
  );
};

export default ProductList;
