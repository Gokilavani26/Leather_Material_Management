const express = require("express");
const materialController = require("../controllers/materialController");
const route = express.Router();

route.get("/category/:productCategory", materialController.getMaterialByCategory);
route.get("/", materialController.getAllMaterial);
route.get("/:id", materialController.getMaterialById);
route.post("/add", materialController.createMaterial);
route.put("/update/:id", materialController.updateMaterial);
route.delete("/delete/:id", materialController.deleteMaterialById);
module.exports = route;
