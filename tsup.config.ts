import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/server.ts'],
    outDir: 'dist',
    format: ['cjs'],
    target: 'node18',
    clean: true,
    sourcemap: true,
    external: [
      'express',
      'swagger-ui-express',
      'swagger-jsdoc',
      '@apidevtools/swagger-parser',
      '@jsdevtools/ono',
    ],
    esbuildOptions(options) {
      options.alias = {
        '@helpers': './src/helpers',
        '@middleware': './src/middlewares',
        '@config': './src/config',
        '@utils': './src/utils',
      };
    }
  });
  