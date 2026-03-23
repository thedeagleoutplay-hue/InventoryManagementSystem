import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const addProduct = async () => {
    await axios.post('http://localhost:5000/api/products', {
      name,
      quantity
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Inventory</h1>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Quantity" onChange={e => setQuantity(e.target.value)} />
      <button onClick={addProduct}>Add</button>

      <ul>
        {products.map(p => (
          <li key={p._id}>{p.name} - {p.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
