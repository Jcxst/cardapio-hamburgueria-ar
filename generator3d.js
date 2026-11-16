const fs = require('fs');
const path = require('path');

/**
 * Converte uma imagem 2D em um modelo 3D GLB calibrado para Realidade Aumentada.
 * Utiliza o mesh de alta fidelidade calibrado em escala 1:1 e injeta a nova imagem
 * na camada de textura física (PBR baseColor).
 * 
 * @param {Buffer} imageBuffer - Buffer da imagem (JPEG / PNG / WebP)
 * @param {string} mimeType - 'image/jpeg' ou 'image/png'
 * @param {string} outFilename - Nome do arquivo GLB de saída
 * @param {string} baseModelType - 'smash' | 'monster' | 'classic'
 * @returns {string} Caminho relativo do modelo GLB gerado
 */
function generate3DFromPhoto(imageBuffer, mimeType, outFilename, baseModelType = 'smash') {
  const baseModels = {
    smash: path.join(__dirname, 'assets', 'models', 'burger-smash.glb'),
    monster: path.join(__dirname, 'assets', 'models', 'burger-monster.glb'),
    classic: path.join(__dirname, 'assets', 'models', 'burger-classic.glb')
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

  // Injeta no slot da primeira imagem de textura (baseColor)
  const imgIdx = 0;
  if (!gltf.images || !gltf.images[imgIdx]) {
    throw new Error('Slot de imagem não encontrado no modelo 3D base');
  }

  const bvIdx = gltf.images[imgIdx].bufferView;
  gltf.images[imgIdx].mimeType = mimeType.includes('png') ? 'image/png' : 'image/jpeg';

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
