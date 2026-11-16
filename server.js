const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');

// Load environment variables from .env
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...vals] = trimmed.split('=');
        if (key && vals.length) {
          process.env[key.trim()] = vals.join('=').trim();
        }
      }
    });
  }
}
loadEnv();

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname);
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ypibmhjqobjrvdvqggcn.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_kX1-9OdGfjSReK61nTpi8Q_xs3lB_ph';

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

// Fallback products cache if Supabase table is not yet migrated
const FALLBACK_PRODUCTS = [
  {
    id: 'smash-king',
    name: 'Aura Smash King Deluxe',
    category: 'smash',
    category_label: 'Smash Burgers',
    price: 39.90,
    original_price: 45.90,
    rating: 5.0,
    reviews_count: 512,
    badge: '🔥 Favorito da Casa',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80',
    model_glb: 'assets/models/burger-smash.glb',
    model_https_url: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-smash.glb',
    real_scale_cm: '13.5 cm (Escala 1:1 Real)',
    prep_time: '12-15 min',
    weight: '180g de Blend Smash',
    short_description: 'Dois ultra-smash 90g com crosta caramelizada Maillard, triplo cheddar inglês fundido e fatias de bacon crocante em lenha de macieira.'
  },
  {
    id: 'grand-truffle',
    name: 'The Grand Truffle Master',
    category: 'artesanais',
    category_label: 'Burgers Artesanais',
    price: 46.90,
    original_price: 54.90,
    rating: 4.9,
    reviews_count: 384,
    badge: '🏆 Mais Vendido',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    model_glb: 'assets/models/burger-monster.glb',
    model_https_url: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-monster.glb',
    real_scale_cm: '14.1 cm (Escala 1:1 Real)',
    prep_time: '15-20 min',
    weight: '220g de Blend Nobre',
    short_description: 'Dois smash Angus 100g com queijo gouda holandês no maçarico, cogumelos salteados no azeite trufado e maionese de alho negro no brioche selado.'
  },
  {
    id: 'smoked-ribs',
    name: 'Smoked BBQ Ribs Burger',
    category: 'artesanais',
    category_label: 'Burgers Artesanais',
    price: 49.90,
    original_price: 58.00,
    rating: 4.8,
    reviews_count: 229,
    badge: '⭐ Blend Nobre de Costela',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
    model_glb: 'assets/models/burger-classic.glb',
    model_https_url: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-classic.glb',
    real_scale_cm: '14.0 cm (Escala 1:1 Real)',
    prep_time: '18-22 min',
    weight: '220g de Costela Bovina',
    short_description: 'Blend alto de costela 220g assado na brasa, queijo coalho dourado com melado de cana, barbecue de Bourbon e crocante de bacon no pão australiano.'
  },
  {
    id: 'crispy-dragon',
    name: 'Crispy Dragon Chicken',
    category: 'especiais',
    category_label: 'Especiais do Chef',
    price: 42.90,
    original_price: 48.90,
    rating: 4.9,
    reviews_count: 198,
    badge: '🍗 Super Crocante',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=80',
    model_glb: 'assets/models/burger-smash.glb',
    model_https_url: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-smash.glb',
    real_scale_cm: '13.5 cm (Escala 1:1 Real)',
    prep_time: '14-18 min',
    weight: '200g Sobrecoxa Empanada',
    short_description: 'Sobrecoxa desossada ultra crocante marinada por 24h em buttermilk, queijo monterey jack derretido, salada coleslaw e molho spicy chipotle.'
  },
  {
    id: 'fries-truffle',
    name: 'Batatas Rústicas Trufadas',
    category: 'acompanhamentos',
    category_label: 'Acompanhamentos',
    price: 26.90,
    original_price: 32.00,
    rating: 5.0,
    reviews_count: 440,
    badge: '🍟 Irresistível',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    model_glb: 'assets/models/burger-monster.glb',
    model_https_url: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-monster.glb',
    real_scale_cm: 'Porção Generosa (320g)',
    prep_time: '10-12 min',
    weight: '320g de Batatas Artesanais',
    short_description: 'Batatas com casca fritas em dupla imersão, azeite de trufas brancas italianas, alecrim fresco e chuva de queijo Grana Padano ralado.'
  },
  {
    id: 'shake-lotus',
    name: 'Shake de Caramelo & Lotus',
    category: 'sobremesas',
    category_label: 'Sobremesas & Shakes',
    price: 28.90,
    original_price: 34.00,
    rating: 4.9,
    reviews_count: 310,
    badge: '🍦 O Mais Pedido',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80',
    model_glb: 'assets/models/burger-classic.glb',
    model_https_url: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-classic.glb',
    real_scale_cm: 'Copo Grande de 480ml',
    prep_time: '8-10 min',
    weight: '480ml Cremoso',
    short_description: 'Sorvete artesanal batido com calda de caramelo salgado na panela de cobre, crumble crocante de biscoitos belgas Lotus Biscoff e chantilly.'
  }
];

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

// Supabase REST Helper
function querySupabase(pathStr, method = 'GET', bodyData = null) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(pathStr, SUPABASE_URL);
      const req = https.request({
        hostname: url.hostname,
        port: 443,
        path: url.pathname + url.search,
        method: method,
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': method === 'POST' ? 'return=representation' : ''
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve({ ok: true, status: res.statusCode, data: JSON.parse(data) });
            } catch (e) {
              resolve({ ok: true, status: res.statusCode, data });
            }
          } else {
            resolve({ ok: false, status: res.statusCode, error: data });
          }
        });
      });

      req.on('error', err => reject(err));
      if (bodyData) {
        req.write(JSON.stringify(bodyData));
      }
      req.end();
    } catch (e) {
      reject(e);
    }
  });
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse URL
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

  // 1. API: Informações de Rede e Supabase
  if (parsedUrl.pathname === '/api/info') {
    const ips = getLocalIpAddresses();
    const primaryIp = ips.find(ip => ip.startsWith('192.168.') || ip.startsWith('10.')) || ips[0] || 'localhost';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      port: PORT,
      localIps: ips,
      primaryIp,
      mobileUrl: `http://${primaryIp}:${PORT}`,
      supabaseUrl: SUPABASE_URL,
      supabaseConnected: !!SUPABASE_URL
    }));
    return;
  }

  // 2. API: Obter Produtos do Cardápio (Supabase com Fallback)
  if (parsedUrl.pathname === '/api/products' && req.method === 'GET') {
    try {
      const result = await querySupabase('/rest/v1/burger_products?select=*&order=price.asc');
      if (result.ok && Array.isArray(result.data) && result.data.length > 0) {
        // Map database columns to app schema
        const mapped = result.data.map(p => ({
          id: p.id,
          name: p.name,
          category: p.category,
          categoryLabel: p.category_label,
          price: parseFloat(p.price),
          originalPrice: p.original_price ? parseFloat(p.original_price) : null,
          rating: p.rating ? parseFloat(p.rating) : 5.0,
          reviewsCount: p.reviews_count || 0,
          badge: p.badge || '',
          image: p.image,
          modelGlb: p.model_glb,
          modelHttpsUrl: p.model_https_url,
          realScaleCm: p.real_scale_cm,
          prepTime: p.prep_time,
          weight: p.weight,
          shortDescription: p.short_description
        }));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ source: 'supabase', products: mapped }));
        return;
      }
    } catch (e) {
      console.warn('Supabase não disponível no momento, usando fallback:', e.message);
    }

    // Fallback gracioso
    const mappedFallback = FALLBACK_PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      categoryLabel: p.category_label,
      price: p.price,
      originalPrice: p.original_price,
      rating: p.rating,
      reviewsCount: p.reviews_count,
      badge: p.badge,
      image: p.image,
      modelGlb: p.model_glb,
      modelHttpsUrl: p.model_https_url,
      realScaleCm: p.real_scale_cm,
      prepTime: p.prep_time,
      weight: p.weight,
      shortDescription: p.short_description
    }));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ source: 'local_fallback', products: mappedFallback }));
    return;
  }

  // 3. API: Criar Pedido (Salva no Supabase)
  if (parsedUrl.pathname === '/api/orders' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const orderData = JSON.parse(body);
        const supabasePayload = {
          customer_name: orderData.customerName || 'Cliente Balcão',
          table_or_address: orderData.tableOrAddress || 'Mesa / Retirada',
          notes: orderData.notes || '',
          items: orderData.items || [],
          subtotal: orderData.subtotal || 0,
          delivery_fee: orderData.deliveryFee || 0,
          total: orderData.total || 0,
          status: 'recebido'
        };

        const result = await querySupabase('/rest/v1/burger_orders', 'POST', supabasePayload);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          savedToSupabase: result.ok,
          order: result.data || supabasePayload
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // 4. Servir Arquivos Estáticos
  let safePath = path.normalize(decodeURIComponent(parsedUrl.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(ROOT, safePath);

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

    // Suporte a HTTP Range Requests (indispensável para streaming de modelos 3D GLB)
    const range = req.headers.range;
    const fileSize = stats.size;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        res.writeHead(416, { 'Content-Range': `bytes */${fileSize}` });
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
  console.log('🍔 AURA BURGER - Backend & Cardápio Digital 3D');
  console.log('====================================================');
  console.log(`📡 Local:    http://localhost:${PORT}`);
  console.log(`📱 No Celular (Mesmo Wi-Fi): http://${primaryIp}:${PORT}`);
  console.log(`🗄️  Supabase: ${SUPABASE_URL}`);
  console.log('====================================================');
});
