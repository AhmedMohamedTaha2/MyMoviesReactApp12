import React from 'react';
import './ShiningButton.css'; // Import the dedicated CSS file

function ShiningButton({ onClick, children }) {
  return (
    <button onClick={onClick} className="custom-shining-button">
      {children}
    </button>
  );
}

export default ShiningButton;