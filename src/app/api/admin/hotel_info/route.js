import { NextResponse } from "next/server";
import supabase from "../../../../utils/supabase.js";

export async function GET() {
  try {
    const { data, error } = await supabase.from("hotelInfo").select("*");

    console.log(data);
    if (error) {
      console.error("Error fetching Hotel Information:", error);
      return NextResponse.error("Error fetching Hotel Information");
    }
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching Hotel Information:", error);
    return NextResponse.error("Error fetching Hotel Information");
  }
}

export async function PUT() {
  try {
    const { data, error } = await supabase.from("hotelInfo").select("*");

    console.log(data);
    if (error) {
      console.error("Error fetching Hotel Information:", error);
      return NextResponse.error("Error fetching Hotel Information");
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching Hotel Information:", error);
    return NextResponse.error("Error fetching Hotel Information");
  }
}

export async function POST(request) {
  try {
    const requestData = await request.json();
    const { data, error } = await supabase
      .from("hotelInfo")
      .insert([requestData]);

    if (error) {
      console.error("Error adding hotel information:", error);
      return {
        status: 500,
        body: "Error adding hotel information",
      };
    }

    if (data && data.length > 0) {
      console.log("Hotel information added successfully:", data[0]);
      return {
        status: 200,
        body: JSON.stringify(data[0]),
      };
    }

    console.error("Data is null after inserting hotel information");
    return {
      status: 500,
      body: "Error adding hotel information",
    };
  } catch (error) {
    console.error("Error adding hotel information:", error);
    return {
      status: 500,
      body: "Error adding hotel information",
    };
  }
}
