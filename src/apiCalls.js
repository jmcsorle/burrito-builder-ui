function getOrders() {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: Something went wrong. Please try again.`);
      }
      return response.json();
    });
}

function addOrder(newOrder) {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newOrder)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`${response.status}: Something went wrong. Please try again.`);
    }
    return response.json();
  })

}

export { getOrders, addOrder }

