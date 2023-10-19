//library importations
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

//project importations
const authRoutes = require("./routes/authRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const rawRoutes = require("./routes/rawRoutes");
const finishedRoutes = require("./routes/finishedRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/payRoutes");
const reportRoutes = require("./routes/reportRoutes");
 const forecastRoutes = require("./routes/forecastRoutes");

// express app
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use("/public", express.static("public"));
app.use(express.static("files"));

//routes use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use("/raw", rawRoutes);
app.use("/finish", finishedRoutes);
app.use("/supplier", supplierRoutes);
app.use("/payment", paymentRoutes);
app.use("/order", orderRoutes);
app.use("/report", reportRoutes);
app.use('/forecasts', forecastRoutes);

//routes
const port = process.env.PORT || 5000;
mongoose.set("strictQuery", true);
mongoose.connect(`mongodb://127.0.0.1:${process.env.MONGOOSE_PORT}/MaterialsManagement`, { useUnifiedTopology: true, family: 4 });

app.listen(port);