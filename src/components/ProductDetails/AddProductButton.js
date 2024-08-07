import React from "react";

const AddProductButton = ({ addProduct }) => {
  return (
    <button
      onClick={addProduct}
      style={{
        width: "193px",
        height: "43px",
        border: "2px solid rgba(0,128,96,10)",
        background: "#fff",
        borderRadius: "4px",
        color: "rgba(0,128,96,10)",
        fontSize: "14px",
        fontWeight: "600",
        marginTop: "20px",
      }}
    >
      Add Product
    </button>
  );
};

export default AddProductButton;
