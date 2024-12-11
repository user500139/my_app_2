import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:8080/hello?name=${encodeURIComponent(name)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setResponse(data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
        <button onClick={handleSubmit}>Send</button>
        {response && <p>{response}</p>}
      </header>
    </div>
  );
}

export default App;
