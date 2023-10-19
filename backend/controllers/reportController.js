const fs = require('fs');
const Order = require('../models/order');

exports.generateCSVReport = (req, res) => {
  // Fetch data from your MongoDB using your Mongoose model
  Order.find({}, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching data' });
    }

    // Create a CSV-formatted string
    let csv = 'Order Number,Customer Name,Customer Phone,Is Delivered,Product Name,Quantity,Unit Price,Total Price,Order Date,Bill Amount\n';

    data.forEach((order) => {
      // Iterate through the items array and format each product
      order.items.forEach((item) => {
        const productName = item.name; // Replace 'name' with the actual field name for the product name
        const quantity = item.quantity; // Replace 'quantity' with the actual field name for the quantity
        const unitPrice = item.price; // Replace 'unitPrice' with the actual field name for the unit price
        const totalPrice = quantity * unitPrice;

        // Format each row of data as a CSV row
        csv += `${order.orderNumber},"${order.customerName}",${order.customerPhone},${order.isDelivered},"${productName}",${quantity},${unitPrice},${totalPrice},${order.orderDate},${order.billAmount}\n`;
      });
    });

    // Create a write stream to save the CSV data
    const ws = fs.createWriteStream('report.csv');

    ws.write(csv, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing CSV data' });
      }

      // Close the write stream
      ws.end();

      // Send the generated CSV file as a response
      return res.download('report.csv', 'report.csv', (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error sending CSV file' });
        }
        // Cleanup: Remove the temporary CSV file
        fs.unlinkSync('report.csv');
      });
    });
  });
};
