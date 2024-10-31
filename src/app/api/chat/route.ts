import type { NextApiRequest, NextApiResponse} from 'next';
import { NextResponse } from 'next/server';
import { flow, caller } from '@/utils/nextGenkit';
import { text } from "stream/consumers";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setInterval(resolve, ms));
}

export function GET(req: NextApiRequest) {
  return NextResponse.json({caller: caller()});
}

export async function POST(req: NextApiRequest) {
  const json = JSON.parse(await text(req.body));
  return NextResponse.json({result: await flow(json)});
}

export const dataField = "text";