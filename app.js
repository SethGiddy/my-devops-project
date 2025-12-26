const express = require('express');
const os = require('os');
const app = express();

// Middleware to parse JSON if needed
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('DevOps Lab 2025 - Welcome!');
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/info', (req, res) => {
  res.status(200).json({
    platform: os.platform(),
    node_version: process.version
  });
});

app.get('/metrics', (req, res) => {
  res.status(200).send(`http_requests_total 1\napp_uptime_seconds ${process.uptime()}`);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server only when this file is run directly
let server;
if (require.main === module) {
  server = app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

// Export app (and server when present) for testing and external use
module.exports = { app, server };
