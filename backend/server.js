const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

//database connection
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/requestproduct", require("./routes/requests"));
app.use("/api/admin", require("./routes/userRoutes"));
app.use("/api/cart", require("./routes/cartRoutes")); 
app.use("/api/contact", require("./routes/contact"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
