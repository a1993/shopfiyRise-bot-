/**
 * 所有 Vue 应用的共享配置
 * 用于统一构建设置、API 配置等
 */

export const SHOPIFY_CONFIG = {
  // Shopify Storefront API
  storefrontApi: {
    version: '2024-01',
    endpoint: '/api/2024-01/graphql.json',
    // 注意：不要在前端代码中硬编码 token
    // 应该从环境变量或服务器注入
  },
  
  // App Proxy 配置
  appProxy: {
    prefix: '/apps',
    endpoints: {
      vote: '/campaign-api/vote',
      products: '/campaign-api/products',
      results: '/campaign-api/results'
    }
  },
  
  // 主题集成
  theme: {
    // 是否使用主题的 header/footer
    useThemeLayout: true,
    
    // CSS 变量（从主题继承）
    cssVariables: {
      primary: 'var(--color-button)',
      secondary: 'var(--color-button-secondary)',
      text: 'var(--color-foreground)',
      background: 'var(--color-background)'
    }
  }
}

/**
 * Vite 构建配置工厂函数
 * @param {string} appName - 应用名称
 * @param {object} options - 额外配置
 */
export function createViteConfig(appName, options = {}) {
  return {
    build: {
      outDir: options.outDir || '../../assets',
      emptyOutDir: false,
      
      rollupOptions: {
        output: {
          entryFileNames: `${appName}.js`,
          chunkFileNames: `${appName}-[name].js`,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return `${appName}.css`
            }
            if (assetInfo.name.match(/\.(png|jpe?g|gif|svg|webp)$/)) {
              return `${appName}-[name].[ext]`
            }
            return `${appName}-[name].[ext]`
          },
          
          // 代码分割策略
          manualChunks: options.manualChunks || {
            vendor: ['vue'],
            ...(options.extraChunks || {})
          }
        }
      },
      
      // 生产环境优化
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: process.env.NODE_ENV === 'production'
        }
      },
      
      // Source maps（开发环境启用）
      sourcemap: process.env.NODE_ENV === 'development',
      
      // 资源内联限制
      assetsInlineLimit: 4096, // 4kb
      
      // 兼容性
      target: 'es2015'
    },
    
    // 开发服务器
    server: {
      port: options.port || 3000,
      proxy: {
        '/apps': {
          target: process.env.VITE_PROXY_TARGET || 'http://localhost:8000',
          changeOrigin: true,
          secure: false
        },
        '/api': {
          target: 'https://your-store.myshopify.com',
          changeOrigin: true,
          secure: true
        }
      }
    },
    
    // 环境变量前缀
    envPrefix: 'VITE_',
    
    // 别名
    resolve: {
      alias: options.alias || {}
    }
  }
}

/**
 * 从 DOM 获取 Shopify 配置
 */
export function getShopifyConfig(sectionId) {
  if (typeof window === 'undefined') return null
  
  return window.SHOPIFY_HEADLESS_CONFIG?.[sectionId] || {
    shopUrl: window.Shopify?.shop || '',
    locale: document.documentElement.lang || 'en',
    currency: window.Shopify?.currency?.active || 'USD'
  }
}

/**
 * API 请求辅助函数
 */
export class ShopifyAPI {
  constructor(config) {
    this.config = config
    this.baseUrl = config.apiEndpoint || '/apps/campaign-api'
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      }
    }
    
    try {
      const response = await fetch(url, { ...defaultOptions, ...options })
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
  
  // Storefront API GraphQL 查询
  async graphql(query, variables = {}) {
    const endpoint = '/api/2024-01/graphql.json'
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.config.storefrontToken
      },
      body: JSON.stringify({ query, variables })
    })
    
    const data = await response.json()
    
    if (data.errors) {
      throw new Error(data.errors[0].message)
    }
    
    return data.data
  }
}

/**
 * 本地存储辅助函数
 */
export class LocalStorage {
  static get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : defaultValue
    } catch {
      return defaultValue
    }
  }
  
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  }
  
  static remove(key) {
    localStorage.removeItem(key)
  }
  
  static clear() {
    localStorage.clear()
  }
}

/**
 * 事件总线（用于跨组件通信）
 */
export class EventBus {
  constructor() {
    this.events = {}
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }
  
  off(event, callback) {
    if (!this.events[event]) return
    
    this.events[event] = this.events[event].filter(cb => cb !== callback)
  }
  
  emit(event, data) {
    if (!this.events[event]) return
    
    this.events[event].forEach(callback => callback(data))
  }
}


