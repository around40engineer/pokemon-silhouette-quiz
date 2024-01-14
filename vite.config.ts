import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        "theme_color": "#000000",
        "background_color": "#ffffff",
        "display": "standalone",
        "scope": "/pokemon-silhouette-quiz",
        "start_url": "/pokemon-silhouette-quiz",
        "name": "pokemon silhouette quiz",
        "short_name": "pokeQuiz",
        "description": "\u30dd\u30b1\u30e2\u30f3\u306e\u30b7\u30eb\u30a8\u30c3\u30c8\u30af\u30a4\u30ba\u30a2\u30d7\u30ea",
        "icons": [
          {
            "src": "/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            purpose:'any maskable'
          }
        ]
      }
    })
  ],
  base: '/pokemon-silhouette-quiz'
})
