const fs = require('fs');
const path = require('path');

/**
 * Converte uma foto 2D em um modelo 3D GLB calibrado para Realidade Aumentada.
 * Projeta a foto diretamente na geometria 3D via mapeamento UV frontal/cilíndrico,
 * remove o mapa de relevo do hambúrguer genérico antigo e injeta a foto como
 * textura base PBR de alta fidelidade.
 * 
 * @param {Buffer} imageBuffer - Buffer da imagem enviada pelo funcionário
 * @param {string} mimeType - 'image/jpeg' ou 'image/png'
 * @param {string} outFilename - Nome do arquivo GLB de saída
 * @param {string} baseModelType - 'smash' | 'monster' | 'classic'
 * @returns {string} Caminho relativo do modelo GLB gerado
 */
function generate3DFromPhoto(imageBuffer, mimeType, outFilename, baseModelType = 'smash') {
  const baseModels = {
    smash: path.join(__dirname, 'assets', 'models', 'burger-smash.glb'),
    monster: path.join(__dirname, 'assets', 'models', 'burger-smash.glb'),
    classic: path.join(__dirname, 'assets', 'models', 'burger-smash.glb')
  };

  const baseGlbPath = baseModels[baseModelType] || baseModels.smash;
  if (!fs.existsSync(baseGlbPath)) {
    throw new Error('Modelo base GLB não encontrado em ' + baseGlbPath);
  }

  const buf = fs.readFileSync(baseGlbPath);
  const jsonLen = buf.readUInt32LE(12);
  const jsonStr = buf.toString('utf8', 20, 20 + jsonLen);
  const gltf = JSON.parse(jsonStr);
  const binBuf = buf.slice(20 + jsonLen + 8);

  // 1. Recalcula os UVs (TEXCOORD_0) para projetar com fidelidade a foto enviada pelo usuário
  try {
    const posAccIdx = gltf.meshes[0].primitives[0].attributes.POSITION;
    const uvAccIdx = gltf.meshes[0].primitives[0].attributes.TEXCOORD_0;
    const posAcc = gltf.accessors[posAccIdx];
    const uvAcc = gltf.accessors[uvAccIdx];
    const posBv = gltf.bufferViews[posAcc.bufferView];
    const uvBv = gltf.bufferViews[uvAcc.bufferView];
    const posOff = (posBv.byteOffset || 0) + (posAcc.byteOffset || 0);
    const uvOff = (uvBv.byteOffset || 0) + (uvAcc.byteOffset || 0);

    const minX = posAcc.min[0], maxX = posAcc.max[0];
    const minZ = posAcc.min[2], maxZ = posAcc.max[2];
    const count = posAcc.count;

    for (let i = 0; i < count; i++) {
      const x = binBuf.readFloatLE(posOff + i * 12);
      const y = binBuf.readFloatLE(posOff + i * 12 + 4);
      const z = binBuf.readFloatLE(posOff + i * 12 + 8);

      const normX = (x - minX) / (maxX - minX);
      const normZ = (maxZ - z) / (maxZ - minZ);

      let u, v;
      if (y >= 0) {
        u = 0.04 + 0.92 * normX;
      } else {
        u = 0.04 + 0.92 * (1.0 - normX);
      }
      v = 0.04 + 0.92 * normZ;

      u = Math.max(0.001, Math.min(0.999, u));
      v = Math.max(0.001, Math.min(0.999, v));

      binBuf.writeFloatLE(u, uvOff + i * 8);
      binBuf.writeFloatLE(v, uvOff + i * 8 + 4);
    }
  } catch (uvErr) {
    console.warn('Aviso ao recalcular UVs do modelo:', uvErr.message);
  }

  // 2. Remove o mapa normal antigo que continha gergelins e vincos do hambúrguer genérico
  if (gltf.materials && gltf.materials[0]) {
    delete gltf.materials[0].normalTexture;
    if (gltf.materials[0].pbrMetallicRoughness) {
      gltf.materials[0].pbrMetallicRoughness.roughnessFactor = 0.65;
      gltf.materials[0].pbrMetallicRoughness.metallicFactor = 0.0;
    }
  }

  // 3. Injeta a foto enviada pelo usuário no slot da textura baseColor
  const imgIdx = 0;
  if (!gltf.images || !gltf.images[imgIdx]) {
    throw new Error('Slot de imagem não encontrado no modelo 3D base');
  }

  const bvIdx = gltf.images[imgIdx].bufferView;
  gltf.images[imgIdx].mimeType = (mimeType && mimeType.includes('png')) ? 'image/png' : 'image/jpeg';

  const bv = gltf.bufferViews[bvIdx];
  const oldOffset = bv.byteOffset || 0;
  const oldLen = bv.byteLength;

  // Alinhamento obrigatório de 4 bytes do glTF
  let newImgBuf = imageBuffer;
  const pad = newImgBuf.length % 4 === 0 ? 0 : 4 - (newImgBuf.length % 4);
  if (pad > 0) {
    newImgBuf = Buffer.concat([newImgBuf, Buffer.alloc(pad, 0)]);
  }

  const diff = newImgBuf.length - oldLen;

  // Reconstroi o chunk binário substituindo a textura pela foto enviada
  const before = binBuf.slice(0, oldOffset);
  const after = binBuf.slice(oldOffset + oldLen);
  const newBinBuf = Buffer.concat([before, newImgBuf, after]);

  bv.byteLength = imageBuffer.length;

  // Atualiza offsets dos bufferViews subsequentes
  for (let i = 0; i < gltf.bufferViews.length; i++) {
    if (i !== bvIdx && (gltf.bufferViews[i].byteOffset || 0) > oldOffset) {
      gltf.bufferViews[i].byteOffset += diff;
    }
  }

  // Atualiza tamanho total do buffer 0
  gltf.buffers[0].byteLength = newBinBuf.length;

  // Codifica o novo GLB
  let newJsonStr = JSON.stringify(gltf);
  while (Buffer.byteLength(newJsonStr, 'utf8') % 4 !== 0) {
    newJsonStr += ' ';
  }
  const newJsonBuf = Buffer.from(newJsonStr, 'utf8');

  const totalLength = 12 + 8 + newJsonBuf.length + 8 + newBinBuf.length;
  const out = Buffer.alloc(totalLength);
  
  // Header
  out.write('glTF', 0, 4, 'ascii');
  out.writeUInt32LE(2, 4);
  out.writeUInt32LE(totalLength, 8);

  // Chunk 0: JSON
  out.writeUInt32LE(newJsonBuf.length, 12);
  out.write('JSON', 16, 4, 'ascii');
  newJsonBuf.copy(out, 20);

  // Chunk 1: BIN
  const binOff = 20 + newJsonBuf.length;
  out.writeUInt32LE(newBinBuf.length, binOff);
  out.write('BIN\0', binOff + 4, 4, 'ascii');
  newBinBuf.copy(out, binOff + 8);

  const outDir = path.join(__dirname, 'assets', 'models', 'uploads');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const finalPath = path.join(outDir, outFilename);
  fs.writeFileSync(finalPath, out);

  return `assets/models/uploads/${outFilename}`;
}

module.exports = { generate3DFromPhoto };
