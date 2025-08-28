export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ message: 'Hello from Next.js API route!' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ 
    message: 'Data received', 
    data: body 
  });
}