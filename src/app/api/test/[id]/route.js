import { NextResponse } from "next/server";

//endpoit: /api/test/[id] ex /api/test/1 endpoint params
export function GET(request, { params: { id } }) {
  return NextResponse.json({ message: "Hello", id: id });
}
