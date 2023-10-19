import axios from "axios";
import React, { useEffect, useState } from "react";

function OrderComponent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/order").then((res) => {
      setOrders(res.data.orders);
    });
  }, [orders]);

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:7000/order/delete/${id}`).then((res) => {
      console.log(res);
    });
  };

  const updateHandler = (id) => {
    axios.get(`http://localhost:7000/order/${id}`).then((res) => {
      const order = {
        ...res.data.order,
        isDelivered: true,
      };
      console.log(order);

      axios
        .put(`http://localhost:7000/order/update/${id}`, order)
        .then((res) => alert(res.data.message))
        .catch((e) => {
          console.log(e);
        });
    });
  };
  return (
    <div className="table-responsive justify-content-center my-6 mx-5 text-center">
      <table className="table table-striped-columns">
        <thead>
          <tr className="border-dark text-center">
            <th>Order ID</th>
            
            <th>Customer Name</th>
            <th>Customer Phone Number</th>
            <th>Ordered Items</th>
            <th>Date</th>
            {/* <th>Delivery Date</th> */}
            {/* <th>Order Status</th> */}
            <th>Total Amount</th>
            <th colSpan={1}>Options</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order._id} className="border text-center">
                <td>{order.orderNumber}</td>
                
                <td>{order.customerName}</td>
                <td>{order.customerPhone}</td>

                <td>
                  {order.items.map((item) => {
                    return (
                      <div>
                        {item.name} - {item.quantity}   
                      </div>
                    );
                  })}
                </td>
                <td>{order.orderDate}</td>
                {/* <td>{order.deliveryDate}</td> */}
                {/* <td>
                  {order.isDelivered === true ? (
                    <p>
                      <i>Delivered</i>
                    </p>
                  ) : (
                    <p>
                      <i>Not Delivered</i>
                    </p>
                  )}
                </td> */}
                <td>{order.billAmount}</td>
                
                {/* {order.isDelivered ? null : (
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={() => updateHandler(order._id)}
                    >
                      Update
                    </button>
                  </td>

                  
                )} */}
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(order._id)}
                  >
                    Delete                   </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderComponent;
