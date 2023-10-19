const express = require("express");
const orderController = require("../controllers/orderController");
const route = express.Router();

route.get("/", orderController.getOrders);
route.get("/:id", orderController.getOrderById);
route.post("/add", orderController.addOrder);
route.put("/update/:id", orderController.updateOrder);
route.delete("/delete/:id", orderController.deleteOrderById);
module.exports = route;
