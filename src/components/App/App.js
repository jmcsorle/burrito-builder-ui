import "./App.css";
import { getOrders} from '../../apiCalls';
import Orders from '../Orders/Orders';
import OrderForm from '../OrderForm/OrderForm'
import { useEffect, useState } from "react";

function App() {
  const [orders, setOrders] = useState({});
  const [error, setError] = useState('')

  // useEffect(() => {
  //   getOrders().catch((err) => console.error("Error fetching:", err));
  // });

  useEffect(() => {
    getOrders()
    .then((data) => setOrders(data))
    .catch((error) => {
      console.log(error.message);
      setError(
        `${error.message}: Something went wrong. Please try again.`
      );
    });
  }, {})

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
      </header>
      <OrderForm />

      {/* <Orders orders={"Here is where orders go"} /> */}

    </main>
  );
}

export default App;
