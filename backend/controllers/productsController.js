const asyncHandler = require("express-async-handler");
const { pool } = require("../config/db");

const getProducts = asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
});

const getProduct = asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM products WHERE id=$1", [req.params.id]);
  if (!result.rows.length) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(result.rows[0]);
});

const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, category, image, rating } = req.body;
  const text = `INSERT INTO products(title,price,description,category,image,rating)
                VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;
  const values = [title, price, description, category, image, JSON.stringify(rating)];
  const result = await pool.query(text, values);
  res.status(201).json(result.rows[0]);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { title, price, description, category, image, rating } = req.body;
  const { id } = req.params;
  const text = `UPDATE products SET title=$1, price=$2, description=$3, category=$4, image=$5, rating=$6
                WHERE id=$7 RETURNING *`;
  const values = [title, price, description, category, image, JSON.stringify(rating), id];
  const result = await pool.query(text, values);
  if (!result.rows.length) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(result.rows[0]);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const result = await pool.query("DELETE FROM products WHERE id=$1 RETURNING *", [req.params.id]);
  if (!result.rows.length) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json({ message: "Product deleted", product: result.rows[0] });
});

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
