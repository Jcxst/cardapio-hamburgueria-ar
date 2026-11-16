# 🍔 AURA BURGER • Cardápio Digital 3D & Realidade Aumentada (WebXR)

Aplicação web responsiva de alta performance e acabamento luxuoso no padrão Apple para cardápio digital de hamburgueria gourmet, com visualização tridimensional e projeção de hambúrgueres em **Realidade Aumentada (AR) em escala real (1:1)** diretamente sobre a mesa do cliente através do navegador do celular.

---

## 🚀 Tecnologias Utilizadas

- **Google `<model-viewer>` 3.5.0**: Mecanismo oficial do Google para WebXR, Scene Viewer (Android / ARCore) e Quick Look (iOS / ARKit).
- **WebXR Device API**: Projeção direta na câmera com detecção de superfícies planas (*plane detection*) e escala fixa 1:1.
- **Node.js HTTP Server**: Servidor leve, sem dependências externas, com suporte a *HTTP Range Requests*, headers CORS e detecção automática de IP na rede Wi-Fi para emparelhamento por QR Code.
- **Tailwind CSS & Glassmorphism**: Interface dark gourmet de alto luxo, tipografia refinada (*Plus Jakarta Sans* e *Outfit*), microinterações a 60fps e contrastes elegantes.
- **Simulador AR com Câmera (Webcam)**: Fallback inteligente que ativa a câmera do dispositivo via `getUserMedia` com plano de fundo transparente caso o usuário esteja em um notebook ou navegador sem suporte nativo a WebXR.
- **QRCode.js**: Geração dinâmica de QR Code para que clientes no desktop possam apontar a câmera do smartphone e abrir instantaneamente a experiência WebXR na mesa.

---

## 📦 Estrutura do Projeto

```
teste3d/
├── assets/
│   ├── css/
│   │   └── style.css            # Estilos personalizados, glassmorphism, animações e hotspots
│   ├── js/
│   │   └── app.js               # Catálogo de produtos, controlador do Model-Viewer, AR e carrinho
│   └── models/
│       ├── burger-smash.glb     # Modelo 3D: Classic Smash Double Cheese
│       ├── burger-monster.glb   # Modelo 3D: The Grand Truffle Master
│       └── burger-classic.glb   # Modelo 3D: Smoked BBQ Ribs Burger
├── index.html                   # Aplicação web completa e responsiva
├── server.js                    # Servidor local Node.js com MIME types, CORS e IP na LAN
├── package.json                 # Manifesto do projeto
└── README.md                    # Documentação do projeto
```

---

## 🛠️ Como Executar

### 1. Iniciar o Servidor Local

No terminal do projeto, execute:

```bash
node server.js
```
*(ou `npm start`)*

Você verá a seguinte saída no terminal:

```text
====================================================
🍔 AURA BURGER - Cardápio Digital em Realidade Aumentada
====================================================
📡 Local:    http://localhost:3000
📱 No Celular (Mesmo Wi-Fi): http://192.168.0.10:3000
====================================================
```

### 2. Acessar no Computador
Abra o navegador e acesse:
👉 `http://localhost:3000`

### 3. Acessar no Celular (Realidade Aumentada Nativa)
Para projetar o hambúrguer sobre a mesa em tamanho real (1:1):
1. Certifique-se de que o celular está conectado na **mesma rede Wi-Fi** do computador.
2. Na página do computador, clique no botão **"Abrir no Celular"** no topo para exibir o QR Code, ou digite o endereço `http://<SEU_IP_LOCAL>:3000` no navegador do celular (Chrome no Android ou Safari no iOS).
3. Toque em **"Ver em RA 3D"** em qualquer burger e depois em **"Abrir Câmera RA (Escala Real)"**.
4. Aponte a câmera para a mesa e mova suavemente o aparelho em círculos para detectar a superfície plana. O hambúrguer aparecerá na mesa em tamanho real!

---

## 🔍 Funcionalidades Detalhadas

1. **Cardápio Interativo com Copywriting Sensorial**:
   - Descrições ricas com foco em apelo gastronômico (crosta Maillard, queijos maçaricados, pão brioche dourado na manteiga, azeite de trufas).
   - Selos de destaque ("Mais Vendido", "Favorito da Casa", "Blend Nobre").
   - Filtro ágil por categorias ("Todos", "Burgers Artesanais", "Smash Burgers", "Acompanhamentos", "Sobremesas").
   - Busca em tempo real por nome e ingredientes.

2. **Visualizador 3D & Realidade Aumentada (`<model-viewer>`)**:
   - Rotação livre em 360°, controle de zoom e ângulo de câmera.
   - **Escala 1:1 Travada (`ar-scale="fixed"`)**: Garante que o hambúrguer apareça com o tamanho real físico de consumo (~14 cm de diâmetro), evitando distorções.
   - **Projeção em Superfícies Planas (`ar-placement="floor"`)**: Otimizado para mesas, bancadas e balcões.
   - **Iluminação e Sombras Realistas (`shadow-intensity="1.7"`, `exposure="1.1"`)**.
   - **Hotspots Informativos**: Pontos interativos destacando cada camada do lanche (Pão Brioche, Cheddar Inglês, Blend Angus, Molhos).
   - **Simulador AR com Câmera**: Permite ativar a câmera do dispositivo como plano de fundo sob o modelo 3D em notebooks ou computadores.

3. **Sacola de Pedidos & Checkout WhatsApp**:
   - Adição e remoção de itens com atualização em tempo real de subtotais e taxa de entrega.
   - Campo para inserção de nome do cliente, número da mesa ou endereço de entrega.
   - Botão para envio do pedido formatado diretamente para o WhatsApp da hamburgueria.
