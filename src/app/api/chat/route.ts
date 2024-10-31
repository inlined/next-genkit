import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setInterval(resolve, ms));
}

export async function GET(req: NextApiRequest) {
  /*
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode("data: Hello, "));
      await sleep(1000);
      controller.enqueue(encoder.encode(" world!"));
    }
  })
  
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
  */
 await sleep(500);
 return NextResponse.json({[dataField]: "Hello, world!"});
}

export const dataField = "text";