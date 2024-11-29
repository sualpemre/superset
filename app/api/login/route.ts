import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const loginResponse = await fetch('http://34.118.94.209:8088/api/v1/security/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'kereviz',
        provider: 'db',
        refresh: true,
      }),
    });

    if (!loginResponse.ok) {
      throw new Error('Login failed');
    }

    const data = await loginResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
