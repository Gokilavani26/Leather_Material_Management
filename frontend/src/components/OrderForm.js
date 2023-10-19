import axios from "axios";
import { useState } from "react";

function OrderForm(props) {
  
  const [error, setError] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [orderDate, setOrderDate] = useState("");
  const [items, setItems] = useState([]);
  const [orderNumber, setOrderNumber] = useState("");
 
 
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    for (let i = 0; i < items.length; i++) {
      totalAmount += items[i].price * items[i].quantity;
    }
    console.log(totalAmount);

    return totalAmount;
  };
  const handleSubmit = (event) => {
    const amt = calculateTotalAmount();
  
    event.preventDefault();

    const formData = {
      orderNumber,
      orderDate,
      
      customerName,
      phoneNumber,
      isDelivered: false,
      items,
      billAmount: amt,
    };

    if (
      phoneNumber.length !== 10 ||
      customerName.length === 0 ||
      orderNumber.length === 0 ||
      orderDate.length === 0
    ) {
      setError("Fields Cannot Be Empty");
      return;
    }
  
    axios
      .post("http://localhost:7000/order/add", formData)
      .then((res) => console.log(res));

    setCustomerName("");
    setPhoneNumber("");
    setOrderDate("");
  
    setNumberOfItems(0);
    setOrderNumber("");
    setItems([]);

    props.cancel();
  };

  const handleIncrement = () => {
    setNumberOfItems(numberOfItems + 1);
  };

  const generateItemInputs = () => {
    const itemInputs = [];
    for (let i = 0; i < numberOfItems; i++) {
      itemInputs.push(
        <div key={i}>
          <label className="form-label mx-4">
            Product
            <input
              type="text"
              className="form-control"
              value={items[i]?.name}
              onChange={(event) => {
                const newItems = [...items];
                newItems[i] = { ...newItems[i], name: event.target.value };
                setItems(newItems);
              }}
            />
          </label>
          <label className="form-label mx-3">
            Quantity
            <input
              type="number"
              className="form-control"
              value={items[i]?.quantity}
              onChange={(event) => {
                const newItems = [...items];
                newItems[i] = {
                  ...newItems[i],
                  quantity: parseInt(event.target.value),
                };
                setItems(newItems);
              }}
            />
          </label>
          <label className="form-label mx-4">
            Price
            <input
              className="form-control"
              type="number"
              value={items[i]?.price}
              onChange={(event) => {
                const newItems = [...items];
                newItems[i] = {
                  ...newItems[i],
                  price: parseFloat(event.target.value),
                };
                setItems(newItems);
              }}
            />
          </label>
        </div>
      );
    }
    return itemInputs;
  };

  return (
    <>
      <div className="container w-75">
        <h3>Order Details</h3>
        <form onSubmit={handleSubmit}>
          <label className="form-label my-2">Order Number</label>
          <input
            type="number"
            value={orderNumber}
            className="form-control w-50"
            onChange={(event) => setOrderNumber(event.target.value)}
          />

          <label className="form-label my-2">Customer Name</label>
          <input
            type="text"
            value={customerName}
            className="form-control w-50"
            onChange={(event) => setCustomerName(event.target.value)}
          />
          <label className="form-label my-2">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            className="form-control w-50"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <label className="form-label my-2">Order Date</label>
          <input
            type="date"
            value={orderDate}
            className="form-control w-50"
            onChange={(event) => setOrderDate(event.target.value)}
          />

          
          <button
            type="button"
            onClick={handleIncrement}
            className="btn btn-dark my-2"
          >
            Add Items
          </button>

          {generateItemInputs()}
          {items.length > 0 ? (
            <button type="submit" className="btn btn-success mx-2">
              Submit
            </button>
          ) : null}

          <button
            onClick={() => props.cancel()}
            className="btn btn-danger mx-2"
          >
            Cancel
          </button>
        </form>
        {error ? (
        <div>
          <p className="text-danger">Fields Cannot Be Empty</p>
        </div>
      ) : null}
      </div>
    </>
  );
}

export default OrderForm;
