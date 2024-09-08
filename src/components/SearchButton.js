import React, { useState } from 'react';

function SearchButton({query, onReset}) {
  const [buttonText, setButtonText] = useState('Search');

  const handleClick = () => {
    if (buttonText === "Reset") {
      onReset(); // Очищаем поле ввода
      setButtonText("Search");
    } else {
      setButtonText("Reset");
    }
  };

  return (
    <button onClick={handleClick} className="search-button">
      {buttonText}
    </button>
  );
}

export default SearchButton;
