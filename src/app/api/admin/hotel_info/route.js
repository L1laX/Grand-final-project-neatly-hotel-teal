import supabase from "../../../../utils/supabase.js";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

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
// export async function POST(request) {
//   try {
//     const requestData = await request.json();
//     const { data, error } = await supabase
//       .from("hotelInfo")
//       .insert([requestData]);

//     if (error) {
//       console.error("Error adding hotel information:", error);
//       return {
//         status: 500,
//         body: "Error adding hotel information",
//       };
//     }

//     if (data && data.length > 0) {
//       console.log("Hotel information added successfully:", data[0]);
//       return {
//         status: 200,
//         body: JSON.stringify(data[0]),
//       };
//     }

//     console.error("Data is null after inserting hotel information");
//     return {
//       status: 500,
//       body: "Error adding hotel information",
//     };
//   } catch (error) {
//     console.error("Error adding hotel information:", error);
//     return {
//       status: 500,
//       body: "Error adding hotel information",
//     };
//   }
// }

import { supabase } from "../../../utils/supabase.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { hotelName, hotelDescription } = req.body;

    try {
      // Post data to Supabase
      const { data, error } = await supabase.from("hotelInfo").insert([
        {
          hotelName,
          hotelDescription,
        },
      ]);

      if (error) {
        console.error("Error submitting hotel information:", error);
        res.status(500).json({ error: "Error submitting hotel information" });
      } else {
        console.log("Hotel information submitted successfully");
        res
          .status(200)
          .json({ message: "Hotel information submitted successfully" });
      }
    } catch (error) {
      console.error("Error submitting hotel information:", error);
      res.status(500).json({ error: "Error submitting hotel information" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const { data, error } = await supabase
      .from("hotelInfo")
      .delete()
      .eq("id", id);

    console.log(data);
    if (error) {
      console.error("Error deleting Hotel Information:", error);
      return NextResponse.error("Error deleting Hotel Information");
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error deleting Hotel Information:", error);
    return NextResponse.error("Error deleting Hotel Information");
  }
}
