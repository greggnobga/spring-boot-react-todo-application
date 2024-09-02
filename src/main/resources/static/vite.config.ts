/** Vendor. */
import { defineConfig } from 'vite';
import { tscWatch } from 'vite-plugin-tsc-watch';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

/** Config. */
export default defineConfig({
    base: '',
    build: {
        minify: true,
        outDir: 'public',
        emptyOutDir: false,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            input: {
                main: '/src/main.tsx',
            },

            output: {
                chunkFileNames: 'js/[name].js',
                entryFileNames: 'js/[name].js',

                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                        return 'images/[name][extname]';
                    }

                    if (/\.css$/.test(name ?? '')) {
                        return 'css/[name][extname]';
                    }
                    /** Return something. */
                    return 'assets/[name][extname]';
                },
            },
            external: [],
        },
    },
    publicDir: 'assets',
    plugins: [react(), tscWatch()],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    resolve: {
        alias: {
            $lib: '/src',
            $css: '/src/css',
            $js: '/src/js',
            $components: '/src/js/components',
            $hooks: '/src/js/hooks',
            $store: '/src/js/store',
        },
    },
});
