const { pool } = require("../config/db");

exports.createOrder = async (userId, date) => {
  const result = await pool.query(
    "INSERT INTO orders (user_id, order_date) VALUES ($1,$2) RETURNING id",
    [userId, date]
  );
  return result.rows[0].id;
};

exports.addProductToOrder = async (orderId, productId, quantity) => {
  await pool.query(
    "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1,$2,$3)",
    [orderId, productId, quantity]
  );
};

exports.getAllOrders = async () => {
  return await pool.query("SELECT * FROM orders");
};

exports.getProductsForOrder = async (orderId) => {
  return await pool.query(
    "SELECT product_id, quantity FROM order_products WHERE order_id=$1",
    [orderId]
  );
};

exports.deleteOrder = async (id) => {
  await pool.query("DELETE FROM orders WHERE id=$1", [id]);
};
