const con = require('../config/db');

// ✅ GET All Products
exports.getProducts = async (req, res) => {
    try {
        const result = await con.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err);
    }
};

// ✅ GET Product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await con.query('SELECT * FROM products WHERE id=$1', [id]);
        if (!result.rows.length) return res.status(404).send("❌ Product Not Found");
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
};

// ✅ POST Single Product
exports.createProduct = async (req, res) => {
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
        res.status(500).send("❌ Database Error");
    }
};

// ✅ UPDATE Product
exports.updateProduct = async (req, res) => {
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
};

// ✅ DELETE Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await con.query('DELETE FROM products WHERE id=$1', [id]);
        res.send("✅ Product Deleted");
    } catch (err) {
        res.status(500).send("❌ Delete Failed");
    }
};
