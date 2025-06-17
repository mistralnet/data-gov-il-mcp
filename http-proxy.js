// http-proxy.js
import http from 'http';
import { spawn } from 'child_process';

const PORT = process.env.PORT || 8080;

// יצירת child process שיישאר חי
let mcpChild = null;

function startMcpServer() {
  mcpChild = spawn('node', ['./stdio.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  mcpChild.stderr.on('data', (data) => {
    console.error('MCP stderr:', data.toString());
  });

  mcpChild.on('close', (code) => {
    console.log(`MCP child process exited with code ${code}`);
    // אם התהליך נסגר, התחל אותו מחדש
    setTimeout(startMcpServer, 1000);
  });

  mcpChild.on('error', (err) => {
    console.error('MCP child process error:', err);
  });

  return mcpChild;
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        // אם אין child process, צור אחד
        if (!mcpChild || mcpChild.killed) {
          mcpChild = startMcpServer();
          // תן לו זמן להתחיל
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const inputString = body;
        
        let responseData = '';
        let errorData = '';

        // הגדרת מאזינים לתגובה
        const responsePromise = new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Request timeout'));
          }, 30000); // 30 שניות timeout

          const onData = (data) => {
            responseData += data.toString();
            // חפש סוף הודעה (שורה ריקה או JSON עם newline)
            if (responseData.includes('\n')) {
              clearTimeout(timeout);
              mcpChild.stdout.removeListener('data', onData);
              resolve();
            }
          };

          mcpChild.stdout.on('data', onData);
          mcpChild.stderr.on('data', (data) => {
            errorData += data.toString();
          });
        });

        // שלח את הבקשה
        mcpChild.stdin.write(inputString + '\n');

        await responsePromise;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(responseData.trim());

      } catch (error) {
        console.error('❌ Error processing request:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: 'Internal Server Error', 
          details: error.message
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

// התחל את MCP server
startMcpServer();

server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

// טיפול נקי בסגירה
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  if (mcpChild) {
    mcpChild.kill();
  }
  server.close(() => {
    process.exit(0);
  });
});
