const orderModel = require("../models/orderModel");

exports.createOrders = async (req, res, next) => {
  try {
    const orders = req.body;
    if (!Array.isArray(orders) || !orders.length) {
      return res.status(400).send("❌ Orders array required");
    }

    const createdOrders = [];
    for (const order of orders) {
      const { userId, date, products } = order;
      if (!userId || !date || !products?.length) continue;

      const orderId = await orderModel.createOrder(userId, date);

      for (const p of products) {
        await orderModel.addProductToOrder(orderId, p.productId, p.quantity);
      }

      createdOrders.push({ orderId, userId, date });
    }
    res.status(201).json({ message: "Orders processed", orders: createdOrders });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const ordersRes = await orderModel.getAllOrders();
    const orders = await Promise.all(
      ordersRes.rows.map(async (row) => {
        const productsRes = await orderModel.getProductsForOrder(row.id);
        return {
          id: row.id,
          userId: row.user_id,
          date: row.order_date,
          products: productsRes.rows,
        };
      })
    );
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await orderModel.deleteOrder(req.params.id);
    res.send("✅ Order Deleted");
  } catch (err) {
    next(err);
  }
};
