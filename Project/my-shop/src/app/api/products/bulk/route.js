import { NextResponse } from "next/server";
import supabase from "../../../../lib/supabase";

export async function POST(request) {
  const body = await request.json();
  const { data, error } = await supabase.from("products").insert(body);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "✅ All Products Inserted", data }, { status: 201 });
}
