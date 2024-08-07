import React, { useState } from 'react';

const VariantItem = ({ variant, updateVariant, deleteVariant, canDelete }) => {
  const [discountType, setDiscountType] = useState('none');
  const [discountValue, setDiscountValue] = useState(0);

  const handleDiscountChange = (type, value) => {
    setDiscountType(type);
    setDiscountValue(value);
    updateVariant({ ...variant, discount: { type, value } });
  };
console.log(variant.id, "variant id")
  return (
    <div style={{marginLeft: '20px'}}>
      <input
        type="text"
        value={variant.title}
        onChange={(e) => updateVariant({ ...variant, title: e.target.value })}
        className='variant-name'
      />
      <input
        type="number"
        value={variant.price}
        onChange={(e) => updateVariant({ ...variant, price: e.target.value })}
        className='variant-price'
      />
      <select value={discountType} onChange={(e) => handleDiscountChange(e.target.value, discountValue)} className='discount-selection'>
        <option value="none">No Discount</option>
        <option value="flat">Flat Discount</option>
        <option value="percentage">Percentage Discount</option>
      </select>
      {discountType !== 'none' && (
        <input
          type="number"
          value={discountValue}
          onChange={(e) => handleDiscountChange(discountType, e.target.value)}
          className='discount'
        />
      )}
      {canDelete && <button onClick={() => deleteVariant(variant.id)} className='delete-button'>Delete</button>}
    </div>
  );
};

export default VariantItem;
