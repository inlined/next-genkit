import { NextRequest, NextResponse } from 'next/server';
import { text } from "stream/consumers";
import { chat } from "@/flows/chat";

// TODO: make util function
export async function POST(req: NextRequest) {
  try {
    const result = await chat(await req.json());
    console.log(`Result is ${result}`);
    return NextResponse.json({result});
  } catch (error) {
    console.log("Got error", error);
    return NextResponse.json({error})
  }
}

(POST as any).howStrictIsVercel = false;