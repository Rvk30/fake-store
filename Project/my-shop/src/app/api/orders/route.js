import { NextResponse } from "next/server";
import supabase from "../../../lib/supabase";

export async function GET() {
  const { data: orders, error } = await supabase.from("orders").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const finalOrders = [];
  for (const order of orders) {
    const { data: products } = await supabase
      .from("order_products")
      .select("product_id, quantity")
      .eq("order_id", order.id);

    finalOrders.push({
      id: order.id,
      userId: order.user_id,
      date: order.order_date,
      products,
    });
  }

  return NextResponse.json(finalOrders);
}

export async function POST(request) {
  const orders = await request.json();
  if (!Array.isArray(orders) || !orders.length)
    return NextResponse.json({ error: "❌ Orders array required" }, { status: 400 });

  const createdOrders = [];

  for (const order of orders) {
    const { userId, date, products } = order;
    if (!userId || !date || !products?.length) continue;

    const { data: orderData, error: orderErr } = await supabase
      .from("orders")
      .insert([{ user_id: userId, order_date: date }])
      .select("id")
      .single();

    if (orderErr) continue;

    const orderId = orderData.id;
    const orderProducts = products.map(p => ({
      order_id: orderId,
      product_id: p.productId,
      quantity: p.quantity,
    }));

    await supabase.from("order_products").insert(orderProducts);
    createdOrders.push({ orderId, userId, date });
  }

  return NextResponse.json({ message: "Orders processed", orders: createdOrders }, { status: 201 });
}
