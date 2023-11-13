function getOrders() {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: Something went wrong. Please try again.`);
      }
      return response.json();
    });
}

export { getOrders }

