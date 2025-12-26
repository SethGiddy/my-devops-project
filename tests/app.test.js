const request = require('supertest');
const mod = require('../app');
const app = mod.app || mod; // support previous exports
const server = mod.server;

describe('App Endpoints', () => {
  afterAll(() => {
    if (server && typeof server.close === 'function') server.close();
  });

  test('GET / should return welcome page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('DevOps Lab 2025');
  });

  test('GET /health should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.timestamp).toBeDefined();
    expect(typeof response.body.uptime).toBe('number');
  });

  test('GET /info should return system info', async () => {
    const response = await request(app).get('/info');
    expect(response.status).toBe(200);
    expect(response.body.platform).toBeDefined();
    expect(response.body.node_version).toBeDefined();
  });

  test('GET /metrics should return prometheus metrics', async () => {
    const response = await request(app).get('/metrics');
    expect(response.status).toBe(200);
    expect(response.text).toContain('http_requests_total');
    expect(response.text).toContain('app_uptime_seconds');
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });
});