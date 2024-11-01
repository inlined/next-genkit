import { NextRequest, NextResponse } from 'next/server';
import { text } from "stream/consumers";
import { chat } from "@/flows/chat";

// TODO: make util function
export async function POST(req: NextRequest) {
  const result = await chat(await req.json());
  console.log(`Result is ${result}`);
  return NextResponse.json({result});
}

(POST as any).howStrictIsVercel = false;