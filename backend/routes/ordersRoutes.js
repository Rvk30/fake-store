const express = require("express");
const { createOrders, getOrders, deleteOrder } = require("../controllers/ordersController");
const router = express.Router();

router.post("/", createOrders);
router.get("/", getOrders);
router.delete("/:id", deleteOrder);

module.exports = router;
