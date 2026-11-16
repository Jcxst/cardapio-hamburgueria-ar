/**
 * AURA BURGER • Cardápio Digital 3D & Realidade Aumentada (Escala Real 1:1)
 * Powered by Google <model-viewer>, Scene Viewer (ARCore) & Apple Quick Look
 */

// Products Catalog with Calibrated 1:1 Physical 3D Models
const PRODUCTS = [
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
  renderProducts();
  setupEventListeners();
  setupModelViewerEvents();
  loadCartFromStorage();
  updateCartUI();
}

// Fetch network IP from server
async function fetchNetworkInfo() {
  try {
    const res = await fetch('/api/info');
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
    }
  });
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

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', initApp);
