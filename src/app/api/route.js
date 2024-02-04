import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json("this is get method form /register");
}
