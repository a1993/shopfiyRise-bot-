<template>
  <div class="vote-widget" :class="{ 'is-loading': loading }">
    <!-- Header -->
    <header class="widget-header">
      <h2 class="widget-title">{{ config.title || 'Vote for Your Favorite' }}</h2>
      <p class="widget-description">{{ config.description }}</p>
    </header>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="error = null">Dismiss</button>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="success-message">
      <p>✅ Thank you for voting!</p>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        :class="{
          'has-voted': hasVotedFor(product.id),
          'is-winner': isLeading(product.id),
        }"
      >
        <!-- Product Image -->
        <div class="product-image">
          <img :src="product.image" :alt="product.title" loading="lazy" />

          <!-- Vote Badge -->
          <div v-if="hasVotedFor(product.id)" class="vote-badge">✓ Your Vote</div>
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
          <p v-if="product.description" class="product-description">
            {{ product.description }}
          </p>
        </div>

        <!-- Vote Button -->
        <button class="vote-button" :disabled="!canVote || hasVotedFor(product.id)" @click="handleVote(product.id)">
          <template v-if="hasVotedFor(product.id)"> Voted ✓ </template>
          <template v-else-if="!canVote"> Voting Closed </template>
          <template v-else> Vote Now </template>
        </button>

        <!-- Results (if enabled) -->
        <div v-if="config.showResults && results.length" class="product-results">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: getVotePercentage(product.id) + '%' }"></div>
          </div>
          <div class="vote-stats">
            <span class="vote-count">{{ getVoteCount(product.id) }} votes</span>
            <span class="vote-percentage">{{ getVotePercentage(product.id) }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer v-if="config.showFooter" class="widget-footer">
      <p class="total-votes">
        Total votes: <strong>{{ totalVotes }}</strong>
      </p>

      <!-- Dev Tools -->
      <div v-if="isDev" class="dev-tools">
        <button @click="clearVotes">Clear My Votes</button>
        <button @click="fetchResults">Refresh Results</button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useVote } from './composables/useVote.js';
import { getAppConfig } from './config.js';

// 获取 section ID（从 DOM 或默认值）
const sectionId = ref(document.querySelector('[id^="headless-app-"]')?.id || 'default');

// 配置
const config = getAppConfig(sectionId.value);
const isDev = import.meta.env.DEV;

// 使用投票功能
const { loading, error, results, hasVoted, canVote, submitVote, fetchResults, hasVotedFor, clearVotes } = useVote(
  sectionId.value
);

// 本地状态
const products = ref([]);
const showSuccess = ref(false);

// 计算属性
const totalVotes = computed(() => {
  return results.value.reduce((sum, r) => sum + (r.votes || 0), 0);
});

// 方法
async function handleVote(productId) {
  const success = await submitVote(productId);

  if (success) {
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  }
}

function getVoteCount(productId) {
  const result = results.value.find(r => r.productId === productId);
  return result?.votes || 0;
}

function getVotePercentage(productId) {
  if (totalVotes.value === 0) return 0;
  const count = getVoteCount(productId);
  return Math.round((count / totalVotes.value) * 100);
}

function isLeading(productId) {
  if (!results.value.length) return false;
  const maxVotes = Math.max(...results.value.map(r => r.votes || 0));
  return getVoteCount(productId) === maxVotes && maxVotes > 0;
}

// 生命周期
onMounted(async () => {
  // 从 API 获取产品列表
  try {
    // 这里可以调用 Shopify Storefront API 或自己的 API
    // 暂时使用模拟数据
    products.value = [
      {
        id: '1',
        title: 'Holiday Curls',
        description: 'Perfect beach waves for the holidays',
        image: 'https://cdn.shopify.com/s/files/1/0001/0001/products/product-1.jpg',
      },
      {
        id: '2',
        title: 'Festive Braids',
        description: 'Elegant braided hairstyle',
        image: 'https://cdn.shopify.com/s/files/1/0001/0001/products/product-2.jpg',
      },
      {
        id: '3',
        title: 'Winter Waves',
        description: 'Smooth and shiny winter waves',
        image: 'https://cdn.shopify.com/s/files/1/0001/0001/products/product-3.jpg',
      },
      {
        id: '4',
        title: 'Party Updo',
        description: 'Glamorous updo for parties',
        image: 'https://cdn.shopify.com/s/files/1/0001/0001/products/product-4.jpg',
      },
    ];

    // 获取投票结果
    await fetchResults();
  } catch (err) {
    console.error('Failed to load products:', err);
  }
});
</script>

<style scoped>
.vote-widget {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.widget-header {
  text-align: center;
  margin-bottom: 3rem;
}

.widget-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.widget-description {
  font-size: 1.125rem;
  color: #666;
}

.error-message,
.success-message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
}

.error-message {
  background: #fee;
  color: #c00;
  border: 1px solid #fcc;
}

.success-message {
  background: #efe;
  color: #060;
  border: 1px solid #cfc;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.product-card {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-card.has-voted {
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.product-card.is-winner {
  border-color: #ffd700;
  box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.2);
}

.product-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vote-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.875rem;
}

.product-info {
  padding: 1.5rem;
}

.product-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.product-description {
  font-size: 0.875rem;
  color: #666;
}

.vote-button {
  width: 100%;
  padding: 1rem;
  background: #000;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.vote-button:hover:not(:disabled) {
  background: #333;
}

.vote-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.product-results {
  padding: 1rem 1.5rem 1.5rem;
}

.progress-bar {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #81c784);
  transition: width 0.5s ease;
}

.vote-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #666;
}

.widget-footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.total-votes {
  font-size: 1.125rem;
  margin-bottom: 1rem;
}

.dev-tools {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.dev-tools button {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.dev-tools button:hover {
  background: #e0e0e0;
}

.is-loading {
  opacity: 0.6;
  pointer-events: none;
}

@media (max-width: 768px) {
  .widget-title {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }
}
</style>
