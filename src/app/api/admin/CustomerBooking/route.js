import { NextResponse } from "next/server";
import supabase from "../../../../utils/supabase.js";

export async function GET() {
  try {
    const { data, error } = await supabase.from("CustomerBooking").select("*");
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
