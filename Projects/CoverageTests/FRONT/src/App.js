import React, { useState } from 'react';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleButtonClick = () => {
    alert(`Selected option: ${selectedOption}`);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <select data-testid="select" value={selectedOption} onChange={handleSelectChange}>
        <option data-testid="opt0" value="">Select an option</option>
        <option data-testid="opt1" value="option1">Option 1</option>
        <option data-testid="opt2" value="option2">Option 2</option>
        <option data-testid="opt3" value="option3">Option 3</option>
      </select>
      <button data-testid="btn" onClick={handleButtonClick}>Submit</button>
    </div>
  );
};

export default Home;
