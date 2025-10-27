/**
 * Vote Widget 配置
 * 从 DOM 或环境变量获取配置
 */

import { getShopifyConfig } from '../../shared-config.js'

/**
 * 获取应用配置
 * @param {string} sectionId - Shopify section ID
 */
export function getAppConfig(sectionId) {
  // 从 DOM 获取 Shopify 注入的配置
  const shopifyConfig = getShopifyConfig(sectionId)
  
  // 合并默认配置
  return {
    // Shopify 配置
    shopUrl: shopifyConfig?.shopUrl || '',
    apiEndpoint: shopifyConfig?.apiEndpoint || '/apps/campaign-api',
    locale: shopifyConfig?.locale || 'en',
    currency: shopifyConfig?.currency || 'USD',
    customer: shopifyConfig?.customer || null,
    
    // 应用特定配置
    votingEnabled: true,
    maxVotesPerUser: 1,
    showResults: true,
    
    // 从环境变量获取（开发环境）
    isDev: import.meta.env.DEV,
    apiUrl: import.meta.env.VITE_API_URL || shopifyConfig?.apiEndpoint,
    
    // Feature flags
    features: {
      realTimeUpdates: true,
      socialSharing: true,
      analytics: true
    }
  }
}

/**
 * API 端点
 */
export const API_ENDPOINTS = {
  vote: '/vote',
  results: '/results',
  products: '/products',
  userVotes: '/user-votes'
}

/**
 * 事件名称
 */
export const EVENTS = {
  VOTE_SUBMITTED: 'vote:submitted',
  VOTE_SUCCESS: 'vote:success',
  VOTE_ERROR: 'vote:error',
  RESULTS_UPDATED: 'results:updated'
}

/**
 * 本地存储 keys
 */
export const STORAGE_KEYS = {
  USER_VOTES: 'campaign_user_votes',
  LAST_VOTE_TIME: 'campaign_last_vote',
  PREFERENCES: 'campaign_preferences'
}


