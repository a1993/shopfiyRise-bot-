/**
 * 投票功能 Composable
 * Vue 3 Composition API
 */

import { ref, computed } from 'vue'
import { ShopifyAPI, LocalStorage } from '../../../shared-config.js'
import { getAppConfig, API_ENDPOINTS, EVENTS, STORAGE_KEYS } from '../config.js'

export function useVote(sectionId) {
  const config = getAppConfig(sectionId)
  const api = new ShopifyAPI(config)
  
  // 状态
  const loading = ref(false)
  const error = ref(null)
  const userVotes = ref(LocalStorage.get(STORAGE_KEYS.USER_VOTES, []))
  const results = ref([])
  
  // 计算属性
  const hasVoted = computed(() => {
    return userVotes.value.length > 0
  })
  
  const canVote = computed(() => {
    if (!config.votingEnabled) return false
    if (config.maxVotesPerUser === -1) return true // 无限制
    return userVotes.value.length < config.maxVotesPerUser
  })
  
  /**
   * 提交投票
   */
  async function submitVote(productId) {
    if (!canVote.value) {
      error.value = 'You have reached the maximum number of votes'
      return false
    }
    
    loading.value = true
    error.value = null
    
    try {
      const response = await api.request(API_ENDPOINTS.vote, {
        method: 'POST',
        body: JSON.stringify({
          productId,
          customerId: config.customer?.id,
          timestamp: Date.now()
        })
      })
      
      if (response.success) {
        // 保存到本地存储
        userVotes.value.push({
          productId,
          timestamp: Date.now()
        })
        LocalStorage.set(STORAGE_KEYS.USER_VOTES, userVotes.value)
        
        // 触发事件
        emitEvent(EVENTS.VOTE_SUCCESS, { productId })
        
        // 刷新结果
        await fetchResults()
        
        return true
      } else {
        throw new Error(response.message || 'Vote failed')
      }
    } catch (err) {
      error.value = err.message
      emitEvent(EVENTS.VOTE_ERROR, { error: err.message })
      return false
    } finally {
      loading.value = false
    }
  }
  
  /**
   * 获取投票结果
   */
  async function fetchResults() {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.request(API_ENDPOINTS.results)
      
      if (response.success) {
        results.value = response.results
        emitEvent(EVENTS.RESULTS_UPDATED, { results: response.results })
      }
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch results:', err)
    } finally {
      loading.value = false
    }
  }
  
  /**
   * 检查用户是否已为某个产品投票
   */
  function hasVotedFor(productId) {
    return userVotes.value.some(vote => vote.productId === productId)
  }
  
  /**
   * 清除用户投票（仅用于测试）
   */
  function clearVotes() {
    if (import.meta.env.DEV) {
      userVotes.value = []
      LocalStorage.remove(STORAGE_KEYS.USER_VOTES)
    }
  }
  
  /**
   * 触发自定义事件
   */
  function emitEvent(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
  }
  
  return {
    // 状态
    loading,
    error,
    userVotes,
    results,
    
    // 计算属性
    hasVoted,
    canVote,
    
    // 方法
    submitVote,
    fetchResults,
    hasVotedFor,
    clearVotes
  }
}


