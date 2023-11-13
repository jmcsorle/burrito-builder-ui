import "./App.css";
import { getOrders, addOrder} from '../../apiCalls';
import Orders from '../Orders/Orders';
import OrderForm from '../OrderForm/OrderForm'
import { useEffect, useState } from "react";

function App() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('')


  useEffect(() => {
    getOrders()
    .then((data) => setOrders(data.orders))
    .catch((error) => {
      console.log(error.message);
      setError(
        `${error.message}: Something went wrong. Please try again.`
      );
    });
  }, [])

  function postNewOrder(newOrder) {
    addOrder(newOrder)
      .then((data) => setOrders([...orders, data]))
      .catch((error) => {
        console.log(error.message);
        setError(`${error.message}: Something went wrong. Please try again.`);
      });
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
      </header>
      <OrderForm
      orders={orders}
      setOrders={setOrders}
      setError={setError}
      error={error}
      postNewOrder={postNewOrder} />
      {orders.length ?
       <Orders orders={orders}  /> :
        <p>There are currently no orders.</p>
      }
    </main>
  );
}

export default App;
