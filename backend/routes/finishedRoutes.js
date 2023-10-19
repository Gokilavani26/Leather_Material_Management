const express = require("express");
const finishedController = require("../controllers/finishedController");
const route = express.Router();

route.get("/category/:productCategory", finishedController.getProductByCategory);
route.get("/", finishedController.getAllProduct);
route.get("/:id", finishedController.getProductById);
route.post("/add", finishedController.createProduct);
route.put("/update/:id", finishedController.updateProduct);
route.delete("/delete/:id", finishedController.deleteProductById);
module.exports = route;
