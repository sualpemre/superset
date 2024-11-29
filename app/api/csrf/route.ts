import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    const csrfResponse = await fetch('http://34.118.94.209:8088/api/v1/security/csrf_token', {
      method: 'GET',
      headers: {
        'Authorization': authHeader || '',
      },
    });

    if (!csrfResponse.ok) {
      throw new Error('Failed to get CSRF token');
    }

    const data = await csrfResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
