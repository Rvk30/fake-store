const express = require('express');
const { Client } = require('pg');

const app = express();
app.use(express.json());

// ✅ PostgreSQL Connection
const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "FasHion@25",
    database: "server" // ya mainpost, jaisa DB aap use kar rahe ho
});

con.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error", err.stack));

/* ============================
   PRODUCTS ROUTES
============================ */

// POST Single Product
app.post('/products', async (req, res) => {
    try {
        const { id, title, price, description, category, image, rating } = req.body;
        const insert_query = `
            INSERT INTO products (id, title, price, description, category, image, rating_rate, rating_count)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        `;
        await con.query(insert_query, [
            id, title, price, description, category, image, rating?.rate, rating?.count
        ]);
        res.status(201).send("✅ Product Added Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Database Error");
    }
});

// POST Multiple Products
app.post('/products/bulk', async (req, res) => {
    try {
        const products = req.body;
        for (const p of products) {
            await con.query(
                `INSERT INTO products (id, title, price, description, category, image, rating_rate, rating_count)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
                 [p.id, p.title, p.price, p.description, p.category, p.image, p.rating?.rate, p.rating?.count]
            );
        }
        res.status(201).send("✅ All Products Inserted");
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Bulk Insert Failed");
    }
});

// GET All Products
app.get('/products', async (req, res) => {
    try {
        const result = await con.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET Product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await con.query('SELECT * FROM products WHERE id=$1', [id]);
        if (!result.rows.length) return res.status(404).send("❌ Product Not Found");
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

// UPDATE Product by ID
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, category, image, rating } = req.body;
        await con.query(
            `UPDATE products SET title=$1, price=$2, description=$3, category=$4, image=$5, rating_rate=$6, rating_count=$7
             WHERE id=$8`,
            [title, price, description, category, image, rating?.rate, rating?.count, id]
        );
        res.send("✅ Product Updated");
    } catch (err) {
        res.status(500).send("❌ Update Failed");
    }
});

// DELETE Product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await con.query('DELETE FROM products WHERE id=$1', [id]);
        res.send("✅ Product Deleted");
    } catch (err) {
        res.status(500).send("❌ Delete Failed");
    }
});

/* ============================
   ORDERS ROUTES
============================ */

// POST Multiple Orders
app.post('/orders', async (req, res) => {
    const orders = req.body;
    if (!Array.isArray(orders) || !orders.length)
        return res.status(400).send("❌ Orders array required");

    const createdOrders = [];

    for (const order of orders) {
        const { userId, date, products } = order;
        if (!userId || !date || !products?.length) continue;

        try {
            const orderRes = await con.query(
                "INSERT INTO orders (user_id, order_date) VALUES ($1,$2) RETURNING id",
                [userId, date]
            );
            const orderId = orderRes.rows[0].id;

            for (const p of products) {
                await con.query(
                    "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1,$2,$3)",
                    [orderId, p.productId, p.quantity]
                );
            }
            createdOrders.push({ orderId, userId, date });
        } catch (err) {
            console.error(`Failed order for user ${userId}:`, err.message);
        }
    }

    res.status(201).json({ message: "Orders processed", orders: createdOrders });
});

// GET All Orders
app.get('/orders', async (req, res) => {
    try {
        const ordersRes = await con.query("SELECT * FROM orders");
        const orders = await Promise.all(
            ordersRes.rows.map(async row => {
                const productsRes = await con.query(
                    "SELECT product_id, quantity FROM order_products WHERE order_id=$1",
                    [row.id]
                );
                return {
                    id: row.id,
                    userId: row.user_id,
                    date: row.order_date,
                    products: productsRes.rows.map(p => ({
                        productId: p.product_id,
                        quantity: p.quantity
                    }))
                };
            })
        );
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("❌ Database error");
    }
});

// DELETE Order by ID
app.delete('/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await con.query('DELETE FROM orders WHERE id=$1', [id]);
        res.send("✅ Order Deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("❌ Delete Failed");
    }
});

/* ============================
   SERVER START
============================ */
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
