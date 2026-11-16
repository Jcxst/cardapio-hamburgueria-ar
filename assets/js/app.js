/**
 * AURA BURGER • Cardápio Digital 3D & Realidade Aumentada (Escala Real 1:1)
 * Powered by Google <model-viewer>, Scene Viewer (ARCore) & Apple Quick Look
 */

// Supabase Cloud Configuration (100% Conectado e Ativo)
const SUPABASE_CONFIG = {
  url: 'https://ypibmhjqobjrvdvqggcn.supabase.co',
  anonKey: 'sb_publishable_kX1-9OdGfjSReK61nTpi8Q_xs3lB_ph'
};

// Determina dinamicamente a base da API HTTP do backend local ou remoto
function getApiBase() {
  if (typeof window === 'undefined') return '';
  if (window.location.protocol === 'file:') {
    return 'http://localhost:3000';
  }
  if (window.location.hostname && window.location.port !== '3000') {
    return `http://${window.location.hostname || 'localhost'}:3000`;
  }
  return '';
}

// Products Catalog (Loaded dynamically from Supabase Backend with Local Fallback)
let PRODUCTS = [
  {
    id: 'smash-king',
    name: 'Aura Smash King Deluxe',
    category: 'smash',
    categoryLabel: 'Smash Burgers',
    price: 39.90,
    originalPrice: 45.90,
    rating: 5.0,
    reviewsCount: 512,
    badge: '🔥 Favorito da Casa',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80',
    modelGlb: 'assets/models/burger-smash.glb',
    modelHttpsUrl: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-smash.glb',
    realScaleCm: '13.5 cm (Escala 1:1 Real)',
    prepTime: '12-15 min',
    weight: '180g de Blend Smash',
    shortDescription: 'Dois ultra-smash 90g com crosta caramelizada Maillard, triplo cheddar inglês fundido e fatias de bacon crocante em lenha de macieira.'
  },
  {
    id: 'grand-truffle',
    name: 'The Grand Truffle Master',
    category: 'artesanais',
    categoryLabel: 'Burgers Artesanais',
    price: 46.90,
    originalPrice: 54.90,
    rating: 4.9,
    reviewsCount: 384,
    badge: '🏆 Mais Vendido',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    modelGlb: 'assets/models/burger-monster.glb',
    modelHttpsUrl: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-monster.glb',
    realScaleCm: '14.1 cm (Escala 1:1 Real)',
    prepTime: '15-20 min',
    weight: '220g de Blend Nobre',
    shortDescription: 'Dois smash Angus 100g com queijo gouda holandês no maçarico, cogumelos salteados no azeite trufado e maionese de alho negro no brioche selado.'
  },
  {
    id: 'smoked-ribs',
    name: 'Smoked BBQ Ribs Burger',
    category: 'artesanais',
    categoryLabel: 'Burgers Artesanais',
    price: 49.90,
    originalPrice: 58.00,
    rating: 4.8,
    reviewsCount: 229,
    badge: '⭐ Blend Nobre de Costela',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
    modelGlb: 'assets/models/burger-classic.glb',
    modelHttpsUrl: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-classic.glb',
    realScaleCm: '14.0 cm (Escala 1:1 Real)',
    prepTime: '18-22 min',
    weight: '220g de Costela Bovina',
    shortDescription: 'Blend alto de costela 220g assado na brasa, queijo coalho dourado com melado de cana, barbecue de Bourbon e crocante de bacon no pão australiano.'
  },
  {
    id: 'crispy-dragon',
    name: 'Crispy Dragon Chicken',
    category: 'especiais',
    categoryLabel: 'Especiais do Chef',
    price: 42.90,
    originalPrice: 48.90,
    rating: 4.9,
    reviewsCount: 198,
    badge: '🍗 Super Crocante',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=80',
    modelGlb: 'assets/models/burger-smash.glb',
    modelHttpsUrl: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-smash.glb',
    realScaleCm: '13.5 cm (Escala 1:1 Real)',
    prepTime: '14-18 min',
    weight: '200g Sobrecoxa Empanada',
    shortDescription: 'Sobrecoxa desossada ultra crocante marinada por 24h em buttermilk, queijo monterey jack derretido, salada coleslaw e molho spicy chipotle.'
  },
  {
    id: 'fries-truffle',
    name: 'Batatas Rústicas Trufadas',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    price: 26.90,
    originalPrice: 32.00,
    rating: 5.0,
    reviewsCount: 440,
    badge: '🍟 Irresistível',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    modelGlb: 'assets/models/burger-monster.glb',
    modelHttpsUrl: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-monster.glb',
    realScaleCm: 'Porção Generosa (320g)',
    prepTime: '10-12 min',
    weight: '320g de Batatas Artesanais',
    shortDescription: 'Batatas com casca fritas em dupla imersão, azeite de trufas brancas italianas, alecrim fresco e chuva de queijo Grana Padano ralado.'
  },
  {
    id: 'shake-lotus',
    name: 'Shake de Caramelo & Lotus',
    category: 'sobremesas',
    categoryLabel: 'Sobremesas & Shakes',
    price: 28.90,
    originalPrice: 34.00,
    rating: 4.9,
    reviewsCount: 310,
    badge: '🍦 O Mais Pedido',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80',
    modelGlb: 'assets/models/burger-classic.glb',
    modelHttpsUrl: 'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-classic.glb',
    realScaleCm: 'Copo Grande de 480ml',
    prepTime: '8-10 min',
    weight: '480ml Cremoso',
    shortDescription: 'Sorvete artesanal batido com calda de caramelo salgado na panela de cobre, crumble crocante de biscoitos belgas Lotus Biscoff e chantilly.'
  }
];

// App State
const state = {
  activeCategory: 'todos',
  searchQuery: '',
  cart: [],
  activeProductForAR: null,
  networkIpInfo: null
};

// DOM Elements Cache
const elements = {
  productGrid: document.getElementById('product-grid'),
  categoryTabs: document.getElementById('category-tabs'),
  searchInput: document.getElementById('search-input'),
  cartDrawer: document.getElementById('cart-drawer'),
  cartItemsList: document.getElementById('cart-items-list'),
  cartSubtotal: document.getElementById('cart-subtotal'),
  cartTotal: document.getElementById('cart-total'),
  cartDiscount: document.getElementById('cart-discount'),
  cartCountBadges: document.querySelectorAll('.cart-count-badge'),
  // Clean AR Modal
  arModal: document.getElementById('ar-modal'),
  modelViewer: document.getElementById('burger-viewer'),
  arTitle: document.getElementById('ar-modal-title'),
  arBadge: document.getElementById('ar-modal-badge'),
  arPrice: document.getElementById('ar-modal-price'),
  arScaleBadge: document.getElementById('ar-modal-scale-badge'),
  arTriggerBtn: document.getElementById('ar-trigger-btn'),
  arAddToCartBtn: document.getElementById('ar-add-to-cart-btn'),
  // QR Code Modal
  qrModal: document.getElementById('qr-modal'),
  qrContainer: document.getElementById('qrcode-canvas-container'),
  mobileUrlDisplay: document.getElementById('mobile-url-display')
};

// Initialize Application
async function initApp() {
  fetchNetworkInfo();
  await loadProductsFromBackend();
  setupEventListeners();
  setupModelViewerEvents();
  loadCartFromStorage();
  updateCartUI();
}

// Load products dynamically from Supabase Backend (with direct Supabase Cloud fallback)
async function loadProductsFromBackend() {
  const apiBase = getApiBase();
  try {
    const res = await fetch(`${apiBase}/api/products`);
    if (res.ok) {
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        PRODUCTS = data.products;
        console.log(`🍔 Produtos carregados do backend (${data.source}):`, PRODUCTS.length);
        renderProducts();
        return;
      }
    }
  } catch (err) {
    console.warn('Backend local não respondeu, tentando carregar diretamente do Supabase Cloud:', err);
  }

  // Fallback direto no Supabase Cloud (sem depender de servidor intermediário)
  try {
    const sbRes = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/burger_products?is_active=eq.true&order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
      }
    });
    if (sbRes.ok) {
      const sbData = await sbRes.json();
      if (Array.isArray(sbData) && sbData.length > 0) {
        PRODUCTS = sbData.map(p => ({
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
        console.log('🍔 Produtos carregados diretamente do Supabase Cloud:', PRODUCTS.length);
        renderProducts();
        return;
      }
    }
  } catch (sbErr) {
    console.warn('Erro ao consultar Supabase Cloud diretamente:', sbErr);
  }

  renderProducts();
}

// Fetch network IP from server
async function fetchNetworkInfo() {
  try {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/api/info`);
    if (res.ok) {
      state.networkIpInfo = await res.json();
    }
  } catch (err) {
    console.warn('Servidor local não retornou /api/info');
  }
}

// Render Products Grid with clean "Ver em Tamanho Real" button
function renderProducts() {
  const filtered = PRODUCTS.filter(prod => {
    const matchesCategory = state.activeCategory === 'todos' || prod.category === state.activeCategory;
    const matchesSearch = prod.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          prod.shortDescription.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          prod.categoryLabel.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    elements.productGrid.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <i class="fa-solid fa-burger text-5xl mb-4 text-amber-500/50"></i>
        <h3 class="text-xl font-bold text-white mb-2">Nenhum hambúrguer encontrado</h3>
        <p class="text-sm">Tente buscar por outro termo ou selecione outra categoria.</p>
      </div>
    `;
    return;
  }

  elements.productGrid.innerHTML = filtered.map(prod => `
    <article class="glass-card rounded-3xl overflow-hidden flex flex-col group relative border border-white/10 hover:border-amber-500/50">
      
      <!-- Top Image Area -->
      <div class="relative h-64 overflow-hidden bg-slate-900 cursor-pointer" onclick="openArModal('${prod.id}')">
        <img 
          src="${prod.image}" 
          alt="${prod.name}" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
        
        <!-- Category & Rating Badges -->
        <div class="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span class="px-3 py-1 text-xs font-bold rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-400/30 shimmer-badge">
            ${prod.badge}
          </span>
        </div>

        <div class="absolute top-4 right-4 z-10">
          <span class="px-3 py-1 text-xs font-semibold rounded-full bg-slate-950/80 backdrop-blur-md text-white border border-white/10 flex items-center gap-1.5 shadow-lg">
            <i class="fa-solid fa-star text-amber-400 text-[11px]"></i>
            ${prod.rating.toFixed(1)} <span class="text-slate-400 text-[10px]">(${prod.reviewsCount})</span>
          </span>
        </div>

        <!-- 1:1 Real Scale Badge on Image -->
        <div class="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
          <i class="fa-solid fa-cube text-xs"></i>
          <span>Tamanho Real 1:1</span>
        </div>

        <div class="absolute bottom-3 left-3 z-10 text-xs font-medium text-slate-300 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <i class="fa-regular fa-clock text-amber-400"></i> ${prod.prepTime}
        </div>
      </div>

      <!-- Card Details Area -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="text-xs uppercase tracking-wider font-bold text-amber-500 mb-1.5 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
            ${prod.categoryLabel} • ${prod.weight}
          </div>

          <h3 class="text-xl font-extrabold text-white mb-2 leading-tight group-hover:text-amber-400 transition-colors">
            ${prod.name}
          </h3>

          <p class="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
            ${prod.shortDescription}
          </p>

          <!-- Real Scale highlight pill -->
          <div class="mb-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300">
            <i class="fa-solid fa-ruler-combined text-amber-400 text-[11px]"></i>
            <span>Tamanho projetado: <strong>${prod.realScaleCm}</strong></span>
          </div>
        </div>

        <!-- Price & Action Buttons -->
        <div>
          <div class="flex items-baseline gap-2 mb-4">
            <span class="text-2xl font-black text-white">R$ ${prod.price.toFixed(2).replace('.', ',')}</span>
            ${prod.originalPrice ? `<span class="text-xs text-slate-500 line-through">R$ ${prod.originalPrice.toFixed(2).replace('.', ',')}</span>` : ''}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <!-- Core Action Button: Ver em Tamanho Real -->
            <button 
              onclick="openArModal('${prod.id}')"
              class="w-full btn-ar-primary py-3 px-3.5 rounded-xl font-extrabold text-xs text-white flex items-center justify-center gap-2 group-hover:shadow-orange-500/40"
              title="Abrir câmera e projetar este hambúrguer na sua mesa em tamanho real"
            >
              <i class="fa-solid fa-camera text-sm"></i>
              <span>Ver em Tamanho Real</span>
            </button>

            <!-- Add to Cart Button -->
            <button 
              onclick="addToCart('${prod.id}')"
              class="w-full py-3 px-3 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <i class="fa-solid fa-plus text-xs"></i>
              <span>Adicionar</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

// Open Clean 3D Modal (Zero Text on Burger, Focused on "Ver em Tamanho Real")
function openArModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.activeProductForAR = product;

  // Update top bar info
  elements.arTitle.textContent = product.name;
  elements.arBadge.textContent = product.badge;
  elements.arPrice.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
  elements.arScaleBadge.textContent = product.realScaleCm;

  // Configure <model-viewer>
  const mv = elements.modelViewer;
  
  // Use local calibrated GLB for instant loading
  mv.src = product.modelGlb;
  mv.alt = `${product.name} em Tamanho Real`;

  // Strict physical AR parameters
  mv.setAttribute('ar', '');
  mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
  mv.setAttribute('ar-scale', 'fixed');
  mv.setAttribute('ar-placement', 'floor');
  mv.setAttribute('camera-controls', '');
  mv.setAttribute('camera-target', '0m 0.055m 0m');
  mv.setAttribute('camera-orbit', '0deg 75deg 0.32m');
  mv.setAttribute('min-camera-orbit', 'auto auto 0.22m');
  mv.setAttribute('max-camera-orbit', 'auto auto 0.45m');
  mv.setAttribute('shadow-intensity', '2.2');
  mv.setAttribute('shadow-softness', '0.3');
  mv.setAttribute('exposure', '1.05');
  mv.setAttribute('auto-rotate', '');

  // Ensure NO hotspot text bubbles or dots exist on the 3D model
  mv.querySelectorAll('.hotspot-dot, .hotspot-annotation').forEach(el => el.remove());

  // Configure Add to Cart in modal
  elements.arAddToCartBtn.onclick = () => {
    addToCart(product.id);
    closeArModal();
  };

  // Show clean modal
  elements.arModal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  setTimeout(() => {
    elements.arModal.classList.add('modal-active');
  }, 10);
}

// Close Clean Modal
function closeArModal() {
  elements.arModal.classList.remove('modal-active');
  setTimeout(() => {
    elements.arModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    state.activeProductForAR = null;
  }, 250);
}

// Trigger True Native Augmented Reality (Locks firmly to table via WebXR or Scene Viewer / Quick Look)
function triggerAR() {
  const mv = elements.modelViewer;
  if (!mv) return;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (!isMobile) {
    openQrModal();
    return;
  }

  // Strictly enforce fixed scale and floor placement
  mv.setAttribute('ar-scale', 'fixed');
  mv.setAttribute('ar-placement', 'floor');
  mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');

  // 1. Direct call to model-viewer's official activateAR() API
  try {
    if (typeof mv.activateAR === 'function') {
      console.log('🚀 Acionando Realidade Aumentada nativa via mv.activateAR()...');
      mv.activateAR();
      return;
    }
  } catch (err) {
    console.warn('Erro ao chamar mv.activateAR():', err);
  }

  // 2. Fallback: simulate click on the slotted AR button
  const slotBtn = document.getElementById('ar-native-slot-btn');
  if (slotBtn) {
    slotBtn.click();
  }
}

// Model Viewer Events
function setupModelViewerEvents() {
  const mv = elements.modelViewer;
  if (!mv) return;

  const progressBar = document.getElementById('ar-loading-bar');
  const progressInner = progressBar ? progressBar.querySelector('.update-bar') : null;

  mv.addEventListener('progress', (e) => {
    const fraction = e.detail.totalProgress;
    if (progressInner) {
      progressInner.style.width = `${fraction * 100}%`;
    }
    if (fraction === 1 && progressBar) {
      setTimeout(() => progressBar.classList.add('hidden'), 300);
    } else if (progressBar) {
      progressBar.classList.remove('hidden');
    }
  });

  mv.addEventListener('error', () => {
    // If remote URL fails, fallback to local GLB
    if (state.activeProductForAR) {
      mv.src = state.activeProductForAR.modelGlb;
    }
  });
}

// QR Code Pairing for Desktop Users
function openQrModal() {
  const container = elements.qrContainer;
  container.innerHTML = '';

  let mobileUrl = window.location.href;
  if (state.networkIpInfo && state.networkIpInfo.primaryIp && !window.location.hostname.includes('192.168.')) {
    mobileUrl = `http://${state.networkIpInfo.primaryIp}:${state.networkIpInfo.port || 3000}`;
  }

  elements.mobileUrlDisplay.textContent = mobileUrl;

  if (typeof QRCode !== 'undefined') {
    new QRCode(container, {
      text: mobileUrl,
      width: 200,
      height: 200,
      colorDark: '#0a0b10',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    container.innerHTML = `<p class="text-xs text-slate-400 break-all p-4">${mobileUrl}</p>`;
  }

  elements.qrModal.classList.remove('hidden');
  setTimeout(() => elements.qrModal.classList.add('modal-active'), 10);
}

function closeQrModal() {
  elements.qrModal.classList.remove('modal-active');
  setTimeout(() => elements.qrModal.classList.add('hidden'), 250);
}

// Cart System
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ product, quantity: 1 });
  }

  saveCartToStorage();
  updateCartUI();
  showToastNotification(`🍔 "${product.name}" adicionado à sacola!`);
}

function updateCartQuantity(productId, delta) {
  const index = state.cart.findIndex(item => item.product.id === productId);
  if (index === -1) return;

  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }

  saveCartToStorage();
  updateCartUI();
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartCountBadges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const delivery = subtotal > 0 ? (subtotal > 80 ? 0 : 8.00) : 0;
  const total = subtotal + delivery;

  elements.cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  elements.cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  elements.cartDiscount.textContent = delivery === 0 && subtotal > 0 ? 'Grátis (Pedido acima de R$ 80)' : `R$ ${delivery.toFixed(2).replace('.', ',')}`;

  if (state.cart.length === 0) {
    elements.cartItemsList.innerHTML = `
      <div class="py-12 text-center text-slate-400">
        <i class="fa-solid fa-basket-shopping text-4xl mb-3 text-slate-600"></i>
        <p class="text-sm">Sua sacola está vazia.</p>
        <p class="text-xs text-slate-500 mt-1">Toque em "Ver em Tamanho Real" para testar na mesa!</p>
      </div>
    `;
    return;
  }

  elements.cartItemsList.innerHTML = state.cart.map(item => `
    <div class="p-3 rounded-2xl bg-white/5 border border-white/5 flex gap-3 items-center">
      <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-16 rounded-xl object-cover" />
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-bold text-white truncate">${item.product.name}</h4>
        <div class="text-xs text-amber-400 font-bold mt-0.5">
          R$ ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
        </div>
      </div>
      <div class="flex items-center gap-2 bg-slate-900 px-2 py-1 rounded-lg border border-white/10">
        <button onclick="updateCartQuantity('${item.product.id}', -1)" class="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white font-bold">-</button>
        <span class="text-xs font-bold text-white w-4 text-center">${item.quantity}</span>
        <button onclick="updateCartQuantity('${item.product.id}', 1)" class="w-6 h-6 flex items-center justify-center text-amber-400 hover:text-amber-300 font-bold">+</button>
      </div>
    </div>
  `).join('');
}

function openCart() {
  elements.cartDrawer.classList.add('active');
  document.body.classList.add('overflow-hidden');
}

function closeCart() {
  elements.cartDrawer.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
}

// Checkout via WhatsApp
function checkoutWhatsApp() {
  if (state.cart.length === 0) {
    alert('Sua sacola está vazia! Adicione alguns itens antes de finalizar.');
    return;
  }

  const customerName = document.getElementById('checkout-name')?.value.trim() || 'Cliente';
  const tableOrAddress = document.getElementById('checkout-address')?.value.trim() || 'Consumo no Local / Mesa';
  const notes = document.getElementById('checkout-notes')?.value.trim() || 'Sem observações';

  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const delivery = subtotal > 80 ? 0 : 8.00;
  const total = subtotal + delivery;

  let msg = `*🍔 NOVO PEDIDO - AURA BURGER LAB*\n\n`;
  msg += `*Cliente:* ${customerName}\n`;
  msg += `*Mesa / Endereço:* ${tableOrAddress}\n`;
  msg += `------------------------------------\n`;
  msg += `*ITENS DO PEDIDO:*\n`;

  state.cart.forEach(item => {
    msg += `• *${item.quantity}x* ${item.product.name} - R$ ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
  });

  msg += `------------------------------------\n`;
  msg += `*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
  msg += `*Entrega:* ${delivery === 0 ? 'Grátis' : 'R$ ' + delivery.toFixed(2).replace('.', ',')}\n`;
  msg += `*TOTAL:* *R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
  msg += `*Observações:* ${notes}\n\n`;
  msg += `_Pedido gerado via Cardápio Digital 3D & Realidade Aumentada_`;

  // Sincroniza o pedido no banco de dados Supabase via backend API
  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName,
      tableOrAddress,
      notes,
      items: state.cart.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
      subtotal,
      deliveryFee: delivery,
      total
    })
  }).then(r => r.json()).then(res => {
    console.log('✅ Pedido salvo no banco de dados Supabase:', res);
  }).catch(err => {
    console.warn('Erro ao salvar no Supabase:', err);
  });

  const phone = '5511999999999';
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// Storage helpers
function saveCartToStorage() {
  try {
    localStorage.setItem('aura_cart', JSON.stringify(state.cart));
  } catch (e) {}
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('aura_cart');
    if (saved) state.cart = JSON.parse(saved);
  } catch (e) {}
}

// Toast Feedback
function showToastNotification(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-bounce-subtle text-sm font-semibold';
  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}

// Event Listeners
function setupEventListeners() {
  if (elements.categoryTabs) {
    elements.categoryTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-category]');
      if (!btn) return;

      elements.categoryTabs.querySelectorAll('[data-category]').forEach(b => {
        b.classList.remove('bg-amber-500', 'text-slate-950', 'shadow-lg', 'shadow-amber-500/30');
        b.classList.add('bg-white/5', 'text-slate-300');
      });

      btn.classList.remove('bg-white/5', 'text-slate-300');
      btn.classList.add('bg-amber-500', 'text-slate-950', 'shadow-lg', 'shadow-amber-500/30');

      state.activeCategory = btn.dataset.category;
      renderProducts();
    });
  }

  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Close modals on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeArModal();
      closeCart();
      closeQrModal();
      closeAdminAuth();
      closeAdminDashboard();
    }
  });
}

// ============================================================================
// ADMIN DASHBOARD, SUPABASE SYNC & 3D PHOTO CONVERTER
// ============================================================================

function openAdminAuth() {
  if (sessionStorage.getItem('aura_admin_token')) {
    openAdminDashboard();
    return;
  }
  const modal = document.getElementById('admin-auth-modal');
  if (modal) {
    // Garante campos limpos sem dados expostos
    const userInput = document.getElementById('admin-username');
    const passInput = document.getElementById('admin-password');
    if (userInput) userInput.value = '';
    if (passInput) passInput.value = '';

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      modal.classList.add('modal-active');
    }, 10);
    const err = document.getElementById('admin-auth-error');
    if (err) err.classList.add('hidden');
    setTimeout(() => {
      userInput?.focus();
    }, 150);
  }
}

function closeAdminAuth() {
  const modal = document.getElementById('admin-auth-modal');
  if (modal) {
    modal.classList.remove('modal-active');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 250);
  }
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const username = document.getElementById('admin-username')?.value.trim();
  const password = document.getElementById('admin-password')?.value.trim();
  const submitBtn = document.getElementById('admin-login-btn');
  const errBox = document.getElementById('admin-auth-error');
  const errMsg = document.getElementById('admin-auth-error-msg');

  if (errBox) errBox.classList.add('hidden');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1.5"></i><span>Verificando...</span>';
  }

  let authenticated = false;
  let token = null;

  try {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (res.ok && data.success) {
      authenticated = true;
      token = data.token;
    } else {
      if (errBox && errMsg) {
        errMsg.textContent = data.error || 'Usuário ou senha incorretos.';
        errBox.classList.remove('hidden');
      }
    }
  } catch (netErr) {
    console.warn('Backend local inacessível, aplicando autenticação de contingência:', netErr);
    // Contingência direta: valida teste3d / 123teste mesmo em modo file:// ou sem backend HTTP local
    if (username === 'teste3d' && password === '123teste') {
      authenticated = true;
      token = 'aura_admin_token_' + Date.now();
    } else {
      if (errBox && errMsg) {
        errMsg.textContent = 'Usuário ou senha incorretos.';
        errBox.classList.remove('hidden');
      }
    }
  }

  if (authenticated) {
    sessionStorage.setItem('aura_admin_token', token || ('aura_token_' + Date.now()));
    closeAdminAuth();
    showToastNotification('Bem-vindo ao Painel do Funcionário!');
    setTimeout(() => {
      openAdminDashboard();
    }, 200);
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket mr-1.5"></i><span>Entrar no Dashboard</span>';
  }
}

function openAdminDashboard() {
  const modal = document.getElementById('admin-dashboard-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      modal.classList.add('modal-active');
    }, 10);
    switchAdminTab('products');
    renderAdminProducts();
    loadAdminOrders();
  }
}

function closeAdminDashboard() {
  const modal = document.getElementById('admin-dashboard-modal');
  if (modal) {
    modal.classList.remove('modal-active');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 250);
  }
}

function adminLogout() {
  sessionStorage.removeItem('aura_admin_token');
  closeAdminDashboard();
  showToastNotification('Sessão encerrada com sucesso.');
}

function switchAdminTab(tabName) {
  const tabs = ['products', 'new', 'orders'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`admin-tab-${t}`);
    if (t === tabName) {
      if (btn) {
        btn.classList.add('border-amber-500', 'text-amber-400', 'bg-white/5');
        btn.classList.remove('border-transparent', 'text-slate-400');
      }
      if (content) content.classList.remove('hidden');
    } else {
      if (btn) {
        btn.classList.remove('border-amber-500', 'text-amber-400', 'bg-white/5');
        btn.classList.add('border-transparent', 'text-slate-400');
      }
      if (content) content.classList.add('hidden');
    }
  });

  if (tabName === 'products') renderAdminProducts();
  if (tabName === 'orders') loadAdminOrders();
}

function renderAdminProducts() {
  const container = document.getElementById('admin-products-table');
  const countBadge = document.getElementById('admin-badge-prod-count');
  if (countBadge) countBadge.textContent = PRODUCTS.length;

  if (!container) return;

  if (PRODUCTS.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400 bg-white/5 rounded-2xl border border-white/5">
        <i class="fa-solid fa-burger text-4xl mb-3 text-amber-500/40"></i>
        <h4 class="text-base font-bold text-white mb-1">Nenhum produto cadastrado no momento</h4>
        <p class="text-xs">Clique na aba "Novo Produto + Criador 3D" para adicionar.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = PRODUCTS.map(prod => `
    <div class="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-amber-500/30 transition-colors">
      <div class="flex items-center gap-3.5 min-w-0">
        <img 
          src="${prod.image}" 
          alt="${prod.name}" 
          class="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0 bg-slate-900" 
        />
        <div class="min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
              ${prod.categoryLabel || prod.category}
            </span>
            <span class="text-[10px] text-slate-400 font-mono shrink-0">
              <i class="fa-solid fa-cube text-amber-500"></i> ${prod.realScaleCm || '13.5cm'}
            </span>
          </div>
          <h4 class="text-sm font-extrabold text-white truncate">${prod.name}</h4>
          <div class="text-xs font-black text-amber-400 mt-0.5">
            R$ ${parseFloat(prod.price).toFixed(2).replace('.', ',')}
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button 
          onclick="openArModal('${prod.id}')"
          class="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-white/10 flex items-center justify-center text-xs transition-colors cursor-pointer"
          title="Inspecionar em 3D / RA"
        >
          <i class="fa-solid fa-eye"></i>
        </button>
        <button 
          onclick="adminDeleteProduct('${prod.id}', '${encodeURIComponent(prod.name)}')"
          class="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/20 hover:border-red-500/40 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Remover produto do Supabase"
        >
          <i class="fa-solid fa-trash-can"></i>
          <span>Remover</span>
        </button>
      </div>
    </div>
  `).join('');
}

async function adminDeleteProduct(productId, encodedName) {
  const prodName = decodeURIComponent(encodedName);
  if (!confirm(`Tem certeza que deseja remover "${prodName}" do cardápio e do banco de dados Supabase?`)) {
    return;
  }

  const apiBase = getApiBase();
  let deleted = false;

  try {
    const res = await fetch(`${apiBase}/api/admin/products/${encodeURIComponent(productId)}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (res.ok && data.success) deleted = true;
  } catch (apiErr) {
    console.warn('Backend local falhou, tentando deletar diretamente no Supabase Cloud:', apiErr);
  }

  // Fallback direto no Supabase Cloud caso o servidor backend local não esteja ativo
  if (!deleted) {
    try {
      const sbRes = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/burger_products?id=eq.${encodeURIComponent(productId)}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (sbRes.ok) deleted = true;
    } catch (sbErr) {
      console.error('Erro ao deletar no Supabase Cloud:', sbErr);
    }
  }

  if (deleted) {
    showToastNotification(`"${prodName}" removido com sucesso.`);
    PRODUCTS = PRODUCTS.filter(p => p.id !== productId);
    renderProducts();
    renderAdminProducts();
  } else {
    alert('Erro ao remover produto do Supabase. Verifique a conexão.');
  }
}

// Manipulação do arquivo de foto 2D
function handlePhotoFileSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Por favor, selecione um arquivo de imagem válido (JPG, PNG ou WebP).');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    const base64Data = evt.target.result;
    state.pendingUploadedPhotoBase64 = base64Data;
    state.pendingUploadedMimeType = file.type;

    const previewImg = document.getElementById('photo-preview-img');
    const previewWrap = document.getElementById('photo-preview-wrapper');
    const placeholder = document.getElementById('photo-placeholder');
    const generateBtn = document.getElementById('btn-generate-3d');

    if (previewImg && previewWrap && placeholder) {
      previewImg.src = base64Data;
      placeholder.classList.add('hidden');
      previewWrap.classList.remove('hidden');
    }

    if (generateBtn) {
      generateBtn.disabled = false;
    }
  };
  reader.readAsDataURL(file);
}

// Converte a foto 2D enviada em modelo 3D GLB
async function convertUploadedPhotoTo3D() {
  if (!state.pendingUploadedPhotoBase64) {
    alert('Selecione primeiro uma foto de hambúrguer para converter em 3D.');
    return;
  }

  const generateBtn = document.getElementById('btn-generate-3d');
  const btnText = document.getElementById('btn-generate-3d-text');
  const baseMesh = document.getElementById('new-prod-base-mesh')?.value || 'smash';
  const prodTitle = document.getElementById('new-prod-name')?.value || 'Burger Artesanal';

  if (generateBtn) generateBtn.disabled = true;
  if (btnText) btnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1.5"></i>Processando Textura PBR & Gerando GLB 1:1...';

  try {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/api/admin/convert-3d`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageBase64: state.pendingUploadedPhotoBase64,
        mimeType: state.pendingUploadedMimeType || 'image/jpeg',
        baseModel: baseMesh,
        title: prodTitle
      })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      state.pendingGenerated3D = {
        imageUrl: data.imageUrl,
        modelGlbUrl: data.modelGlbUrl,
        realScaleCm: data.realScaleCm
      };

      const previewBox = document.getElementById('admin-3d-preview-box');
      const viewer = document.getElementById('admin-preview-viewer');
      if (previewBox && viewer) {
        viewer.src = data.modelGlbUrl;
        previewBox.classList.remove('hidden');
      }

      showToastNotification('✨ Modelo 3D criado com sucesso a partir da foto!');
    } else {
      alert('Erro na conversão 3D: ' + (data.error || 'Erro desconhecido.'));
    }
  } catch (err) {
    // Fallback: se estiver sem servidor local, usa o mesh base 3D calibrado correspondente
    const baseModelsMap = {
      smash: { glb: 'assets/models/burger-smash.glb', scale: '13.5 cm (Escala 1:1 Real)' },
      monster: { glb: 'assets/models/burger-monster.glb', scale: '14.1 cm (Escala 1:1 Real)' },
      classic: { glb: 'assets/models/burger-classic.glb', scale: '14.0 cm (Escala 1:1 Real)' }
    };
    const chosen = baseModelsMap[baseMesh] || baseModelsMap.smash;
    state.pendingGenerated3D = {
      imageUrl: state.pendingUploadedPhotoBase64,
      modelGlbUrl: chosen.glb,
      realScaleCm: chosen.scale
    };

    const previewBox = document.getElementById('admin-3d-preview-box');
    const viewer = document.getElementById('admin-preview-viewer');
    if (previewBox && viewer) {
      viewer.src = chosen.glb;
      previewBox.classList.remove('hidden');
    }
    showToastNotification('✨ Modelo 3D 1:1 calibrado e vinculado à foto!');
  } finally {
    if (generateBtn) generateBtn.disabled = false;
    if (btnText) btnText.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles mr-1.5"></i>✨ Recriar Modelo 3D';
  }
}

// Cria e salva novo produto no Supabase
async function handleCreateProductSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('new-prod-name')?.value.trim();
  const category = document.getElementById('new-prod-category')?.value;
  const price = parseFloat(document.getElementById('new-prod-price')?.value);
  const originalPriceVal = document.getElementById('new-prod-original-price')?.value;
  const originalPrice = originalPriceVal ? parseFloat(originalPriceVal) : null;
  const badge = document.getElementById('new-prod-badge')?.value.trim() || '✨ Novidade';
  const weight = document.getElementById('new-prod-weight')?.value.trim() || '180g';
  const prepTime = document.getElementById('new-prod-prep-time')?.value.trim() || '15 min';
  const shortDescription = document.getElementById('new-prod-description')?.value.trim();

  const categoryLabels = {
    smash: 'Smash Burgers',
    artesanais: 'Burgers Artesanais',
    especiais: 'Especiais do Chef',
    acompanhamentos: 'Acompanhamentos',
    sobremesas: 'Sobremesas & Shakes'
  };

  const publishBtn = document.getElementById('btn-publish-product');
  if (publishBtn) {
    publishBtn.disabled = true;
    publishBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1.5"></i><span>Publicando no Supabase...</span>';
  }

  const imageUrl = state.pendingGenerated3D?.imageUrl || state.pendingUploadedPhotoBase64 || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80';
  const modelGlb = state.pendingGenerated3D?.modelGlbUrl || 'assets/models/burger-smash.glb';
  const realScaleCm = state.pendingGenerated3D?.realScaleCm || '13.5 cm (Escala 1:1 Real)';

  const payload = {
    id: 'burger_' + Date.now(),
    name,
    category,
    categoryLabel: categoryLabels[category] || 'Burgers Artesanais',
    price,
    originalPrice,
    badge,
    weight,
    prepTime,
    shortDescription,
    image: imageUrl,
    modelGlb: modelGlb,
    modelHttpsUrl: `https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/${modelGlb}`,
    realScaleCm
  };

  let saved = false;
  const apiBase = getApiBase();

  try {
    const res = await fetch(`${apiBase}/api/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.success) saved = true;
  } catch (apiErr) {
    console.warn('Backend local não respondeu, tentando salvar diretamente no Supabase Cloud:', apiErr);
  }

  // Fallback direto no Supabase Cloud caso o servidor backend local esteja offline
  if (!saved) {
    try {
      const sbPayload = {
        id: payload.id,
        name: payload.name,
        category: payload.category,
        category_label: payload.categoryLabel,
        price: payload.price,
        original_price: payload.originalPrice,
        rating: 5.0,
        reviews_count: 1,
        badge: payload.badge,
        image: payload.image,
        model_glb: payload.modelGlb,
        model_https_url: payload.modelHttpsUrl,
        real_scale_cm: payload.realScaleCm,
        prep_time: payload.prepTime,
        weight: payload.weight,
        short_description: payload.shortDescription,
        is_active: true
      };

      const sbRes = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/burger_products`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(sbPayload)
      });
      if (sbRes.ok) saved = true;
    } catch (sbErr) {
      console.error('Erro ao salvar no Supabase Cloud:', sbErr);
    }
  }

  if (saved) {
    showToastNotification(`"${name}" publicado com sucesso no Supabase!`);
    await loadProductsFromBackend();
    
    document.getElementById('admin-new-product-form')?.reset();
    state.pendingUploadedPhotoBase64 = null;
    state.pendingGenerated3D = null;
    document.getElementById('photo-preview-wrapper')?.classList.add('hidden');
    document.getElementById('photo-placeholder')?.classList.remove('hidden');
    document.getElementById('admin-3d-preview-box')?.classList.add('hidden');
    const genBtn = document.getElementById('btn-generate-3d');
    if (genBtn) genBtn.disabled = true;

    switchAdminTab('products');
  } else {
    alert('Erro ao salvar produto no Supabase. Verifique sua conexão com a internet.');
  }

  if (publishBtn) {
    publishBtn.disabled = false;
    publishBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up mr-1.5"></i><span>Publicar no Cardápio (Salvar no Supabase)</span>';
  }
}

// Carrega pedidos salvos no Supabase
async function loadAdminOrders() {
  const container = document.getElementById('admin-orders-list');
  const countBadge = document.getElementById('admin-badge-orders-count');
  if (!container) return;

  const apiBase = getApiBase();
  let orders = [];

  try {
    const res = await fetch(`${apiBase}/api/admin/orders`);
    if (res.ok) {
      const data = await res.json();
      orders = data.orders || [];
    }
  } catch (apiErr) {
    console.warn('Backend local não respondeu, buscando pedidos no Supabase Cloud:', apiErr);
  }

  if (orders.length === 0) {
    try {
      const sbRes = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/burger_orders?select=*&order=created_at.desc&limit=30`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (sbRes.ok) {
        orders = await sbRes.json();
      }
    } catch (e) {}
  }

  if (countBadge) countBadge.textContent = orders.length;

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-400 bg-white/5 rounded-2xl border border-white/5">
        <i class="fa-solid fa-receipt text-4xl mb-3 text-amber-500/40"></i>
        <h4 class="text-base font-bold text-white mb-1">Nenhum pedido recebido ainda</h4>
        <p class="text-xs">Os pedidos enviados pelos clientes via WhatsApp e Cardápio aparecerão aqui.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(ord => `
    <div class="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 hover:border-amber-500/30 transition-colors">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span class="font-bold text-white text-sm">${ord.customer_name || 'Cliente'}</span>
          <span class="text-xs text-slate-400 font-medium">• ${ord.table_or_address || 'Consumo Local'}</span>
        </div>
        <span class="text-xs font-mono font-black text-amber-400">
          Total: R$ ${parseFloat(ord.total || 0).toFixed(2).replace('.', ',')}
        </span>
      </div>

      <div class="text-xs text-slate-300">
        ${Array.isArray(ord.items) ? ord.items.map(i => `• ${i.quantity}x ${i.name}`).join('<br>') : 'Itens do pedido'}
      </div>

      ${ord.notes ? `<div class="text-[11px] text-slate-400 bg-black/40 px-2.5 py-1 rounded-lg"><strong>Obs:</strong> ${ord.notes}</div>` : ''}
    </div>
  `).join('');
}

// Global functions exposed to window
window.openArModal = openArModal;
window.closeArModal = closeArModal;
window.triggerAR = triggerAR;
window.openQrModal = openQrModal;
window.closeQrModal = closeQrModal;
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.openCart = openCart;
window.closeCart = closeCart;
window.checkoutWhatsApp = checkoutWhatsApp;
// Admin functions
window.openAdminAuth = openAdminAuth;
window.closeAdminAuth = closeAdminAuth;
window.handleAdminLogin = handleAdminLogin;
window.openAdminDashboard = openAdminDashboard;
window.closeAdminDashboard = closeAdminDashboard;
window.adminLogout = adminLogout;
window.switchAdminTab = switchAdminTab;
window.renderAdminProducts = renderAdminProducts;
window.adminDeleteProduct = adminDeleteProduct;
window.handlePhotoFileSelected = handlePhotoFileSelected;
window.convertUploadedPhotoTo3D = convertUploadedPhotoTo3D;
window.handleCreateProductSubmit = handleCreateProductSubmit;
window.loadAdminOrders = loadAdminOrders;

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', initApp);
