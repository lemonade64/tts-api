import { NextResponse } from "next/server";
import text2wav from "text2wav";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "POST ONLY" }, { status: 405 });
  }

  try {
    const { text } = await req.json();

    const response = {};

    return NextResponse.json({ response: response });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
