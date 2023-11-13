import './OrderForm.css';
import { useState } from "react";

function OrderForm({ orders, setOrders, error, setError, postNewOrder }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "" || ingredients.length === 0) {
      setError("We're sorry. Your order is incomplete. Please provide both a name and ingredients to complete your order.")
    } else {
      const newOrder = {
        id: orders.length + 1,
        name: name,
        ingredients: ingredients,
      }
      
      postNewOrder(newOrder)
      setOrders([...orders, newOrder]);
      clearInputs();
    }
  }

  function handleClick(ingredient) {
      setIngredients ([...ingredients, ingredient])
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
    setError("");
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={() => handleClick(ingredient)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form className="order-form" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="name">
      <input
        type="text"
        placeholder="Name"
        name="name"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      </label>

      <label data-testid="ingredient-buttons">
        {ingredientButtons}
      </label>

      {error && (
        <p className="error">{error}</p>
      )}

      {!error && (
      <p className="default-message">New Order: {ingredients.join(", ") || "Nothing is selected yet."}</p>)}

      <button className="submit-button" onClick={(event) => handleSubmit(event)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
