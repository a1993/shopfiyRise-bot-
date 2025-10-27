import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

/**
 * Vue 应用初始化
 * 支持 Shopify Theme 集成
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 查找所有 Vue 应用容器
  const containers = document.querySelectorAll('[id^="headless-app-"]')
  
  if (containers.length === 0) {
    // 如果没有找到 Shopify 容器，使用默认容器（开发环境）
    const defaultContainer = document.querySelector('#app')
    if (defaultContainer) {
      mountApp(defaultContainer)
    } else {
      console.warn('No Vue app container found')
    }
  } else {
    // 为每个容器创建独立的 Vue 应用实例
    containers.forEach(container => {
      mountApp(container)
    })
  }
})

/**
 * 挂载 Vue 应用
 * @param {HTMLElement} container - 容器元素
 */
function mountApp(container) {
  try {
    // 从容器获取配置数据
    const config = {
      appName: container.dataset.appName || 'vote-widget',
      apiEndpoint: container.dataset.apiEndpoint || '/apps/campaign-api',
      shopUrl: container.dataset.shopUrl || '',
      shopDomain: container.dataset.shopDomain || '',
      locale: container.dataset.locale || 'en',
      currency: container.dataset.currency || 'USD',
      customerId: container.dataset.customerId || null,
      customerEmail: container.dataset.customerEmail || null,
      customData: parseJSON(container.dataset.custom)
    }
    
    // 创建 Vue 应用实例
    const app = createApp(App, {
      config,
      sectionId: container.id
    })
    
    // 全局错误处理
    app.config.errorHandler = (err, instance, info) => {
      console.error('Vue Error:', err)
      console.error('Component:', instance)
      console.error('Info:', info)
      
      // 显示用户友好的错误信息
      showError(container, err.message)
    }
    
    // 性能监控（开发环境）
    if (import.meta.env.DEV) {
      app.config.performance = true
    }
    
    // 挂载应用
    app.mount(container)
    
    console.log(`✅ Vue app mounted to ${container.id}`)
    
    // 发送挂载完成事件
    window.dispatchEvent(new CustomEvent('vue:mounted', {
      detail: { containerId: container.id, config }
    }))
    
  } catch (err) {
    console.error('Failed to mount Vue app:', err)
    showError(container, 'Failed to load the application. Please refresh the page.')
  }
}

/**
 * 安全解析 JSON
 */
function parseJSON(str) {
  if (!str) return null
  try {
    return JSON.parse(str)
  } catch {
    return null
  }
}

/**
 * 显示错误信息
 */
function showError(container, message) {
  const errorHTML = `
    <div class="vue-app-error">
      <h3>⚠️ Error</h3>
      <p>${message}</p>
      <button onclick="location.reload()">Refresh Page</button>
    </div>
  `
  
  container.innerHTML = errorHTML
  
  // 显示错误边界（如果存在）
  const errorBoundary = document.getElementById(
    container.id.replace('headless-app-', 'headless-error-')
  )
  if (errorBoundary) {
    errorBoundary.style.display = 'block'
  }
}

// 导出用于外部调用（可选）
if (import.meta.env.DEV) {
  window.__VUE_APP__ = {
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    mountApp
  }
}
