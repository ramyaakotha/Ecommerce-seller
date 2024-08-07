import React, { useState } from 'react';
import VariantItem from './VariantItem';
import './ProductItem.css'

const ProductItem = ({ product, updateProduct, removeProduct, openPicker }) => {
  const [showVariants, setShowVariants] = useState(true);

  const toggleVariants = () => setShowVariants(!showVariants);

  const updateVariant = (updatedVariant) => {
    const updatedVariants = product.variants.map(variant => variant.id === updatedVariant.id ? updatedVariant : variant);
    updateProduct({ ...product, variants: updatedVariants });
  };

  const deleteVariant = (variantId) => {
    const updatedVariants = product.variants.filter(variant => variant.id !== variantId);
    updateProduct({ ...product, variants: updatedVariants });
  };

  console.log(product.id,'product id')
  return (
    <div>
      <div className='product-item-wrapper'>
        <img src={product.image?.src} alt={product.title} style={{ width: '50px' }} />
        <input
          type="text"
          value={product.title}
          onChange={(e) => updateProduct({ ...product, title: e.target.value })}
          className='product-name'
        />
        <button onClick={toggleVariants} className='variant-button' style={{margin: '0 10px'}}>
          {showVariants ? 'Hide Variants' : 'Show Variants'}
        </button>

        <button onClick={() => openPicker(product)} className='edit-button' >Edit</button>
        <button onClick={() => removeProduct(product.id)} className='cancel-button' >x</button>
      </div>
      {showVariants && product.variants.map(variant => (
        <VariantItem
          key={variant.id}
          variant={variant}
          updateVariant={updateVariant}
          deleteVariant={deleteVariant}
          canDelete={product.variants.length > 1}
        />
      ))}
    </div>
  );
};

export default ProductItem;
