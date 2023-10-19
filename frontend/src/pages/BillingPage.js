import axios from "axios";
import React, { useEffect, useState } from "react";
import GenerateBillPdf from "../components/GenerateBillPdf";

function BillingPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/order").then((res) => {
      setOrders(res.data.orders);
    });
  }, [orders]);

  return (
    <>
      <div className="d-flex justify-content-center my-4">
        <div className="table-responsive">
          <caption>
            <h3>Bills</h3>
          </caption>
          <table className="table w-auto">
            <thead>
              <tr className="border text-center">
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Customer Name</th>
                <th>Orderd Items</th>
                <th>Total Amount</th>
                <th>Download Bill</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id} className="border text-center">
                    <td>{order.orderNumber}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.customerName}</td>

                    <td>
                      {order.items.map((item) => {
                        return (
                          <div>
                            {item.name} | {item.quantity} | Rs.{item.price}
                          </div>
                        );
                      })}
                    </td>
                    <td>{order.billAmount}</td>
                    <td>
                      <GenerateBillPdf order={order} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BillingPage;
