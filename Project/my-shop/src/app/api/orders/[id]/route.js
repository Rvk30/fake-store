import { NextResponse } from "next/server";
import supabase from "../../../lib/supabase";

export async function DELETE({ params }) {
  const { id } = params;
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "✅ Order Deleted" });
}
