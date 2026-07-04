const http = require('http');
const { URL } = require('url');

const mockEmployee = {
  id: 'b81ef392-12d8-4f92-9b21-4fa3e46c78bc',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@hrms.com',
  role: 'Employee',
  department: 'Engineering',
};

const mockAdmin = {
  id: 'a59cf837-73d8-4f24-9b21-4fa3e46c750b',
  firstName: 'System',
  lastName: 'Administrator',
  email: 'admin@hrms.com',
  role: 'Admin',
  department: 'Human Resources',
};

function sendJSON(res, status, obj, origin) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin || 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  });
  res.end(body);
}

function collectRequestBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsed = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsed.pathname;
  const origin = req.headers.origin || 'http://localhost:5173';

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    });
    return res.end();
  }

  if (pathname === '/api/v1/auth/refresh' && req.method === 'POST') {
    return sendJSON(res, 200, { data: { accessToken: 'mock-refresh-token' } }, origin);
  }

  if (pathname === '/api/v1/auth/login' && req.method === 'POST') {
    const body = await collectRequestBody(req);
    const { email, password } = body || {};
    if (email === 'jane@hrms.com' && password === 'password123') {
      return sendJSON(res, 200, { data: { accessToken: 'mock-employee-token', user: mockEmployee } }, origin);
    }
    if (email === 'admin@hrms.com' && password === 'password123') {
      return sendJSON(res, 200, { data: { accessToken: 'mock-admin-token', user: mockAdmin } }, origin);
    }
    return sendJSON(res, 401, { error: { message: 'Invalid credentials' } }, origin);
  }

  if (pathname === '/api/v1/auth/logout' && req.method === 'POST') {
    return sendJSON(res, 200, {}, origin);
  }

  if (pathname === '/api/v1/auth/me' && req.method === 'GET') {
    return sendJSON(res, 200, { data: { user: mockEmployee } }, origin);
  }

  // Fallback for unknown paths
  return sendJSON(res, 404, { error: { message: 'Not found' } }, origin);
});

const PORT = 5000;
server.listen(PORT, () => {
  process.stdout.write(`Mock auth server listening on http://localhost:${PORT}\n`);
});
