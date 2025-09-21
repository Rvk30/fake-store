import { NextResponse } from "next/server";
import supabase from "../../../lib/supabase";

// GET all products
export async function GET() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST a new product
export async function POST(request) {
  const body = await request.json();
  const { data, error } = await supabase.from("products").insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "✅ Product Added", data }, { status: 201 });
}
