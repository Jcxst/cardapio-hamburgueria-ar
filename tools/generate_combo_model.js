const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { Document, NodeIO } = require('@gltf-transform/core');
const { mergeDocuments } = require('@gltf-transform/functions');
const { KHRONOS_EXTENSIONS } = require('@gltf-transform/extensions');
const validator = require('gltf-validator');

/**
 * Utilitário para decodificar PNG sem dependências externas
 */
function decodePng(buf) {
  let offset = 8;
  const idats = [];
  let width = 0, height = 0;
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(offset + 8);
      height = buf.readUInt32BE(offset + 12);
    }
    if (type === 'IDAT') {
      idats.push(buf.subarray(offset + 8, offset + 8 + len));
    }
    offset += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idats));
  const bpp = 4;
  const stride = 1 + width * bpp;
  const pixels = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * stride];
    const rowStart = y * stride + 1;
    for (let x = 0; x < width * bpp; x++) {
      const cur = raw[rowStart + x];
      const a = x >= bpp ? pixels[y * width * bpp + x - bpp] : 0;
      const b = y > 0 ? pixels[(y - 1) * width * bpp + x] : 0;
      const c = (x >= bpp && y > 0) ? pixels[(y - 1) * width * bpp + x - bpp] : 0;
      let val = cur;
      if (filter === 1) val = (cur + a) & 0xff;
      else if (filter === 2) val = (cur + b) & 0xff;
      else if (filter === 3) val = (cur + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr = c;
        if (pa <= pb && pa <= pc) pr = a;
        else if (pb <= pc) pr = b;
        val = (cur + pr) & 0xff;
      }
      pixels[y * width * bpp + x] = val;
    }
  }
  return { width, height, pixels };
}

/**
 * Utilitário para codificar um buffer RGBA em PNG padrão
 */
function createPng(width, height, rgbaBuffer) {
  const stride = 1 + width * 4;
  const raw = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0; // Filter: None
    rgbaBuffer.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });

  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
    table[i] = c;
  }
  function crc32(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  }
  function makeChunk(type, data) {
    const chunk = Buffer.alloc(12 + data.length);
    chunk.writeUInt32BE(data.length, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);
    const crcBuf = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    chunk.writeUInt32BE(crc32(crcBuf), 8 + data.length);
    return chunk;
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([header, makeChunk('IHDR', ihdr), makeChunk('IDAT', idat), makeChunk('IEND', Buffer.alloc(0))]);
}

/**
 * Cria uma textura de madeira com veios ricos e a gravação "BADECO BURGUER'S"
 */
function generateBoardTexture(sourceImg) {
  const width = 512, height = 512;
  const out = Buffer.alloc(width * height * 4);

  // Base de madeira rica com anéis e veios orgânicos
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Simulação de anéis de crescimento e veios de carvalho
      const grain = Math.sin(x * 0.08 + Math.sin(y * 0.03) * 3) * 0.5 + 0.5;
      const noise = (Math.sin(x * 0.4) * Math.cos(y * 0.4) * 0.5 + 0.5) * 0.15;
      const woodTone = 0.70 + grain * 0.20 + noise;

      // Cor de madeira dourada / mel (RGB ~ 195, 135, 70)
      const r = Math.min(255, Math.floor(198 * woodTone));
      const g = Math.min(255, Math.floor(138 * woodTone));
      const b = Math.min(255, Math.floor(75 * woodTone));

      const idx = (y * width + x) * 4;
      out[idx] = r;
      out[idx + 1] = g;
      out[idx + 2] = b;
      out[idx + 3] = 255;
    }
  }

  // Se tiver a imagem original, mistura a gravação autêntica "BADECO BURGUER'S"
  if (sourceImg) {
    // Coordenadas da gravação na foto original: X: 120..400, Y: 330..400
    const srcX0 = 120, srcX1 = 400;
    const srcY0 = 330, srcY1 = 400;
    const srcW = srcX1 - srcX0;
    const srcH = srcY1 - srcY0;

    // Destino na textura (frente da tábua, parte inferior)
    const dstX0 = 50, dstX1 = 462;
    const dstY0 = 320, dstY1 = 440;
    const dstW = dstX1 - dstX0;
    const dstH = dstY1 - dstY0;

    for (let dy = 0; dy < dstH; dy++) {
      for (let dx = 0; dx < dstW; dx++) {
        const sx = Math.floor(srcX0 + (dx / dstW) * srcW);
        const sy = Math.floor(srcY0 + (dy / dstH) * srcH);
        const sidx = (sy * sourceImg.width + sx) * 4;
        const sr = sourceImg.pixels[sidx];
        const sg = sourceImg.pixels[sidx + 1];
        const sb = sourceImg.pixels[sidx + 2];

        // Se for o texto pirogravado escuro da madeira
        const brightness = (sr * 0.299 + sg * 0.587 + sb * 0.114);
        if (brightness < 120) {
          const didx = ((dstY0 + dy) * width + (dstX0 + dx)) * 4;
          const factor = Math.max(0, Math.min(1, (120 - brightness) / 100));
          out[didx] = Math.floor(out[didx] * (1 - factor) + 55 * factor);
          out[didx + 1] = Math.floor(out[didx + 1] * (1 - factor) + 30 * factor);
          out[didx + 2] = Math.floor(out[didx + 2] * (1 - factor) + 18 * factor);
        }
      }
    }
  }

  return createPng(width, height, out);
}

/**
 * Cria a textura do rótulo da Garrafa Guaraná Antarctica
 */
function generateGuaranaLabel(sourceImg) {
  const width = 512, height = 256;
  const out = Buffer.alloc(width * height * 4);

  // Fundo verde característico do Guaraná Antarctica
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      out[idx] = 20;     // R
      out[idx + 1] = 135; // G
      out[idx + 2] = 48;  // B
      out[idx + 3] = 255;
    }
  }

  // Se tiver a foto fonte, extrai o emblema autêntico do Guaraná (X: 180..260, Y: 150..220)
  if (sourceImg) {
    const srcX0 = 175, srcX1 = 265;
    const srcY0 = 145, srcY1 = 225;
    const srcW = srcX1 - srcX0;
    const srcH = srcY1 - srcY0;

    const dstX0 = 176, dstX1 = 336;
    const dstY0 = 40, dstY1 = 216;
    const dstW = dstX1 - dstX0;
    const dstH = dstY1 - dstY0;

    for (let dy = 0; dy < dstH; dy++) {
      for (let dx = 0; dx < dstW; dx++) {
        const sx = Math.floor(srcX0 + (dx / dstW) * srcW);
        const sy = Math.floor(srcY0 + (dy / dstH) * srcH);
        const sidx = (sy * sourceImg.width + sx) * 4;
        const didx = ((dstY0 + dy) * width + (dstX0 + dx)) * 4;

        const sa = sourceImg.pixels[sidx + 3];
        if (sa > 50) {
          out[didx] = sourceImg.pixels[sidx];
          out[didx + 1] = sourceImg.pixels[sidx + 1];
          out[didx + 2] = sourceImg.pixels[sidx + 2];
          out[didx + 3] = 255;
        }
      }
    }
  }

  return createPng(width, height, out);
}

/**
 * Cria a malha da Tábua Rústica (0.28m x 0.18m x 0.02m) com topo texturizado e bordas de madeira
 */
function buildBoardMesh(doc, buffer, boardMat) {
  const w = 0.28 / 2; // 0.14
  const h = 0.02;     // 2 cm
  const d = 0.18 / 2; // 0.09

  // 24 vértices para um paralelepípedo perfeito com UVs e Normais limpas
  const positions = new Float32Array([
    // Topo (Y = h) - Onde o combo é servido e onde fica o logo gravado
    -w, h, -d,   w, h, -d,   w, h,  d,  -w, h,  d,
    // Base (Y = 0) - Apoiada na mesa
    -w, 0,  d,   w, 0,  d,   w, 0, -d,  -w, 0, -d,
    // Frente (Z = +d)
    -w, 0,  d,   w, 0,  d,   w, h,  d,  -w, h,  d,
    // Fundo (Z = -d)
    w, 0, -d,  -w, 0, -d,  -w, h, -d,   w, h, -d,
    // Lateral Direita (X = +w)
     w, 0,  d,   w, 0, -d,   w, h, -d,   w, h,  d,
    // Lateral Esquerda (X = -w)
    -w, 0, -d,  -w, 0,  d,  -w, h,  d,  -w, h, -d
  ]);

  const normals = new Float32Array([
    // Topo
    0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0,
    // Base
    0, -1, 0,  0, -1, 0,  0, -1, 0,  0, -1, 0,
    // Frente
    0, 0, 1,  0, 0, 1,  0, 0, 1,  0, 0, 1,
    // Fundo
    0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1,
    // Direita
    1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0,
    // Esquerda
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0
  ]);

  const uvs = new Float32Array([
    // Topo: cobre a textura 0..1 perfeitamente orientada
    0, 0,   1, 0,   1, 1,   0, 1,
    // Base
    0, 1,   1, 1,   1, 0,   0, 0,
    // Frente
    0, 0.9, 1, 0.9, 1, 1.0, 0, 1.0,
    // Fundo
    0, 0.9, 1, 0.9, 1, 1.0, 0, 1.0,
    // Direita
    0, 0.9, 1, 0.9, 1, 1.0, 0, 1.0,
    // Esquerda
    0, 0.9, 1, 0.9, 1, 1.0, 0, 1.0
  ]);

  const indices = new Uint16Array([
    0, 1, 2,   0, 2, 3,    // Topo
    4, 5, 6,   4, 6, 7,    // Base
    8, 9, 10,  8, 10, 11,  // Frente
    12, 13, 14, 12, 14, 15,// Fundo
    16, 17, 18, 16, 18, 19,// Direita
    20, 21, 22, 20, 22, 23 // Esquerda
  ]);

  const posAcc = doc.createAccessor().setType('VEC3').setBuffer(buffer).setArray(positions);
  const normAcc = doc.createAccessor().setType('VEC3').setBuffer(buffer).setArray(normals);
  const uvAcc = doc.createAccessor().setType('VEC2').setBuffer(buffer).setArray(uvs);
  const indAcc = doc.createAccessor().setType('SCALAR').setBuffer(buffer).setArray(indices);

  const prim = doc.createPrimitive()
    .setAttribute('POSITION', posAcc)
    .setAttribute('NORMAL', normAcc)
    .setAttribute('TEXCOORD_0', uvAcc)
    .setIndices(indAcc)
    .setMaterial(boardMat);

  return doc.createMesh('TabuaMesh').addPrimitive(prim);
}

/**
 * Cria a Garrafa 3D de Guaraná Antarctica com corpo translúcido esmeralda,
 * rótulo frontal e tampa metálica.
 */
function buildGuaranaBottle(doc, buffer, glassMat, labelMat, capMat, cx = -0.015, cy = 0.02, cz = -0.035) {
  const segments = 24;
  // Perfil da garrafa: [y_offset, raio, is_label]
  const profile = [
    [0.000, 0.025, false], // Base no contato da tábua
    [0.005, 0.028, false], // Pé da garrafa
    [0.030, 0.0285, false],// Parte inferior do corpo
    [0.035, 0.029, true],  // Início do rótulo
    [0.085, 0.029, true],  // Fim do rótulo
    [0.100, 0.0285, false],// Cintura superior
    [0.115, 0.0265, false],// Curvatura do ombro
    [0.135, 0.021, false], // Ombro afunilando
    [0.155, 0.0125, false],// Gargalo
    [0.178, 0.0120, false],// Topo do gargalo
    [0.180, 0.0135, false],// Anel da rosca
    [0.182, 0.0130, false],// Base da tampa
    [0.194, 0.0130, false],// Topo da tampa
    [0.194, 0.000, false]  // Fechamento central
  ];

  // Vamos gerar os vértices e triângulos da garrafa
  const bottleMesh = doc.createMesh('GuaranaBottleMesh');

  // Separar em duas seções: Corpo de vidro e Faixa do Rótulo
  function createLatheSection(startPIdx, endPIdx, material, isLabelSection = false) {
    const ringCount = endPIdx - startPIdx + 1;
    const totalVerts = ringCount * (segments + 1);
    const positions = new Float32Array(totalVerts * 3);
    const normals = new Float32Array(totalVerts * 3);
    const uvs = new Float32Array(totalVerts * 2);
    const indices = [];

    let vIdx = 0;
    for (let r = 0; r < ringCount; r++) {
      const p = profile[startPIdx + r];
      const py = cy + p[0];
      const pr = p[1];
      const vNorm = r / (ringCount - 1);

      for (let s = 0; s <= segments; s++) {
        const uNorm = s / segments;
        const angle = uNorm * Math.PI * 2 + Math.PI * 0.5; // Rotaciona para virar o rótulo para a frente
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const px = cx + cos * pr;
        const pz = cz + sin * pr;

        positions[vIdx * 3] = px;
        positions[vIdx * 3 + 1] = py;
        positions[vIdx * 3 + 2] = pz;

        // Normal cilíndrica aproximada
        normals[vIdx * 3] = cos;
        normals[vIdx * 3 + 1] = 0;
        normals[vIdx * 3 + 2] = sin;

        uvs[vIdx * 2] = uNorm;
        uvs[vIdx * 2 + 1] = 1 - vNorm;

        vIdx++;
      }
    }

    // Criar quadriláteros entre anéis adjacentes
    for (let r = 0; r < ringCount - 1; r++) {
      const row1 = r * (segments + 1);
      const row2 = (r + 1) * (segments + 1);
      for (let s = 0; s < segments; s++) {
        const i0 = row1 + s;
        const i1 = row1 + s + 1;
        const i2 = row2 + s + 1;
        const i3 = row2 + s;

        indices.push(i0, i1, i2);
        indices.push(i0, i2, i3);
      }
    }

    const posAcc = doc.createAccessor().setType('VEC3').setBuffer(buffer).setArray(positions);
    const normAcc = doc.createAccessor().setType('VEC3').setBuffer(buffer).setArray(normals);
    const uvAcc = doc.createAccessor().setType('VEC2').setBuffer(buffer).setArray(uvs);
    const indAcc = doc.createAccessor().setType('SCALAR').setBuffer(buffer).setArray(new Uint16Array(indices));

    const prim = doc.createPrimitive()
      .setAttribute('POSITION', posAcc)
      .setAttribute('NORMAL', normAcc)
      .setAttribute('TEXCOORD_0', uvAcc)
      .setIndices(indAcc)
      .setMaterial(material);

    bottleMesh.addPrimitive(prim);
  }

  // Seção 1: Base até o início do rótulo
  createLatheSection(0, 3, glassMat);
  // Seção 2: Rótulo do Guaraná Antarctica
  createLatheSection(3, 4, labelMat, true);
  // Seção 3: Ombro e Gargalo de vidro
  createLatheSection(4, 11, glassMat);
  // Seção 4: Tampa
  createLatheSection(11, 13, capMat);

  return bottleMesh;
}

/**
 * Cria uma porção de 20 palitos de batata frita rústica crocante em 3D
 */
function buildFrenchFriesHeap(doc, buffer, fryMat, baseCx = -0.075, baseCy = 0.02, baseCz = 0.015) {
  const fryPositions = [];
  const fryNormals = [];
  const fryUvs = [];
  const fryIndices = [];

  // Configuração dos 20 palitos de batata (comprimento, ângulo yaw, ângulo tilt, offset)
  const fries = [
    { dx: 0.055, w: 0.0085, h: 0.0085, ox: -0.020, oy: 0.004, oz: -0.015, yaw: 0.2, tilt: 0.0 },
    { dx: 0.065, w: 0.0085, h: 0.0085, ox: 0.005,  oy: 0.004, oz: -0.010, yaw: -0.4, tilt: 0.0 },
    { dx: 0.060, w: 0.0085, h: 0.0085, ox: -0.010, oy: 0.004, oz: 0.005,  yaw: 0.6, tilt: 0.0 },
    { dx: 0.058, w: 0.0085, h: 0.0085, ox: 0.015,  oy: 0.004, oz: 0.010,  yaw: -0.1, tilt: 0.0 },
    { dx: 0.062, w: 0.0085, h: 0.0085, ox: -0.025, oy: 0.004, oz: 0.025,  yaw: 0.8, tilt: 0.0 },
    { dx: 0.054, w: 0.0085, h: 0.0085, ox: 0.000,  oy: 0.004, oz: 0.030,  yaw: -0.5, tilt: 0.0 },

    // Segunda camada (sobrepostas)
    { dx: 0.064, w: 0.0085, h: 0.0085, ox: -0.015, oy: 0.012, oz: -0.008, yaw: 0.9, tilt: 0.08 },
    { dx: 0.068, w: 0.0085, h: 0.0085, ox: 0.010,  oy: 0.012, oz: -0.002, yaw: -0.3, tilt: -0.05 },
    { dx: 0.059, w: 0.0085, h: 0.0085, ox: -0.005, oy: 0.013, oz: 0.012,  yaw: 0.3, tilt: 0.04 },
    { dx: 0.063, w: 0.0085, h: 0.0085, ox: 0.018,  oy: 0.012, oz: 0.022,  yaw: -0.7, tilt: 0.06 },
    { dx: 0.055, w: 0.0085, h: 0.0085, ox: -0.020, oy: 0.012, oz: 0.018,  yaw: -0.2, tilt: -0.04 },

    // Terceira camada (topo da pilha crocante)
    { dx: 0.060, w: 0.0085, h: 0.0085, ox: -0.008, oy: 0.020, oz: 0.002,  yaw: -0.6, tilt: 0.12 },
    { dx: 0.062, w: 0.0085, h: 0.0085, ox: 0.005,  oy: 0.021, oz: 0.008,  yaw: 0.7, tilt: -0.10 },
    { dx: 0.056, w: 0.0085, h: 0.0085, ox: -0.012, oy: 0.021, oz: 0.015,  yaw: 0.1, tilt: 0.07 },
    { dx: 0.058, w: 0.0085, h: 0.0085, ox: 0.012,  oy: 0.020, oz: -0.005, yaw: -0.8, tilt: -0.06 },

    // Quarta camada e palitos inclinados
    { dx: 0.057, w: 0.0085, h: 0.0085, ox: -0.003, oy: 0.028, oz: 0.006,  yaw: 0.4, tilt: 0.05 },
    { dx: 0.052, w: 0.0085, h: 0.0085, ox: 0.002,  oy: 0.028, oz: 0.011,  yaw: -0.5, tilt: -0.08 },
    { dx: 0.065, w: 0.0085, h: 0.0085, ox: -0.028, oy: 0.008, oz: -0.005, yaw: 1.1, tilt: 0.15 },
    { dx: 0.061, w: 0.0085, h: 0.0085, ox: 0.022,  oy: 0.007, oz: 0.018,  yaw: -1.2, tilt: -0.14 },
    { dx: 0.050, w: 0.0085, h: 0.0085, ox: -0.002, oy: 0.034, oz: 0.009,  yaw: 0.85, tilt: 0.03 }
  ];

  let vertOffset = 0;

  fries.forEach(f => {
    const hw = f.dx / 2;
    const hh = f.h / 2;
    const hd = f.w / 2;

    const cosY = Math.cos(f.yaw);
    const sinY = Math.sin(f.yaw);
    const cosT = Math.cos(f.tilt);
    const sinT = Math.sin(f.tilt);

    // 8 vértices locais do paralelepípedo
    const localBox = [
      [-hw, -hh, -hd], [ hw, -hh, -hd], [ hw,  hh, -hd], [-hw,  hh, -hd], // Z-
      [-hw, -hh,  hd], [ hw, -hh,  hd], [ hw,  hh,  hd], [-hw,  hh,  hd]  // Z+
    ];

    // Transforma e translada
    const transformed = localBox.map(([lx, ly, lz]) => {
      // Tilt (rotação em Z)
      const tx = lx * cosT - ly * sinT;
      const ty = lx * sinT + ly * cosT;
      const tz = lz;

      // Yaw (rotação em Y)
      const wx = tx * cosY + tz * sinY + baseCx + f.ox;
      const wy = ty + baseCy + f.oy;
      const wz = -tx * sinY + tz * cosY + baseCz + f.oz;

      return [wx, wy, wz];
    });

    // 6 faces (24 vértices)
    const faceIndices = [
      [0, 1, 2, 3,  0, 0, -1], // Traseira
      [5, 4, 7, 6,  0, 0,  1], // Frontal
      [3, 2, 6, 7,  0, 1,  0], // Topo
      [4, 5, 1, 0,  0, -1, 0], // Base
      [1, 5, 6, 2,  1, 0,  0], // Direita
      [4, 0, 3, 7, -1, 0,  0]  // Esquerda
    ];

    faceIndices.forEach(face => {
      const i0 = face[0], i1 = face[1], i2 = face[2], i3 = face[3];
      const nx = face[4], ny = face[5], nz = face[6];

      // Gira normais com yaw
      const rnx = nx * cosY + nz * sinY;
      const rny = ny;
      const rnz = -nx * sinY + nz * cosY;

      [i0, i1, i2, i3].forEach((vIndex, uvIdx) => {
        const v = transformed[vIndex];
        fryPositions.push(v[0], v[1], v[2]);
        fryNormals.push(rnx, rny, rnz);
        fryUvs.push(uvIdx === 0 || uvIdx === 3 ? 0 : 1, uvIdx === 0 || uvIdx === 1 ? 0 : 1);
      });

      fryIndices.push(
        vertOffset, vertOffset + 1, vertOffset + 2,
        vertOffset, vertOffset + 2, vertOffset + 3
      );
      vertOffset += 4;
    });
  });

  const posAcc = doc.createAccessor().setType('VEC3').setBuffer(buffer).setArray(new Float32Array(fryPositions));
  const normAcc = doc.createAccessor().setType('VEC3').setBuffer(buffer).setArray(new Float32Array(fryNormals));
  const uvAcc = doc.createAccessor().setType('VEC2').setBuffer(buffer).setArray(new Float32Array(fryUvs));
  const indAcc = doc.createAccessor().setType('SCALAR').setBuffer(buffer).setArray(new Uint16Array(fryIndices));

  const prim = doc.createPrimitive()
    .setAttribute('POSITION', posAcc)
    .setAttribute('NORMAL', normAcc)
    .setAttribute('TEXCOORD_0', uvAcc)
    .setIndices(indAcc)
    .setMaterial(fryMat);

  return doc.createMesh('FrenchFriesMesh').addPrimitive(prim);
}

/**
 * Função Principal de Construção do Modelo 3D Completo do Combo Badeco Burguer's
 */
async function buildFullComboModel() {
  console.log('🚀 Iniciando geração do modelo 3D do Combo Badeco...');

  const io = new NodeIO().registerExtensions(KHRONOS_EXTENSIONS);
  const burgerGlbPath = path.join(__dirname, '..', 'assets', 'models', 'burger-smash.glb');
  const userPhotoPath = path.join(__dirname, '..', 'assets', 'uploads', 'item_1794852496913.png');

  let sourceImg = null;
  if (fs.existsSync(userPhotoPath)) {
    console.log('📸 Foto original do Combo encontrada, extraindo texturas reais...');
    sourceImg = decodePng(fs.readFileSync(userPhotoPath));
  }

  // 1. Carrega o modelo de Burger 3D de alta qualidade
  const burgerDoc = await io.read(burgerGlbPath);
  const comboDoc = new Document();

  // Incorpora o burger ao novo documento
  mergeDocuments(comboDoc, burgerDoc);
  const mainBuffer = comboDoc.getRoot().listBuffers()[0];

  // 2. Cria texturas ricas
  console.log('🪵 Gerando textura rústica da tábua de madeira gravada...');
  const boardPng = generateBoardTexture(sourceImg);
  const boardTex = comboDoc.createTexture('BoardTexture')
    .setImage(boardPng)
    .setMimeType('image/png');

  console.log('🍾 Gerando rótulo autêntico do Guaraná Antarctica...');
  const guaranaPng = generateGuaranaLabel(sourceImg);
  const guaranaTex = comboDoc.createTexture('GuaranaTexture')
    .setImage(guaranaPng)
    .setMimeType('image/png');

  // 3. Materiais PBR de alto luxo
  const boardMat = comboDoc.createMaterial('TabuaMaterial')
    .setBaseColorTexture(boardTex)
    .setRoughnessFactor(0.65)
    .setMetallicFactor(0.0)
    .setDoubleSided(false);

  const glassMat = comboDoc.createMaterial('GuaranaGlassMaterial')
    .setBaseColorFactor([0.08, 0.42, 0.18, 1.0]) // Verde esmeralda brilhante
    .setRoughnessFactor(0.18)
    .setMetallicFactor(0.08)
    .setDoubleSided(false);

  const labelMat = comboDoc.createMaterial('GuaranaLabelMaterial')
    .setBaseColorTexture(guaranaTex)
    .setRoughnessFactor(0.40)
    .setMetallicFactor(0.0)
    .setDoubleSided(false);

  const capMat = comboDoc.createMaterial('GuaranaCapMaterial')
    .setBaseColorFactor([0.90, 0.90, 0.92, 1.0]) // Tampa metálica prateada
    .setRoughnessFactor(0.30)
    .setMetallicFactor(0.60);

  const fryMat = comboDoc.createMaterial('FrenchFriesMaterial')
    .setBaseColorFactor([0.92, 0.68, 0.22, 1.0]) // Batata frita dourada
    .setRoughnessFactor(0.62)
    .setMetallicFactor(0.0);

  // 4. Cria as malhas
  console.log('📐 Construindo malha 3D da Tábua Gourmet (28cm x 18cm x 2cm)...');
  const boardMesh = buildBoardMesh(comboDoc, mainBuffer, boardMat);
  const boardNode = comboDoc.createNode('TabuaGourmetNode').setMesh(boardMesh);

  console.log('🍾 Construindo garrafa 3D de Guaraná Antarctica com torno cilíndrico...');
  const bottleMesh = buildGuaranaBottle(comboDoc, mainBuffer, glassMat, labelMat, capMat);
  const bottleNode = comboDoc.createNode('GarrafaGuaranaNode').setMesh(bottleMesh);

  console.log('🍟 Construindo porção de batatas fritas crocantes com 20 palitos tridimensionais...');
  const friesMesh = buildFrenchFriesHeap(comboDoc, mainBuffer, fryMat);
  const friesNode = comboDoc.createNode('BatataFritaNode').setMesh(friesMesh);

  // 5. Configura a cena e posiciona o Burger
  const scene = comboDoc.getRoot().listScenes()[0];

  // Adiciona a tábua, garrafa e batatas à cena
  scene.addChild(boardNode);
  scene.addChild(bottleNode);
  scene.addChild(friesNode);

  // O Burger (RealScale_Table_Root) é posicionado no lado direito da tábua
  // Tábua: X vai de -0.14 a +0.14. Topo em Y = 0.02.
  // Posicionamos o hambúrguer em X = +0.065, Y = 0.02 + offset, Z = +0.005
  const burgerRoot = comboDoc.getRoot().listNodes().find(n => n.getName() === 'RealScale_Table_Root');
  if (burgerRoot) {
    console.log('🍔 Calibrando posição milimétrica do Hambúrguer Gourmet sobre a tábua...');
    // burger-smash tem offset interno de Y=0.04962
    burgerRoot.setTranslation([0.065, 0.02 + 0.04962, 0.005]);
    burgerRoot.setScale([0.118, 0.118, 0.118]); // 11.8 cm de diâmetro perfeito
  }

  // 6. Exporta o modelo GLB final
  const outPath = path.join(__dirname, '..', 'assets', 'models', 'combo-badeco.glb');
  const glbBytes = await io.writeBinary(comboDoc);
  fs.writeFileSync(outPath, glbBytes);

  console.log(`✅ Modelo 3D do Combo gerado com sucesso em: ${outPath} (${(glbBytes.length / (1024 * 1024)).toFixed(2)} MB)`);

  // 7. Validação Khronos glTF
  console.log('🔍 Executando validação oficial Khronos glTF...');
  const report = await validator.validateBytes(glbBytes);
  console.log(`Khronos Validation: ${report.issues.numErrors} Erros, ${report.issues.numWarnings} Avisos.`);

  return outPath;
}

buildFullComboModel().catch(err => {
  console.error('❌ Falha na geração do modelo do Combo:', err);
  process.exit(1);
});
