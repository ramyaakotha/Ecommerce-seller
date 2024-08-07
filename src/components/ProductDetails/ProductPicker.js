import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./ProductPicker.css";

const ProductPicker = ({ isOpen, onClose, onSelect }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState({});



  const apiKey = '72njgfa948d9aS7gs5'

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
      setSelectedProducts({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen, page, search]);

 

  const url = new URL("https://stageapi.monkcommerce.app/task/products/search")
 
  const fetchProducts = async () => {
    const response = await axios.get(url.toString(), {
      params: { page, search },
      headers: {          
        'x-api-key': apiKey
      }
    });
    console.log(response,"response")
    setProducts(prev => [...prev, ...response.data]);
  };


 
  

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      setPage(page + 1);
    }
  };

  const handleProductSelection = (product) => {
    setSelectedProducts((prev) => {
      const isSelected = !!prev[product.id];
      if (isSelected) {
        const { [product.id]: _, ...rest } = prev;
        return rest;
      } else {
        const variantsSelection = product.variants.reduce((acc, variant) => {
          acc[variant.id] = true;
          return acc;
        }, {});
        return { ...prev, [product.id]: variantsSelection };
      }
    });
  };

  const handleVariantSelection = (productId, variantId) => {
    setSelectedProducts((prev) => {
      const productSelection = prev[productId] || {};
      const isSelected = !!productSelection[variantId];
      const updatedProductSelection = {
        ...productSelection,
        [variantId]: !isSelected,
      };
      if (
        Object.values(updatedProductSelection).every((selected) => !selected)
      ) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: updatedProductSelection };
    });
  };

  const handleSave = () => {
    const selected = products
      .filter((product) => selectedProducts[product.id])
      .map((product) => ({
        ...product,
        variants: product.variants.filter(
          (variant) => selectedProducts[product.id][variant.id]
        ),
      }));
    onSelect(selected);
    onClose();
  };
  const selectedCount = Object.keys(selectedProducts).length;
  // console.log(selectedCount, "count")


  return (
    <div className="modal-wrapper" style={{ width: "500px" }}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          content: {
            width: "60%", 
            margin: "auto", 
            maxHeight: "90vh", 
          },
        }}
      >
        <div className="modal-header">
          <p className="modal-name">Search Products</p>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
        <hr />

        <div
          style={{
            display: "flex",
            width: "auto",
          }}
        >
          <input
            type="text"
            placeholder=" Search Products"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
              setProducts([]);
            }}
            style={{
              width: "-webkit-fill-available",
              height: "32px",
              color: " rgba(0, 0, 0, 0.5)",
              borderColor: " rgba(0, 0, 0, 0.5)",
              borderRadius: "5px",
            }}
          />
        </div>
        <div
          onScroll={handleScroll}
          style={{ maxHeight: "400px", overflowY: "auto", marginTop: '10px'}}
        >
          {products.map((product) => (
            <div key={product.id}>
              <label>
                <input
                  type="checkbox"
                  checked={!!selectedProducts[product.id]}
                  onChange={() => handleProductSelection(product)}
                  style={{ accentColor: "rgba(0, 128, 96, 1)" }}
                />
                <img
                  src={product.image.src}
                  alt={product.title}
                  style={{ width: "50px" }}
                />
                {product.title}
                <hr></hr>
              </label>
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  style={{ marginLeft: "20px", padding: "10px" }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={!!selectedProducts[product.id]?.[variant.id]}
                      onChange={() =>
                        handleVariantSelection(product.id, variant.id)
                      }
                      style={{ accentColor: "rgba(0, 128, 96, 1)" }}
                    />
                    {variant.title} - ${variant.price}
                    <hr></hr>
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between ",
            margin: "auto",
          }}
        >
          {selectedCount === 1 ? (
            <p className="product-count">{`${selectedCount} product selected`}</p>
          ) : (
            <p className="product-count">{`${selectedCount} products selected`}</p>
          )}

          <button onClick={handleSave} className="save-button" disabled= {selectedCount === 0}  >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductPicker;
