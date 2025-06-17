// http-proxy.js
import http from 'http';
import { spawn } from 'child_process';

const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const inputString = body; 
        const child = spawn('node', ['./stdio.js']); 

        let stdioOutput = '';
        child.stdout.on('data', (data) => {
          stdioOutput += data.toString();
        });

        let stdioError = '';
        child.stderr.on('data', (data) => {
          stdioError += data.toString();
        });

        child.stdin.write(inputString);
        child.stdin.end();

        await new Promise((resolve, reject) => {
          child.on('close', (code) => {
            if (code === 0) {
              resolve();
            } else {
              reject(new Error(`stdio.js exited with code ${code}. Error: ${stdioError || 'Unknown stdio error'}`));
            }
          });
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(stdioOutput);

      } catch (error) {
        console.error('❌ Error processing request:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            error: 'Internal Server Error', 
            details: error.message, 
            stdioError: error.stdioError || 'N/A' 
        }));
      }
    });
  } else {
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});