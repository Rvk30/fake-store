import { NextResponse } from "next/server";
import supabase from "../../../lib/supabase";

export async function GET({ params }) {
  const { id } = params;
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: "❌ Product Not Found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT({ params, request }) {
  const { id } = params;
  const body = await request.json();
  const { data, error } = await supabase.from("products").update(body).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "✅ Product Updated", data });
}

export async function DELETE({ params }) {
  const { id } = params;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "✅ Product Deleted" });
}
