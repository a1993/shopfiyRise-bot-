/**
 * 构建 Vue 应用并部署到 Shopify Assets
 * 支持多个 Vue 应用的构建和部署
 */

import { build } from 'vite'
import { resolve } from 'path'
import { copyFileSync, existsSync, mkdirSync } from 'fs'

const apps = [
  {
    name: 'vote-widget',
    entry: './vote-widget/index.html',
    outputName: 'vote-widget'
  }
  // 可以添加更多应用
  // {
  //   name: 'product-showcase',
  //   entry: './product-showcase/index.html',
  //   outputName: 'product-showcase'
  // }
]

async function buildApp(app) {
  console.log(`\n🔨 Building ${app.name}...`)
  
  try {
    await build({
      root: resolve(__dirname, app.name),
      build: {
        outDir: resolve(__dirname, '../assets'),
        emptyOutDir: false,
        rollupOptions: {
          output: {
            entryFileNames: `${app.outputName}.js`,
            chunkFileNames: `${app.outputName}-[name].js`,
            assetFileNames: (assetInfo) => {
              if (assetInfo.name.endsWith('.css')) {
                return `${app.outputName}.css`
              }
              return `${app.outputName}-[name].[ext]`
            }
          }
        },
        // 生成 sourcemap 用于调试
        sourcemap: process.env.NODE_ENV === 'development'
      }
    })
    
    console.log(`✅ ${app.name} built successfully!`)
    console.log(`   📦 Output: assets/${app.outputName}.js`)
    console.log(`   📦 Output: assets/${app.outputName}.css`)
    
  } catch (error) {
    console.error(`❌ Error building ${app.name}:`, error)
    process.exit(1)
  }
}

async function buildAll() {
  console.log('🚀 Starting Shopify Vue Apps Build Process...\n')
  console.log(`📅 ${new Date().toLocaleString()}`)
  console.log(`📂 Target: ${resolve(__dirname, '../assets')}\n`)
  
  // 确保 assets 目录存在
  const assetsDir = resolve(__dirname, '../assets')
  if (!existsSync(assetsDir)) {
    mkdirSync(assetsDir, { recursive: true })
  }
  
  // 构建所有应用
  for (const app of apps) {
    await buildApp(app)
  }
  
  console.log('\n✨ All apps built successfully!')
  console.log('\n📝 Next steps:')
  console.log('   1. Run: shopify theme push')
  console.log('   2. Or run: npm run deploy')
}

buildAll().catch(console.error)


