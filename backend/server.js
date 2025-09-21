const express = require("express");
const { connectDB } = require("./config/db");

// ✅ spelling same rakhna as per folder
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes"); // fixed (plural)
const orderRoutes = require("./routes/ordersRoutes");     // fixed (plural)

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
