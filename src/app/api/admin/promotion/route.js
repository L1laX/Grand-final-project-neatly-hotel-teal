import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const keywords = searchParams.get("keywords");

  try {
    // Fetch promotions data
    const promotions = await prisma.promotion.findMany({
      select: {
        id: true,
        promotionCode: true,
        discount: true,
        name: true,
        // Add other fields as needed
      },
    });

    // Fetch room data, optionally filtered by keywords
    let roomManagement = [];
    if (!keywords) {
      roomManagement = await prisma.room.findMany({
        select: {
          id: true,
          name: true,
          size: true,
          bedType: true,
          status: true,
          guests: true,
          description: true,
          pricePerNight: true,
          promotionPrice: true,
          // Add other fields as needed
        },
      });
    } else {
      roomManagement = await prisma.room.findMany({
        where: {
          OR: [
            {
              name: {
                contains: keywords,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: keywords,
                mode: "insensitive",
              },
            },
            // Add other fields you want to search by
          ],
        },
        select: {
          id: true,
          name: true,
          size: true,
          bedType: true,
          status: true,
          guests: true,
          description: true,
          pricePerNight: true,
          promotionPrice: true,
          // Add other fields as needed
        },
      });
    }

    // Return both promotions and rooms data
    return NextResponse.json({
      success: true,
      data: {
        promotions,
        rooms: roomManagement,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error("Error fetching data");
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { code, discount, roomName } = JSON.parse(req.body);

      // Optional: Validate the inputs as needed
      if (!code || !discount || !roomName) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Find the room by name to link the promotion to it (assuming room names are unique)
      const room = await prisma.room.findUnique({
        where: {
          name: roomName,
        },
      });

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      // Create the promotion
      const promotion = await prisma.promotion.create({
        data: {
          promotionCode: code,
          discount: parseInt(discount, 10),
          name: roomName, // Assuming you want to store the room name here
          // Add other fields as needed
        },
      });

      return res.status(200).json({ success: true, promotion });
    } catch (error) {
      console.error("Failed to add promotion:", error);
      return res.status(500).json({ error: "Failed to add promotion" });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
