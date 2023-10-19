const express = require("express");
const supplierController = require("../controllers/supplierController");
const route = express.Router();

route.get("/", supplierController.getAllSupplier);
route.get("/:id", supplierController.getSupplierById);
route.post("/add", supplierController.addSupplier);
route.put("/update/:id", supplierController.updateSupplier);
route.delete("/delete/:id", supplierController.deleteSupplier);

module.exports = route;
