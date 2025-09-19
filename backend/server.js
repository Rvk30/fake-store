const express = require('express');
const { Client } = require('pg');

const app = express();
app.use(express.json()); // JSON body parse karne ke liye

// ✅ PostgreSQL Connection Setup
const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Jack15june",
    database: "server"
});

con.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error", err.stack));

/**
 * TABLE STRUCTURE:
 * CREATE TABLE products (
 *   id SERIAL PRIMARY KEY,
 *   title TEXT,
 *   price NUMERIC,
 *   description TEXT,
 *   category TEXT,
 *   image TEXT,
 *   rating_rate NUMERIC,
 *   rating_count INT
 * );
 */

// ========================
// POST API (Insert Product)
// ========================
app.post('/products', async (req, res) => {
    try {
        const { id, title, price, description, category, image, rating } = req.body;

        const insert_query = `
            INSERT INTO products (id, title, price, description, category, image, rating_rate, rating_count)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        await con.query(insert_query, [
            id,
            title,
            price,
            description,
            category,
            image,
            rating?.rate,
            rating?.count
        ]);

        res.status(201).send("✅ Product Added Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Database Error");
    }
});

// ========================
// POST MULTIPLE PRODUCTS
// ========================
app.post('/products/bulk', async (req, res) => {
    try {
        const products = req.body; // Array of products

        for (const p of products) {
            const insert_query = `
                INSERT INTO products (id, title, price, description, category, image, rating_rate, rating_count)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `;
            await con.query(insert_query, [
                p.id,
                p.title,
                p.price,
                p.description,
                p.category,
                p.image,
                p.rating?.rate,
                p.rating?.count
            ]);
        }

        res.status(201).send("✅ All Products Inserted");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Bulk Insert Failed");
    }
});

// ========================
// GET ALL PRODUCTS
// ========================
app.get('/products', async (req, res) => {
    try {
        const result = await con.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err);
    }
});

// ========================
// GET PRODUCT BY ID
// ========================
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await con.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rows.length === 0) return res.status(404).send("❌ Product Not Found");

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

// ========================
// UPDATE PRODUCT BY ID
// ========================
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, category, image, rating } = req.body;

        const update_query = `
            UPDATE products
            SET title=$1, price=$2, description=$3, category=$4, image=$5, rating_rate=$6, rating_count=$7
            WHERE id=$8
        `;

        await con.query(update_query, [
            title,
            price,
            description,
            category,
            image,
            rating?.rate,
            rating?.count,
            id
        ]);

        res.send("✅ Product Updated");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Update Failed");
    }
});

// ========================
// DELETE PRODUCT BY ID
// ========================
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await con.query('DELETE FROM products WHERE id=$1', [id]);
        res.send("✅ Product Deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Delete Failed");
    }
});

// ========================
// START SERVER
// ========================
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
