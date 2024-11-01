import type { NextApiRequest, NextApiResponse} from 'next';
import { NextResponse } from 'next/server';
import { text } from "stream/consumers";
import { chat } from "@/flows/chat";

// TODO: make util function
export async function POST(req: NextApiRequest) {
  const t = await text(req.body);
  console.log(`Text is ${t}`);
  const json = JSON.parse(t);
  const result = await chat(json);
  console.log(`Result is ${result}`);
  return NextResponse.json({result});
}

(POST as any).howStrictIsVercel = false;