const path = require('node:path');
const fs = require('node:fs');
require('dotenv').config({ path: '.env.local' });
const { v2: cloudinary } = require('cloudinary');

// Verificar la existencia del archivo .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
console.log('\nVerificando configuración:');
console.log('- Directorio actual:', process.cwd());
console.log('- Archivo .env.local:', fs.existsSync(envPath) ? '✓ Existe' : '✗ No existe');

// Verificar variables de entorno
const requiredVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('\n✗ Faltan las siguientes variables de entorno:', missingVars);
  console.log('\nPor favor, asegúrate de que tu archivo .env.local contenga:');
  console.log(`
CLOUDINARY_CLOUD_NAME=de4dpzh9c
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
  `);
  process.exit(1);
}

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkCloudinaryConfig() {
  try {
    console.log('\nVariables de entorno encontradas:');
    console.log('- CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('- CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✓ Presente' : '✗ Faltante');
    console.log('- CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✓ Presente' : '✗ Faltante');
    
    console.log('\nVerificando conexión a Cloudinary...');
    const result = await cloudinary.api.ping();
    console.log('✓ Conexión exitosa a Cloudinary:', result);
    
    console.log('\nVerificando acceso a recursos...');
    const resources = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'GrowthNetworking',
      max_results: 1
    });
    
    console.log('✓ Acceso a recursos exitoso:', {
      carpeta: 'GrowthNetworking',
      recursosEncontrados: resources.resources?.length || 0
    });
  } catch (error) {
    console.error('\n✗ Error al verificar Cloudinary:', error);
    process.exit(1);
  }
}

checkCloudinaryConfig();
