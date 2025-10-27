import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createViteConfig } from '../shared-config.js'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 使用共享配置
  const baseConfig = createViteConfig('vote-widget', {
    port: 3000,
    outDir: '../../assets',
    
    // 额外的代码分割（如果需要）
    extraChunks: {
      // 'utils': ['axios', 'lodash']
    },
    
    // 路径别名
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@assets': resolve(__dirname, './src/assets')
    }
  })
  
  return {
    plugins: [vue()],
    ...baseConfig,
    
    // 可以在这里覆盖或扩展配置
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __DEV__: mode === 'development'
    }
  }
})
