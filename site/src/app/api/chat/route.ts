import type { NextApiRequest, NextApiResponse} from 'next';
import { NextResponse } from 'next/server';
import { text } from "stream/consumers";
import { chat } from "@/flows/chat";

// Where the response is
export const dataField = "result";

// TODO: make util function
export async function POST(req: NextApiRequest) {
  const t = await text(req.body);
  console.log(`Text is ${t}`);
  const json = JSON.parse(t);
  return NextResponse.json({[dataField]: await chat(json)});
}
