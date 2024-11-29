'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDatabases();
  }, []);

  const fetchDatabases = async () => {
    try {
      // Login request
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

      const loginData = await loginResponse.json();
      const accessToken = loginData.access_token;

      // CSRF token request
      const csrfResponse = await fetch('http://34.118.94.209:8088/api/v1/security/csrf_token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!csrfResponse.ok) {
        throw new Error('Failed to get CSRF token');
      }

      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.result;

      // Database list request
      const databaseResponse = await fetch('http://34.118.94.209:8088/api/v1/database', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-CSRFToken': csrfToken,
        },
      });

      if (!databaseResponse.ok) {
        throw new Error('Failed to fetch databases');
      }

      const databaseData = await databaseResponse.json();
      setDatabases(databaseData.result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="text-center">Loading databases...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="text-red-500">Error: {error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Superset Databases</h1>
      <div className="grid gap-4">
        {databases.map((db: any) => (
          <div key={db.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{db.database_name}</h2>
            <p className="text-gray-600">Type: {db.backend}</p>
            <p className="text-sm text-gray-500">ID: {db.id}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
