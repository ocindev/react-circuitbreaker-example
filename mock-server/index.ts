import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  res.status(503).end('Service Unavailable');
});


app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});