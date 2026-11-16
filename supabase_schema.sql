-- ==========================================================================
-- AURA BURGER LAB • ESTRUTURA DO BANCO DE DADOS (SUPABASE POSTGRESQL)
-- Execute este script no SQL Editor do seu projeto Supabase:
-- https://supabase.com/dashboard/project/ypibmhjqobjrvdvqggcn/sql/new
-- ==========================================================================

-- 1. TABELA DE PRODUTOS DO CARDÁPIO (Burgers 3D & Acompanhamentos)
CREATE TABLE IF NOT EXISTS public.burger_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  rating NUMERIC(2, 1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  badge TEXT,
  image TEXT NOT NULL,
  model_glb TEXT NOT NULL,
  model_https_url TEXT NOT NULL,
  real_scale_cm TEXT NOT NULL,
  prep_time TEXT NOT NULL,
  weight TEXT NOT NULL,
  short_description TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABELA DE PEDIDOS (Orders em tempo real)
CREATE TABLE IF NOT EXISTS public.burger_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  table_or_address TEXT NOT NULL,
  notes TEXT,
  items JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  delivery_fee NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'recebido' NOT NULL, -- 'recebido', 'em_preparo', 'pronto', 'entregue', 'cancelado'
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.burger_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.burger_orders ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS DE SEGURANÇA (RLS POLICIES)
-- Qualquer cliente pode visualizar os produtos ativos do cardápio
DROP POLICY IF EXISTS "Permitir leitura pública de produtos ativos" ON public.burger_products;
CREATE POLICY "Permitir leitura pública de produtos ativos"
  ON public.burger_products
  FOR SELECT
  USING (is_active = true);

-- Clientes podem criar pedidos na sacola
DROP POLICY IF EXISTS "Permitir criação pública de pedidos" ON public.burger_orders;
CREATE POLICY "Permitir criação pública de pedidos"
  ON public.burger_orders
  FOR INSERT
  WITH CHECK (true);

-- Apenas leitura de pedidos com chave autenticada ou service_role
DROP POLICY IF EXISTS "Permitir leitura autenticada de pedidos" ON public.burger_orders;
CREATE POLICY "Permitir leitura autenticada de pedidos"
  ON public.burger_orders
  FOR SELECT
  USING (true);

-- 5. ÍNDICES PARA PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_burger_products_category ON public.burger_products(category);
CREATE INDEX IF NOT EXISTS idx_burger_orders_created_at ON public.burger_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_burger_orders_status ON public.burger_orders(status);

-- 6. DADOS INICIAIS (SEED DATA COM OS HAMBÚRGUERES 3D CALIBRADOS)
INSERT INTO public.burger_products (
  id, name, category, category_label, price, original_price, rating, reviews_count,
  badge, image, model_glb, model_https_url, real_scale_cm, prep_time, weight, short_description
) VALUES
(
  'smash-king',
  'Aura Smash King Deluxe',
  'smash',
  'Smash Burgers',
  39.90,
  45.90,
  5.0,
  512,
  '🔥 Favorito da Casa',
  'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80',
  'assets/models/burger-smash.glb',
  'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-smash.glb',
  '13.5 cm (Escala 1:1 Real)',
  '12-15 min',
  '180g de Blend Smash',
  'Dois ultra-smash 90g com crosta caramelizada Maillard, triplo cheddar inglês fundido e fatias de bacon crocante em lenha de macieira.'
),
(
  'grand-truffle',
  'The Grand Truffle Master',
  'artesanais',
  'Burgers Artesanais',
  46.90,
  54.90,
  4.9,
  384,
  '🏆 Mais Vendido',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
  'assets/models/burger-monster.glb',
  'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-monster.glb',
  '14.1 cm (Escala 1:1 Real)',
  '15-20 min',
  '220g de Blend Nobre',
  'Dois smash Angus 100g com queijo gouda holandês no maçarico, cogumelos salteados no azeite trufado e maionese de alho negro no brioche selado.'
),
(
  'smoked-ribs',
  'Smoked BBQ Ribs Burger',
  'artesanais',
  'Burgers Artesanais',
  49.90,
  58.00,
  4.8,
  229,
  '⭐ Blend Nobre de Costela',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
  'assets/models/burger-classic.glb',
  'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-classic.glb',
  '14.0 cm (Escala 1:1 Real)',
  '18-22 min',
  '220g de Costela Bovina',
  'Blend alto de costela 220g assado na brasa, queijo coalho dourado com melado de cana, barbecue de Bourbon e crocante de bacon no pão australiano.'
),
(
  'crispy-dragon',
  'Crispy Dragon Chicken',
  'especiais',
  'Especiais do Chef',
  42.90,
  48.90,
  4.9,
  198,
  '🍗 Super Crocante',
  'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=80',
  'assets/models/burger-smash.glb',
  'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-smash.glb',
  '13.5 cm (Escala 1:1 Real)',
  '14-18 min',
  '200g Sobrecoxa Empanada',
  'Sobrecoxa desossada ultra crocante marinada por 24h em buttermilk, queijo monterey jack derretido, salada coleslaw e molho spicy chipotle.'
),
(
  'fries-truffle',
  'Batatas Rústicas Trufadas',
  'acompanhamentos',
  'Acompanhamentos',
  26.90,
  32.00,
  5.0,
  440,
  '🍟 Irresistível',
  'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
  'assets/models/burger-monster.glb',
  'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-monster.glb',
  'Porção Generosa (320g)',
  '10-12 min',
  '320g de Batatas Artesanais',
  'Batatas com casca fritas em dupla imersão, azeite de trufas brancas italianas, alecrim fresco e chuva de queijo Grana Padano ralado.'
),
(
  'shake-lotus',
  'Shake de Caramelo & Lotus',
  'sobremesas',
  'Sobremesas & Shakes',
  28.90,
  34.00,
  4.9,
  310,
  '🍦 O Mais Pedido',
  'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80',
  'assets/models/burger-classic.glb',
  'https://raw.githubusercontent.com/Jcxst/cardapio-hamburgueria-ar/main/assets/models/burger-classic.glb',
  'Copo Grande de 480ml',
  '8-10 min',
  '480ml Cremoso',
  'Sorvete artesanal batido com calda de caramelo salgado na panela de cobre, crumble crocante de biscoitos belgas Lotus Biscoff e chantilly.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  model_glb = EXCLUDED.model_glb,
  model_https_url = EXCLUDED.model_https_url,
  real_scale_cm = EXCLUDED.real_scale_cm,
  short_description = EXCLUDED.short_description;
