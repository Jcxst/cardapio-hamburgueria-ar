const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.usdz': 'model/vnd.usdz+zip',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        addresses.push(net.address);
      }
    }
  }
  return addresses;
}

const server = http.createServer((req, res) => {
  // CORS headers for WebXR / Model-Viewer cross-origin access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API endpoint to get network IP for mobile QR Code pairing
  if (req.url === '/api/info') {
    const ips = getLocalIpAddresses();
    const primaryIp = ips.find(ip => ip.startsWith('192.168.') || ip.startsWith('10.')) || ips[0] || 'localhost';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      port: PORT,
      localIps: ips,
      primaryIp,
      mobileUrl: `http://${primaryIp}:${PORT}`
    }));
    return;
  }

  // Sanitize path
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  let safePath = path.normalize(decodeURIComponent(parsedUrl.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(ROOT, safePath);

  // Security: prevent path traversal out of ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Support HTTP Range Requests (essential for 3D model streaming and iOS Safari)
    const range = req.headers.range;
    const fileSize = stats.size;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        res.writeHead(416, {
          'Content-Range': `bytes */${fileSize}`
        });
        res.end();
        return;
      }

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Accept-Ranges': 'bytes',
        'Content-Type': contentType,
        'Cache-Control': ext === '.glb' ? 'public, max-age=86400' : 'no-cache'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const ips = getLocalIpAddresses();
  const primaryIp = ips.find(ip => ip.startsWith('192.168.') || ip.startsWith('10.')) || ips[0] || 'localhost';

  console.log('====================================================');
  console.log('🍔 AURA BURGER - Cardápio Digital em Realidade Aumentada');
  console.log('====================================================');
  console.log(`📡 Local:    http://localhost:${PORT}`);
  console.log(`📱 No Celular (Mesmo Wi-Fi): http://${primaryIp}:${PORT}`);
  console.log('====================================================');
  console.log('💡 Abra o link no celular para projetar os burgers na mesa em escala 1:1!');
});
