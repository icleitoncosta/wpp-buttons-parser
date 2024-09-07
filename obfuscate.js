const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

const inputFilePath = './src/index.js';
const outputFilePath = './dist/obfuscated-bundle.js';

// Ler o código original
const code = fs.readFileSync(inputFilePath, 'utf8');

// Obfuscar o código
const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  simplify: true,
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 4,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false
});

// Salvar o código obfuscado
fs.writeFileSync(outputFilePath, obfuscationResult.getObfuscatedCode());