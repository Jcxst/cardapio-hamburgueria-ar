/**
 * AURA BURGER • 3D & Augmented Reality Digital Menu Experience
 * Powered by Google <model-viewer> & WebXR
 */

// Products Catalog with 3D Models & Sensory Copywriting
const PRODUCTS = [
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
    modelCdnFallback: 'https://raw.githubusercontent.com/mindset-code/burger-house-3d/main/public/hamburger__food_big-hamburger.glb',
    realScaleCm: '14.5 cm de diâmetro (Escala 1:1)',
    prepTime: '15-20 min',
    weight: '220g de Blend Nobre',
    shortDescription: 'Dois smash Angus 100g com queijo gouda holandês no maçarico, cogumelos salteados no azeite trufado e maionese de alho negro no brioche selado.',
    fullDescription: 'Uma experiência sensorial incomparável. Dois suculentos smash burgers de 100g de Angus Black moído fresco na casa, queijo gouda holandês derretido sob chama direta de maçarico, mix de cogumelos shimeji e portobello salteados no azeite de trufas brancas, cebola roxa caramelizada em redução de vinho do Porto e nossa exclusiva maionese artesanal de alho negro tostado em pão brioche amanteigado com sementes de gergelim tostadas.',
    ingredients: ['Pão Brioche de Fermentação Natural', 'Duplo Smash Angus 100g (200g total)', 'Queijo Gouda Holandês Maçaricado', 'Cogumelos Trufados Salteados', 'Cebola Caramelizada ao Vinho do Porto', 'Maionese de Alho Negro'],
    hotspots: [
      { name: 'Pão Brioche Selado', pos: '0m 0.12m 0m', normal: '0m 1m 0m' },
      { name: 'Cheddar & Gouda Melt', pos: '0.04m 0.08m 0.03m', normal: '1m 0m 0m' },
      { name: 'Duplo Smash Angus', pos: '0m 0.05m 0.05m', normal: '0m 0m 1m' }
    ]
  },
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
    modelCdnFallback: 'https://raw.githubusercontent.com/mindset-code/burger-house-3d/main/public/hamburger__game_asset.glb',
    realScaleCm: '13.0 cm de diâmetro (Escala 1:1)',
    prepTime: '12-15 min',
    weight: '180g de Blend Smash',
    shortDescription: 'Dois ultra-smash 90g com crosta caramelizada Maillard, triplo cheddar inglês fundido, fatias de bacon crocante em lenha de macieira e molho especial Aura.',
    fullDescription: 'O padrão ouro dos smash burgers. Dois discos ultrafinos de carne nobre prensados em chapa de ferro a 280°C para criar aquela crostinha Maillard crocante e caramelizada inconfundível. Cobertos com generosas fatias de cheddar inglês cremoso derretido, tiras crocantes de bacon artesanal defumado lentamente em lenha de macieira, picles crocante artesanal e o icônico molho secreto Aura Burger.',
    ingredients: ['Pão Brioche Tostado na Manteiga', 'Duplo Ultra-Smash 90g (180g)', 'Triplo Queijo Cheddar Inglês', 'Bacon Artesanal Defumado na Macieira', 'Picles de Pepino Artesanal', 'Molho Secreto Aura'],
    hotspots: [
      { name: 'Crosta Maillard Crocante', pos: '0m 0.06m 0.04m', normal: '0m 0m 1m' },
      { name: 'Triplo Cheddar Inglês', pos: '0.03m 0.07m 0m', normal: '1m 0m 0m' },
      { name: 'Bacon Defumado Artesanal', pos: '-0.03m 0.08m 0.02m', normal: '-1m 0m 0m' }
    ]
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
    modelCdnFallback: 'https://raw.githubusercontent.com/shubhamraghav1/web/master/burger.glb',
    realScaleCm: '15.0 cm de diâmetro (Escala 1:1)',
    prepTime: '18-22 min',
    weight: '220g de Costela Bovina',
    shortDescription: 'Blend alto de costela 220g assado na brasa, queijo coalho dourado com melado de cana, barbecue de Bourbon e crocante de bacon no pão australiano.',
    fullDescription: 'Para quem ama sabor rústico e autêntico de fogo e fumaça. Blend alto de 220g preparado exclusivamente com costela bovina e cupim selecionado, grelhado no charbroiler em brasa viva. Servido com fatia espessa de queijo coalho tostada com fio de melado de cana da serra, cebola crispy super sequinha, molho barbecue artesanal reduzido com uísque bourbon e finalizado em pão australiano macio e escuro.',
    ingredients: ['Pão Australiano Artesanal com Cacau', 'Hambúrguer Alto de Costela 220g na Brasa', 'Queijo Coalho Tostado no Fogo', 'Glaçado com Melado de Cana', 'Cebola Crispy Dourada', 'Barbecue Defumado ao Bourbon'],
    hotspots: [
      { name: 'Pão Australiano Macio', pos: '0m 0.13m 0m', normal: '0m 1m 0m' },
      { name: 'Queijo Coalho Dourado', pos: '0m 0.09m 0.04m', normal: '0m 0m 1m' },
      { name: 'Costela Angus 220g', pos: '0m 0.05m 0.03m', normal: '0m 0m 1m' }
    ]
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
    modelCdnFallback: 'https://raw.githubusercontent.com/mindset-code/burger-house-3d/main/public/hamburger__game_asset.glb',
    realScaleCm: '14.0 cm de diâmetro (Escala 1:1)',
    prepTime: '14-18 min',
    weight: '200g Sobrecoxa Empanada',
    shortDescription: 'Sobrecoxa desossada ultra crocante marinada por 24h em buttermilk, queijo monterey jack derretido, salada coleslaw refrescante e molho spicy chipotle.',
    fullDescription: 'Crocância insana a cada mordida. Filé de sobrecoxa marinado em infusão de buttermilk com páprica defumada e alho confit por 24 horas, empanado em crosta rústica ultra crocante de flocos de milho temperados. Acompanha queijo Monterey Jack fundido, salada coleslaw crocante de repolho roxo com maçã verde fresca, picles de jalapeño e maionese aioli defumada de pimenta chipotle no pão de brioche.',
    ingredients: ['Pão Brioche Selado na Manteiga', 'Sobrecoxa Marinada em Buttermilk 200g', 'Empanamento Super Crunch Especial', 'Queijo Monterey Jack', 'Salada Coleslaw com Maçã Verde', 'Aioli de Chipotle Defumado'],
    hotspots: [
      { name: 'Empanamento Ultra Crunch', pos: '0m 0.07m 0.04m', normal: '0m 0m 1m' },
      { name: 'Salada Coleslaw Fresca', pos: '0m 0.10m 0.02m', normal: '0m 1m 0m' }
    ]
  },
  {
    id: 'fries-truffle',
    name: 'Batatas Rústicas Trufadas com Grana Padano',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    price: 26.90,
    originalPrice: 32.00,
    rating: 5.0,
    reviewsCount: 440,
    badge: '🍟 Irresistível',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    modelGlb: 'assets/models/burger-monster.glb',
    modelCdnFallback: 'https://raw.githubusercontent.com/mindset-code/burger-house-3d/main/public/hamburger__food_big-hamburger.glb',
    realScaleCm: 'Porção Generosa (320g)',
    prepTime: '10-12 min',
    weight: '320g de Batatas Artesanais',
    shortDescription: 'Batatas cortadas à mão com casca, fritas em dupla imersão, azeite de trufas brancas italianas, alecrim fresco tostado e chuva de queijo Grana Padano ralado.',
    fullDescription: 'Acompanhamento indispensável. Batatas Asterix selecionadas cortadas rusticamente à mão com casca, cozidas no vapor e fritas em dupla temperatura para obter interior aveludado e casquinha de vidro crocante. Finalizadas imediatamente com azeite de trufas brancas importado da Itália, folhas frescas de alecrim tostadas, flor de sal de Guérande e uma generosa nuvem de queijo italiano Grana Padano ralado na hora.',
    ingredients: ['Batatas Asterix Frescas com Casca', 'Dupla Fritura em Óleo de Algodão', 'Azeite de Trufas Brancas da Itália', 'Queijo Italiano Grana Padano Ralado', 'Alecrim Fresco e Flor de Sal'],
    hotspots: [
      { name: 'Crocância Perfeita', pos: '0m 0.05m 0.03m', normal: '0m 1m 0m' }
    ]
  },
  {
    id: 'shake-lotus',
    name: 'Shake de Caramelo Salgado & Lotus Biscoff',
    category: 'sobremesas',
    categoryLabel: 'Sobremesas & Shakes',
    price: 28.90,
    originalPrice: 34.00,
    rating: 4.9,
    reviewsCount: 310,
    badge: '🍦 O Mais Pedido',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80',
    modelGlb: 'assets/models/burger-classic.glb',
    modelCdnFallback: 'https://raw.githubusercontent.com/shubhamraghav1/web/master/burger.glb',
    realScaleCm: 'Copo Grande de 480ml',
    prepTime: '8-10 min',
    weight: '480ml Cremoso',
    shortDescription: 'Sorvete artesanal batido com calda de caramelo salgado tostado na panela de cobre, pedaços crocantes de biscoito belga Lotus Biscoff e chantilly de baunilha.',
    fullDescription: 'Pura indulgência para fechar o pedido com chave de ouro. Sorvete artesanal tipo gelato fior di latte batido com leite integral cremoso e calda densa de caramelo salgado preparada lentamente em panela de cobre com flor de sal. Mesclado com crumble crocante de biscoitos belgas Lotus Biscoff especiados, finalizado com generoso topo de chantilly fresco e biscoito Lotus inteiro.',
    ingredients: ['Gelato Artesanal Fior di Latte', 'Calda Artesanal de Caramelo Salgado', 'Biscoitos Belgas Lotus Biscoff Originais', 'Chantilly Fresco de Baunilha', 'Flor de Sal'],
    hotspots: [
      { name: 'Lotus Biscoff Belga', pos: '0m 0.10m 0m', normal: '0m 1m 0m' }
    ]
  }
];

// App State
const state = {
  activeCategory: 'todos',
  searchQuery: '',
  cart: [],
  activeProductForAR: null,
  isCameraSimulatorActive: false,
  cameraStream: null,
  isAutoRotate: true,
  isRealScale: true,
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
  // AR Modal
  arModal: document.getElementById('ar-modal'),
  modelViewer: document.getElementById('burger-viewer'),
  arTitle: document.getElementById('ar-modal-title'),
  arBadge: document.getElementById('ar-modal-badge'),
  arPrice: document.getElementById('ar-modal-price'),
  arScaleBadge: document.getElementById('ar-modal-scale-badge'),
  arWeight: document.getElementById('ar-modal-weight'),
  arDescription: document.getElementById('ar-modal-description'),
  arIngredientsList: document.getElementById('ar-modal-ingredients'),
  arTriggerBtn: document.getElementById('ar-trigger-btn'),
  arCameraSimulatorBtn: document.getElementById('ar-camera-sim-btn'),
  arCameraVideo: document.getElementById('ar-camera-feed'),
  arCameraOverlay: document.getElementById('ar-camera-overlay'),
  arRotateToggleBtn: document.getElementById('ar-rotate-toggle-btn'),
  arScaleToggleBtn: document.getElementById('ar-scale-toggle-btn'),
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

// Fetch network IP from server to display accurate QR code for phones
async function fetchNetworkInfo() {
  try {
    const res = await fetch('/api/info');
    if (res.ok) {
      state.networkIpInfo = await res.json();
      console.log('📡 Informações de Rede carregadas:', state.networkIpInfo);
    }
  } catch (err) {
    console.warn('Servidor local não retornou /api/info (usando window.location)');
  }
}

// Render Products Grid
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
      
      <!-- Top Media Area -->
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

        <!-- 3D AR Interactive Badge Prompt on Image -->
        <div class="absolute bottom-3 right-3 z-10 flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
          <i class="fa-solid fa-cube text-sm animate-pulse"></i>
          <span>3D & RA 1:1</span>
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
            <!-- Core AR Button (User Requirement) -->
            <button 
              onclick="openArModal('${prod.id}')"
              class="w-full btn-ar-primary py-3 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 group-hover:shadow-orange-500/40"
              title="Projetar este hambúrguer na sua mesa em Realidade Aumentada"
            >
              <i class="fa-solid fa-cubes-stacked text-base"></i>
              <span>Ver em RA 3D</span>
            </button>

            <!-- Add to Cart Button -->
            <button 
              onclick="addToCart('${prod.id}')"
              class="w-full py-3 px-4 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors flex items-center justify-center gap-2"
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

// Open 3D & Augmented Reality Modal
function openArModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.activeProductForAR = product;

  // Update modal information
  elements.arTitle.textContent = product.name;
  elements.arBadge.textContent = product.badge;
  elements.arPrice.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
  elements.arScaleBadge.textContent = product.realScaleCm;
  elements.arWeight.textContent = `${product.weight} • ${product.prepTime}`;
  elements.arDescription.textContent = product.fullDescription;

  // Update ingredients list
  elements.arIngredientsList.innerHTML = product.ingredients.map(ing => `
    <li class="flex items-center gap-2 text-xs text-slate-300">
      <i class="fa-solid fa-check text-amber-400 text-[10px]"></i>
      <span>${ing}</span>
    </li>
  `).join('');

  // Update Add to Cart Button in modal
  elements.arAddToCartBtn.innerHTML = `
    <i class="fa-solid fa-bag-shopping"></i>
    <span>Adicionar à Sacola • R$ ${product.price.toFixed(2).replace('.', ',')}</span>
  `;
  elements.arAddToCartBtn.onclick = () => {
    addToCart(product.id);
    closeArModal();
  };

  // Configure <model-viewer>
  const mv = elements.modelViewer;
  
  // Try local model first with remote fallback
  mv.src = product.modelGlb;
  mv.alt = `Modelo 3D de ${product.name} em Realidade Aumentada`;

  // Enable AR attributes explicitly
  mv.setAttribute('ar', '');
  mv.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
  mv.setAttribute('ar-scale', state.isRealScale ? 'fixed' : 'auto');
  mv.setAttribute('ar-placement', 'floor');
  mv.setAttribute('camera-controls', '');
  mv.setAttribute('shadow-intensity', '1.6');
  mv.setAttribute('shadow-softness', '0.9');
  mv.setAttribute('exposure', '1.1');
  
  if (state.isAutoRotate) {
    mv.setAttribute('auto-rotate', '');
  } else {
    mv.removeAttribute('auto-rotate');
  }

  // Remove previous custom hotspots and add new ones
  mv.querySelectorAll('.hotspot-dot').forEach(el => el.remove());
  if (product.hotspots && product.hotspots.length) {
    product.hotspots.forEach((hs, idx) => {
      const btn = document.createElement('button');
      btn.className = 'hotspot-dot';
      btn.slot = `hotspot-${idx}`;
      btn.dataset.position = hs.pos;
      btn.dataset.normal = hs.normal;
      btn.innerHTML = `<span class="hotspot-annotation">${hs.name}</span>`;
      mv.appendChild(btn);
    });
  }

  // Show modal with animation
  elements.arModal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  setTimeout(() => {
    elements.arModal.classList.add('modal-active');
  }, 10);
}

// Close AR Modal
function closeArModal() {
  stopCameraSimulator();
  elements.arModal.classList.remove('modal-active');
  setTimeout(() => {
    elements.arModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    state.activeProductForAR = null;
  }, 250);
}

// Trigger Native Augmented Reality via <model-viewer>
async function triggerAR() {
  const mv = elements.modelViewer;
  if (!mv) return;

  // Check if browser/device supports native WebXR / SceneViewer / QuickLook
  if (mv.canActivateAR) {
    console.log('🚀 Disparando AR nativo via WebXR / Scene Viewer / Quick Look...');
    try {
      await mv.activateAR();
      return;
    } catch (err) {
      console.warn('Falha ao ativar AR nativo:', err);
    }
  }

  // If on desktop or non-AR mobile, prompt camera simulator or QR code
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    // Try forcing activateAR anyway (some Android browsers support it without canActivateAR flag)
    try {
      await mv.activateAR();
    } catch (e) {
      // If still fails, activate live camera simulator
      toggleCameraSimulator();
    }
  } else {
    // On desktop: suggest QR Code or Camera Simulator
    showDesktopArOptions();
  }
}

// Show helper dialog for Desktop users
function showDesktopArOptions() {
  const choice = confirm(
    "💡 Dica de Realidade Aumentada:\n\n" +
    "Você está acessando pelo computador!\n\n" +
    "• Clique em 'OK' para abrir o QR Code e escanear com o seu celular (experiência 100% nativa na mesa).\n" +
    "• Ou clique em 'Cancelar' para ativar a Câmera Web do seu notebook/PC e ver a simulação aqui na tela."
  );

  if (choice) {
    openQrModal();
  } else {
    toggleCameraSimulator();
  }
}

// Toggle Live Camera Background Simulator (Desktop / Laptop / WebAR Fallback)
async function toggleCameraSimulator() {
  if (state.isCameraSimulatorActive) {
    stopCameraSimulator();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    state.cameraStream = stream;
    elements.arCameraVideo.srcObject = stream;
    elements.arCameraVideo.classList.remove('hidden');
    elements.arCameraOverlay.classList.remove('hidden');
    elements.arModal.classList.add('camera-active');
    state.isCameraSimulatorActive = true;

    elements.arCameraSimulatorBtn.innerHTML = `
      <i class="fa-solid fa-camera-slash text-red-400"></i>
      <span>Desativar Câmera</span>
    `;
    elements.arCameraSimulatorBtn.classList.add('border-red-500/50', 'text-red-300');

    console.log('📸 Câmera ativada para simulação de Realidade Aumentada');
  } catch (err) {
    console.error('Erro ao acessar câmera:', err);
    alert('Não foi possível acessar a câmera do dispositivo. Verifique as permissões do seu navegador.');
  }
}

function stopCameraSimulator() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach(track => track.stop());
    state.cameraStream = null;
  }
  elements.arCameraVideo.srcObject = null;
  elements.arCameraVideo.classList.add('hidden');
  elements.arCameraOverlay.classList.add('hidden');
  elements.arModal.classList.remove('camera-active');
  state.isCameraSimulatorActive = false;

  elements.arCameraSimulatorBtn.innerHTML = `
    <i class="fa-solid fa-camera text-amber-400"></i>
    <span>Simulador com Câmera</span>
  `;
  elements.arCameraSimulatorBtn.classList.remove('border-red-500/50', 'text-red-300');
}

// Setup Model Viewer Events (loading progress, errors, fallbacks)
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

  mv.addEventListener('error', (err) => {
    console.warn('Erro ao carregar modelo local, alternando para fallback CDN:', err);
    if (state.activeProductForAR && state.activeProductForAR.modelCdnFallback) {
      mv.src = state.activeProductForAR.modelCdnFallback;
    }
  });

  mv.addEventListener('ar-status', (event) => {
    console.log('Status da sessão AR:', event.detail.status);
    if (event.detail.status === 'failed') {
      alert('Seu dispositivo não suporta o modo AR nativo diretamente. Ativando o Simulador com Câmera!');
      toggleCameraSimulator();
    }
  });
}

// QR Code Pairing for Mobile Testing
function openQrModal() {
  const container = elements.qrContainer;
  container.innerHTML = '';

  // Determine the best URL for mobile:
  let mobileUrl = window.location.href;
  if (state.networkIpInfo && state.networkIpInfo.primaryIp && !window.location.hostname.includes('192.168.')) {
    mobileUrl = `http://${state.networkIpInfo.primaryIp}:${state.networkIpInfo.port || 3000}`;
  }

  elements.mobileUrlDisplay.textContent = mobileUrl;

  // Generate QR Code with qrcode.js
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
        <p class="text-xs text-slate-500 mt-1">Explore os burgers e veja em Realidade Aumentada!</p>
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
  const tableOrAddress = document.getElementById('checkout-address')?.value.trim() || 'Consumo no Local / Retirada';
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

  const phone = '5511999999999'; // Número fictício de demonstração da hamburgueria
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

// Event Listeners Setup
function setupEventListeners() {
  // Category tabs filter
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

  // Search input
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Auto-rotate toggle in AR Modal
  if (elements.arRotateToggleBtn) {
    elements.arRotateToggleBtn.addEventListener('click', () => {
      state.isAutoRotate = !state.isAutoRotate;
      if (state.isAutoRotate) {
        elements.modelViewer.setAttribute('auto-rotate', '');
        elements.arRotateToggleBtn.classList.add('text-amber-400');
      } else {
        elements.modelViewer.removeAttribute('auto-rotate');
        elements.arRotateToggleBtn.classList.remove('text-amber-400');
      }
    });
  }

  // Real scale lock toggle
  if (elements.arScaleToggleBtn) {
    elements.arScaleToggleBtn.addEventListener('click', () => {
      state.isRealScale = !state.isRealScale;
      elements.modelViewer.setAttribute('ar-scale', state.isRealScale ? 'fixed' : 'auto');
      elements.arScaleToggleBtn.classList.toggle('text-amber-400', state.isRealScale);
      showToastNotification(state.isRealScale ? '📏 Escala Real 1:1 Travada' : '🔍 Escala Livre Ativada');
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

// Global functions exposed to inline HTML triggers
window.openArModal = openArModal;
window.closeArModal = closeArModal;
window.triggerAR = triggerAR;
window.toggleCameraSimulator = toggleCameraSimulator;
window.openQrModal = openQrModal;
window.closeQrModal = closeQrModal;
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.openCart = openCart;
window.closeCart = closeCart;
window.checkoutWhatsApp = checkoutWhatsApp;

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', initApp);
