const Order = require("../models/order");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    res.status(201).json({
      orders: orders,
    });
  } catch (e) {
    res.status(400).json({
      e: e,
    });
  }
};

const addOrder = async (req, res) => {
  const orderNumber = req.body.orderNumber;
  const customerName = req.body.customerName;
  const customerPhone = req.body.phoneNumber;
  const items = req.body.items;
  const orderDate = req.body.orderDate;
  const isDelivered = req.body.isDelivered;

  const billAmount = req.body.billAmount;

  try {
    const order = await Order.create({
      orderNumber,
      billAmount,
      customerName,
      isDelivered,
      customerPhone,
     
      items,
      orderDate,
    });

    res.status(201).json({
      order: order,
    });
  } catch (error) {
    res.status(401).json({
      e: error,
    });
  }
};

const updateOrder = async (req, res) => {
  const _id = req.params.id;

  const orderNumber = req.body.orderNumber;
  const customerName = req.body.customerName;
  const customerPhone = req.body.phoneNumber;
  const items = req.body.items;
  const orderDate = req.body.orderDate;
  const isDelivered = req.body.isDelivered;
  const billAmount = req.body.billAmount;
  try {
    const order = await Order.findOneAndUpdate(
      { _id },
      {
        orderNumber,
        billAmount,
        customerName,
        isDelivered,
        customerPhone,
         items,
        orderDate,
      }
    );

    res.status(201).json({
      message: "Update Successful",
      order: order,
    });
  } catch (e) {
    res.status(401).json({
      e: e,
    });
  }
};

const deleteOrderById = async (req, res) => {
  const _id = req.params.id;
  try {
    const order = await Order.findByIdAndDelete(_id);

    res.status(200).json({
      prod: order,
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const getOrderById = async (req, res) => {
  const _id = req.params.id;
  try {
    const order = await Order.findById(_id);

    res.status(200).json({
      order: order,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

module.exports = {
  getOrders,
  addOrder,
  deleteOrderById,
  updateOrder,
  getOrderById,
};  