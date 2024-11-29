import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const csrfToken = request.headers.get('X-CSRFToken');

    const databaseResponse = await fetch('http://34.118.94.209:8088/api/v1/database', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader || '',
        'X-CSRFToken': csrfToken || '',
      },
    });

    if (!databaseResponse.ok) {
      throw new Error('Failed to fetch databases');
    }

    const data = await databaseResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
