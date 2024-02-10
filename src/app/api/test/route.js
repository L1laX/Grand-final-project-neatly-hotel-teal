//endpoit: /api/test?keywords=hello query params
import { NextResponse } from "next/server";
export function GET(request) {
  const serchParams = request.nextUrl.searchParams;
  const keywords = serchParams.get("keywords");

  return NextResponse.json({ message: "Hello", keywords: keywords });
}
