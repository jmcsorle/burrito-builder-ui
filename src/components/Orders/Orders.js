import { getOrders} from '../../apiCalls';
import Order from '../Orders/Orders';
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

  console.log('ORDERS', orders)


  

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
      </header>
      <OrderForm orders={orders}/>
      {orders.length ?
       <Orders orders={orders}  /> :
        <p>There are currently no orders.</p>
      }

     

    </main>
  );
}

export default App;
