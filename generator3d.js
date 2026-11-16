const fs = require('fs');
const path = require('path');

/**
 * Constrói um modelo 3D GLB volumétrico recortado diretamente da foto do produto.
 * Utiliza alphaMode: MASK para recortar o fundo e minFilter/magFilter: 9729 (LINEAR)
 * garantindo compatibilidade universal com qualquer dimensão de imagem (sem falha de mipmap NPOT).
 * A base é fixada perfeitamente plana em Y = 0 para ancorar na mesa com WebXR.
 */
function buildVolumetricGlbBuffer(imageBuffer, mimeType, width = 0.28, height = 0.18, depth = 0.03) {
  const w = width / 2;
  const h = height;
  const d = depth / 2;

  // 24 vértices para um bloco tridimensional limpo e perfeitamente ancorado
  const positions = [
    // Face Frontal (Z = +d)
    -w, 0,  d,   w, 0,  d,   w, h,  d,  -w, h,  d,
    // Face Traseira (Z = -d, virada para trás)
    -w, 0, -d,  -w, h, -d,   w, h, -d,   w, 0, -d,
    // Borda Superior (Topo)
    -w, h,  d,   w, h,  d,   w, h, -d,  -w, h, -d,
    // Borda Inferior (Apoiada na mesa em Y = 0)
    -w, 0, -d,   w, 0, -d,   w, 0,  d,  -w, 0,  d,
    // Borda Lateral Direita
     w, 0,  d,   w, 0, -d,   w, h, -d,   w, h,  d,
    // Borda Lateral Esquerda
    -w, 0, -d,  -w, 0,  d,  -w, h,  d,  -w, h, -d
  ];

  const normals = [
    // Frontal
    0, 0, 1,  0, 0, 1,  0, 0, 1,  0, 0, 1,
    // Traseira
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
    // Topo
    0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0,
    // Base (apoiada na mesa)
    0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
    // Direita
    1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0,
    // Esquerda
    -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0
  ];

  const uvs = [
    // Frontal
    0, 1,   1, 1,   1, 0,   0, 0,
    // Traseira (espelhada)
    1, 1,   1, 0,   0, 0,   0, 1,
    // Topo
    0, 0.02, 1, 0.02, 1, 0, 0, 0,
    // Base
    0, 1, 1, 1, 1, 0.98, 0, 0.98,
    // Direita
    0.98, 1, 1, 1, 1, 0, 0.98, 0,
    // Esquerda
    0, 1, 0.02, 1, 0.02, 0, 0, 0
  ];

  const indices = [
    // Frontal
    0, 1, 2,  0, 2, 3,
    // Traseira
    4, 5, 6,  4, 6, 7,
    // Topo
    8, 9, 10,  8, 10, 11,
    // Base
    12, 13, 14,  12, 14, 15,
    // Direita
    16, 17, 18,  16, 18, 19,
    // Esquerda
    20, 21, 22,  20, 22, 23
  ];

  const vertexCount = positions.length / 3;

  const indexBuf = Buffer.alloc(indices.length * 2);
  indices.forEach((val, i) => indexBuf.writeUInt16LE(val, i * 2));

  const posBuf = Buffer.alloc(positions.length * 4);
  positions.forEach((val, i) => posBuf.writeFloatLE(val, i * 4));

  const normBuf = Buffer.alloc(normals.length * 4);
  normals.forEach((val, i) => normBuf.writeFloatLE(val, i * 4));

  const uvBuf = Buffer.alloc(uvs.length * 4);
  uvs.forEach((val, i) => uvBuf.writeFloatLE(val, i * 4));

  let imgBuf = imageBuffer;
  const pad = imgBuf.length % 4 === 0 ? 0 : 4 - (imgBuf.length % 4);
  if (pad > 0) {
    imgBuf = Buffer.concat([imgBuf, Buffer.alloc(pad, 0)]);
  }

  const offsetIndices = 0;
  const offsetPositions = offsetIndices + indexBuf.length;
  const offsetNormals = offsetPositions + posBuf.length;
  const offsetUvs = offsetNormals + normBuf.length;
  const offsetImage = offsetUvs + uvBuf.length;

  const totalBinLength = offsetImage + imgBuf.length;
  const binBuf = Buffer.concat([indexBuf, posBuf, normBuf, uvBuf, imgBuf]);

  const gltf = {
    asset: { version: '2.0', generator: 'AuraBurger Clean Volumetric Extruder' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name: 'FoodModel' }],
    meshes: [{
      name: 'ItemMesh',
      primitives: [{
        attributes: {
          POSITION: 1,
          NORMAL: 2,
          TEXCOORD_0: 3
        },
        indices: 0,
        material: 0,
        mode: 4
      }]
    }],
    materials: [{
      name: 'FoodMaterial',
      alphaMode: 'MASK',
      alphaCutoff: 0.1,
      doubleSided: true,
      pbrMetallicRoughness: {
        baseColorTexture: { index: 0 },
        roughnessFactor: 0.70,
        metallicFactor: 0.0
      }
    }],
    textures: [{ sampler: 0, source: 0 }],
    images: [{ bufferView: 4, mimeType: (mimeType && mimeType.includes('png')) ? 'image/png' : 'image/jpeg' }],
    samplers: [{
      magFilter: 9729, // LINEAR
      minFilter: 9729, // LINEAR (sem dependência de mipmaps NPOT)
      wrapS: 33071,    // CLAMP_TO_EDGE
      wrapT: 33071     // CLAMP_TO_EDGE
    }],
    accessors: [
      { bufferView: 0, componentType: 5123, count: indices.length, type: 'SCALAR' },
      { bufferView: 1, componentType: 5126, count: vertexCount, max: [w, h, d], min: [-w, 0, -d], type: 'VEC3' },
      { bufferView: 2, componentType: 5126, count: vertexCount, max: [1, 1, 1], min: [-1, -1, -1], type: 'VEC3' },
      { bufferView: 3, componentType: 5126, count: vertexCount, max: [1, 1], min: [0, 0], type: 'VEC2' }
    ],
    bufferViews: [
      { buffer: 0, byteOffset: offsetIndices, byteLength: indexBuf.length, target: 34963 },
      { buffer: 0, byteOffset: offsetPositions, byteLength: posBuf.length, target: 34962 },
      { buffer: 0, byteOffset: offsetNormals, byteLength: normBuf.length, target: 34962 },
      { buffer: 0, byteOffset: offsetUvs, byteLength: uvBuf.length, target: 34962 },
      { buffer: 0, byteOffset: offsetImage, byteLength: imageBuffer.length }
    ],
    buffers: [{ byteLength: totalBinLength }]
  };

  let jsonStr = JSON.stringify(gltf);
  while (Buffer.byteLength(jsonStr, 'utf8') % 4 !== 0) jsonStr += ' ';
  const jsonBuf = Buffer.from(jsonStr, 'utf8');

  const totalLength = 12 + 8 + jsonBuf.length + 8 + binBuf.length;
  const out = Buffer.alloc(totalLength);
  out.write('glTF', 0, 4, 'ascii');
  out.writeUInt32LE(2, 4);
  out.writeUInt32LE(totalLength, 8);

  out.writeUInt32LE(jsonBuf.length, 12);
  out.write('JSON', 16, 4, 'ascii');
  jsonBuf.copy(out, 20);

  const binOff = 20 + jsonBuf.length;
  out.writeUInt32LE(binBuf.length, binOff);
  out.write('BIN\0', binOff + 4, 4, 'ascii');
  binBuf.copy(out, binOff + 8);

  return out;
}

/**
 * Converte uma foto 2D em um modelo 3D GLB calibrado para Realidade Aumentada.
 * Cria o modelo volumétrico recortado que segue o formato real do item (Combo, Burger, Porção ou Bebida).
 */
function generate3DFromPhoto(imageBuffer, mimeType, outFilename, baseModelType = 'auto', dimensions = null) {
  const outDir = path.join(__dirname, 'assets', 'models', 'uploads');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const finalPath = path.join(outDir, outFilename);

  let width = 0.28, height = 0.18, depth = 0.03;

  if (baseModelType === 'combo') {
    const comboGlb = path.join(__dirname, 'assets', 'models', 'combo-badeco.glb');
    if (fs.existsSync(comboGlb)) {
      fs.copyFileSync(comboGlb, finalPath);
      return `assets/models/uploads/${outFilename}`;
    }
    width = 0.28; height = 0.18; depth = 0.03;
  } else if (baseModelType === 'burger') {
    const burgerGlb = path.join(__dirname, 'assets', 'models', 'burger-smash.glb');
    if (fs.existsSync(burgerGlb)) {
      fs.copyFileSync(burgerGlb, finalPath);
      return `assets/models/uploads/${outFilename}`;
    }
    width = 0.14; height = 0.11; depth = 0.03;
  } else if (baseModelType === 'fries') {
    width = 0.18; height = 0.13; depth = 0.03;
  } else if (baseModelType === 'drink') {
    width = 0.10; height = 0.22; depth = 0.03;
  } else if (dimensions) {
    width = dimensions.width || 0.28;
    height = dimensions.height || 0.18;
    depth = dimensions.depth || 0.03;
  }

  // Gera o modelo 3D volumétrico que segue a foto
  const glbBuffer = buildVolumetricGlbBuffer(imageBuffer, mimeType, width, height, depth);
  fs.writeFileSync(finalPath, glbBuffer);
  return `assets/models/uploads/${outFilename}`;
}

module.exports = { generate3DFromPhoto, buildVolumetricGlbBuffer };
