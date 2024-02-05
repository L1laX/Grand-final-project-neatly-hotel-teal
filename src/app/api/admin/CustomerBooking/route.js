import { NextResponse } from "next/server";
import { supabaseneung } from "@/lib/neungSUPABASE.js";

export async function GET() {
  try {
    const { data, error } = await supabaseneung
      .from("CustomerBooking")
      .select("*");
    if (error) {
      console.error("Error fetching customer bookings:", error);
      return NextResponse.error("Error fetching customer bookings");
    }
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching customer bookings:", error);
    return NextResponse.error("Error fetching customer bookings");
  }
}
