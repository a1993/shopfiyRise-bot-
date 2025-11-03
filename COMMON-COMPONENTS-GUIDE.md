# 通用组件使用指南

## 📦 组件清单

所有组件都已创建为 **Section（分区）**，可在 Shopify 主题编辑器中直接拖拽使用。

### 1. 标题组件 - `common-heading`
### 2. Banner 组件 - `common-banner`
### 3. 内容区域组件 - `common-content-area`
### 4. 容器组件 - `common-container` (Snippet，供其他组件内部使用)
### 5. Modal 组件 - `common-modal` (Snippet，供其他组件使用)

---

## 1️⃣ 标题组件 (Common Heading)

**文件**: `sections/common-heading.liquid`

### 功能特性

- ✅ 自由设置 H1-H6 标签等级
- ✅ 主标题 + 副标题
- ✅ 4 种尺寸选项（小、中、大、超大）
- ✅ 3 种对齐方式（左、中、右）
- ✅ 自定义颜色
- ✅ 完整的响应式设计（PC/M 不同字体大小）
- ✅ 可调节上下间距
- ✅ 背景颜色/渐变

### 使用方法

在 Shopify 后台添加分区：
1. 主题编辑器 → 添加分区
2. 搜索 "标题 Heading"
3. 点击添加

### 配置项

#### 标题内容
- **主标题**: 输入文字
- **主标题 HTML 标签**: H1/H2/H3/H4/H5/H6
- **主标题大小**: 小/中/大/超大
- **主标题颜色**: 自定义颜色
- **副标题**: 输入文字（可选）
- **副标题 HTML 标签**: P/Span/H3/H4/H5/H6
- **副标题大小**: 小/中/大
- **副标题颜色**: 自定义颜色

#### 布局设置
- **文本对齐**: 左对齐/居中/右对齐
- **容器宽度**: 标准(1368px)/宽屏(1600px)/窄屏(1024px)/全宽
- **容器内边距**: 无/小/中/大
- **上间距**: 无/小/中/大
- **下间距**: 无/小/中/大
- **背景颜色**: 自定义颜色

### 尺寸参考

| 尺寸 | 移动端 | 桌面端 |
|-----|-------|-------|
| 小 | 18px | 24px |
| 中 | 24px | 36px |
| 大 | 30px | 48px |
| 超大 | 36px | 60px |

### 示例场景

**1. 页面主标题**
```
主标题: "Our Products"
主标题标签: H1
主标题大小: 超大
对齐: 居中
上间距: 大
下间距: 中
```

**2. Section 小标题**
```
主标题: "Why Choose Us"
主标题标签: H2
主标题大小: 大
副标题: "Quality products at affordable prices"
对齐: 居中
```

---

## 2️⃣ Banner 组件 (Common Banner)

**文件**: `sections/common-banner.liquid`

### 功能特性

- ✅ PC/Mobile 分别设置图片
- ✅ 4 种 PC 端宽度模式（全屏/标准/宽屏/窄屏）
- ✅ 移动端自动全宽
- ✅ 可添加链接
- ✅ 延迟加载选项
- ✅ 响应式图片加载
- ✅ 可调节上下间距

### 使用方法

在 Shopify 后台添加分区：
1. 主题编辑器 → 添加分区
2. 搜索 "横幅 Banner"
3. 点击添加
4. 上传桌面端图片（必填）
5. 上传移动端图片（可选，不设置则使用桌面端图片）

### 配置项

#### Banner 图片
- **桌面端图片**: 推荐尺寸 1920x628px
- **移动端图片**: 推荐尺寸 750x750px（可选）
- **图片 Alt 文本**: 用于 SEO 和无障碍访问
- **Banner 链接**: 点击跳转链接（可选）

#### 布局设置
- **PC端宽度模式**:
  - 全屏：100% 宽度
  - 标准：1368px 居中显示
  - 宽屏：1600px 居中显示
  - 窄屏：1024px 居中显示
- **上间距**: 无/小/中/大
- **下间距**: 无/小/中/大
- **延迟加载**: 首屏 Banner 建议关闭

### 宽度模式对比

| 模式 | PC端效果 | 移动端效果 | 适用场景 |
|-----|---------|-----------|---------|
| 全屏 | 100% 宽度 | 100% 宽度 | 大气的全屏 Banner |
| 标准 | 1368px 居中 | 100% 宽度 | 活动页 Banner（推荐）|
| 宽屏 | 1600px 居中 | 100% 宽度 | 需要更宽展示 |
| 窄屏 | 1024px 居中 | 100% 宽度 | 内容型页面 |

### 示例场景

**1. 活动页 Banner**
```
桌面端图片: campaign-banner-desktop.jpg (1920x628)
移动端图片: campaign-banner-mobile.jpg (750x750)
宽度模式: 标准 (1368px)
延迟加载: 关闭
```

**2. 首页全屏 Banner**
```
桌面端图片: hero-banner.jpg (1920x1080)
移动端图片: hero-banner-mobile.jpg (750x1000)
宽度模式: 全屏
延迟加载: 关闭
Banner 链接: /collections/new-arrivals
```

**3. 内容页小 Banner**
```
桌面端图片: content-banner.jpg (1024x400)
宽度模式: 窄屏 (1024px)
上间距: 中
下间距: 中
延迟加载: 开启
```

---

## 3️⃣ 内容区域组件 (Common Content Area)

**文件**: `sections/common-content-area.liquid`

### 功能特性

- ✅ 可放置任何内容的通用容器
- ✅ 支持多种 Block 类型（文本/富文本/图片/按钮/间距）
- ✅ 每个 Block 独立配置
- ✅ 完整的响应式设计
- ✅ 背景颜色/渐变
- ✅ 灵活的布局选项

### 使用方法

在 Shopify 后台添加分区：
1. 主题编辑器 → 添加分区
2. 搜索 "内容区域 Content"
3. 点击添加
4. 点击 "添加块" 添加内容

### 配置项

#### 容器设置
- **容器宽度**: 标准(1368px)/宽屏(1600px)/窄屏(1024px)/全宽
- **容器内边距**: 无/小/中/大
- **上间距**: 无/小/中/大
- **下间距**: 无/小/中/大
- **背景颜色**: 自定义颜色
- **背景渐变**: 自定义渐变（优先于背景颜色）

#### Block 类型

##### 1. 文本块 (Text)
- 文本内容: 纯文本
- 对齐方式: 左/中/右
- 文本颜色: 自定义

##### 2. 富文本块 (Richtext)
- 富文本内容: 支持格式化（粗体、斜体、列表等）
- 对齐方式: 左/中/右
- 文本颜色: 自定义

##### 3. 图片块 (Image)
- 选择图片: 上传图片
- 图片 Alt 文本: SEO 优化
- 对齐方式: 左/中/右
- 图片最大宽度: 100% / 800px / 50% 等

##### 4. 按钮块 (Button)
- 按钮文字: 按钮显示文字
- 按钮链接: 跳转链接
- 按钮样式: 主要/次要/描边
- 对齐方式: 左/中/右
- 按钮颜色: 自定义

##### 5. 间距块 (Spacer)
- 间距高度: 0-200px（10px 递增）

### 示例场景

**1. 简单文本说明**
```
容器宽度: 标准
容器内边距: 中
上间距: 大
下间距: 大

添加块:
- 文本块: "Welcome to our store!"
  对齐: 居中
```

**2. 图文混排**
```
容器宽度: 标准
背景颜色: #F5F5F5

添加块:
1. 富文本块: 段落描述
   对齐: 左
2. 图片块: 产品图片
   对齐: 居中
   最大宽度: 800px
3. 按钮块: "Shop Now"
   样式: 主要
   对齐: 居中
```

**3. 完整内容页**
```
添加块顺序:
1. 富文本: 介绍文字
2. 间距: 40px
3. 图片: 配图1
4. 间距: 20px
5. 富文本: 说明文字
6. 图片: 配图2
7. 间距: 40px
8. 按钮: Call-to-Action
```

---

## 4️⃣ 容器组件 (Common Container)

**文件**: `snippets/common-container.liquid`

### 说明

这是一个 **Snippet**，不能直接在主题编辑器中添加，但被其他 Section 内部使用。

### 功能

- 统一的页面宽度管理
- PC 端：标准 1368px / 宽屏 1600px / 窄屏 1024px / 全宽
- 移动端：自动全宽
- 响应式内边距

### 在代码中使用

```liquid
{% render 'common-container', 
  width: 'standard',
  padding: 'medium'
%}
  <!-- 你的内容 -->
</div>
```

---

## 5️⃣ Modal 组件 (Common Modal)

**文件**: `snippets/common-modal.liquid`

### 说明

通用弹窗组件，用于显示视频、图片、表单等内容。

### 功能特性

- ✅ 5 种尺寸（小/中/大/超大/全屏）
- ✅ 点击背景关闭
- ✅ ESC 键关闭
- ✅ 关闭按钮
- ✅ 平滑动画
- ✅ 响应式设计
- ✅ 事件监听

### 使用方法

#### 1. 定义 Modal 内容

```liquid
{% capture modal_content %}
  <h2>Modal Title</h2>
  <p>Modal content goes here...</p>
  <iframe 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    width="100%" 
    height="450"
    frameborder="0"
    allowfullscreen>
  </iframe>
{% endcapture %}
```

#### 2. 渲染 Modal

```liquid
{% render 'common-modal',
  modal_id: 'video-modal',
  modal_content: modal_content,
  size: 'large'
%}
```

#### 3. 触发 Modal

```html
<button onclick="openModal('video-modal')">
  Open Video
</button>
```

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| modal_id | String | 'common-modal' | Modal 唯一 ID |
| modal_content | String | '' | Modal 内容（通过 capture 传入）|
| size | String | 'medium' | 尺寸: small/medium/large/xlarge/full |
| close_on_backdrop | Boolean | true | 点击背景关闭 |
| show_close_button | Boolean | true | 显示关闭按钮 |

### JavaScript API

```javascript
// 打开 Modal
openModal('modal-id');

// 关闭 Modal
closeModal('modal-id');

// 监听 Modal 事件
document.getElementById('video-modal').addEventListener('modal:opened', function(e) {
  console.log('Modal opened:', e.detail.modalId);
});

document.getElementById('video-modal').addEventListener('modal:closed', function(e) {
  console.log('Modal closed:', e.detail.modalId);
});
```

### 示例场景

**1. 视频 Modal**
```liquid
{% capture video_modal_content %}
  <iframe 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    width="100%" 
    height="450"
    allowfullscreen>
  </iframe>
{% endcapture %}

{% render 'common-modal',
  modal_id: 'product-video',
  modal_content: video_modal_content,
  size: 'large'
%}

<button onclick="openModal('product-video')">
  Watch Video
</button>
```

**2. 图片 Modal**
```liquid
{% capture image_modal_content %}
  <img src="{{ product.featured_image | image_url: width: 1200 }}" alt="{{ product.title }}">
{% endcapture %}

{% render 'common-modal',
  modal_id: 'image-modal',
  modal_content: image_modal_content,
  size: 'xlarge'
%}
```

---

## 📐 响应式设计规范

所有组件遵循统一的响应式断点：

### 断点定义

| 设备类型 | 屏幕宽度 | 说明 |
|---------|---------|------|
| 移动端 | ≤ 767px | 手机 |
| 平板端 | 768px - 1279px | 平板 |
| 桌面端 | ≥ 1280px | 电脑 |

### 容器宽度

| 宽度模式 | 最大宽度 | REM | 适用场景 |
|---------|---------|-----|---------|
| 标准 | 1368px | 85.5rem | 活动页、产品页（推荐）|
| 宽屏 | 1600px | 100rem | 需要更宽展示 |
| 窄屏 | 1024px | 64rem | 文章、博客 |
| 全宽 | 100% | - | 大气展示 |

### 间距规范

| 间距大小 | 移动端 | 桌面端 | REM |
|---------|-------|-------|-----|
| 小 | 16px | 16px | 1rem |
| 中 | 24px | 32px | 1.5/2rem |
| 大 | 40px | 64px | 2.5/4rem |

### 字体大小

#### 标题

| 尺寸 | 移动端 | 桌面端 |
|-----|-------|-------|
| 小 | 18px | 24px |
| 中 | 24px | 36px |
| 大 | 30px | 48px |
| 超大 | 36px | 60px |

#### 正文

| 类型 | 移动端 | 桌面端 |
|-----|-------|-------|
| 小 | 12px | 14px |
| 正常 | 14px | 16px |
| 大 | 16px | 18px |

---

## 🎨 组合使用示例

### 示例 1: 活动页完整布局

```
1. Banner 组件
   - 桌面图: 1920x628
   - 移动图: 750x750
   - 宽度: 标准

2. 标题组件
   - 主标题: "Black Friday Sale"
   - 标签: H1
   - 大小: 超大
   - 对齐: 居中
   - 上间距: 大

3. 内容区域组件
   - 容器: 标准
   - 块1: 富文本（活动说明）
   - 块2: 图片（产品图）
   - 块3: 按钮（Shop Now）

4. 产品列表 Section
   (使用已有的产品展示组件)
```

### 示例 2: 关于我们页面

```
1. Banner 组件
   - 窄屏模式
   - 上间距: 中

2. 标题组件
   - 主标题: "About Us"
   - 副标题: "Our Story"
   - 对齐: 居中

3. 内容区域组件
   - 块1: 富文本（公司介绍）
   - 块2: 间距 40px
   - 块3: 图片（团队照片）
   - 块4: 间距 40px
   - 块5: 富文本（使命愿景）

4. 标题组件
   - 主标题: "Our Values"

5. 内容区域组件
   (价值观卡片)
```

---

## 💡 最佳实践

### 1. 性能优化

- ✅ 首屏 Banner 关闭延迟加载
- ✅ 下方内容开启延迟加载
- ✅ 图片尺寸优化：Banner 不超过 200KB

### 2. SEO 优化

- ✅ 页面主标题使用 H1 标签
- ✅ Section 标题使用 H2-H3
- ✅ 所有图片添加 Alt 文本
- ✅ 合理使用标题层级

### 3. 用户体验

- ✅ 保持视觉层级清晰
- ✅ 合理使用间距，避免拥挤
- ✅ 移动端优先设计
- ✅ 按钮文字清晰易懂

### 4. 一致性

- ✅ 统一使用标准容器宽度（1368px）
- ✅ 统一间距规范（小/中/大）
- ✅ 统一颜色方案
- ✅ 统一字体大小

---

## 🔧 故障排除

### Q: 为什么 Section 不显示？
A: 检查是否添加了必要内容（如标题组件需要输入标题文字）

### Q: 移动端样式不对？
A: 清除浏览器缓存，使用无痕模式测试

### Q: Modal 无法关闭？
A: 检查是否正确引入了 Modal Snippet，检查 modal_id 是否唯一

### Q: 容器宽度不对？
A: 检查是否选择了正确的宽度模式，检查父元素是否有 max-width 限制

---

## 📝 更新日志

**v1.0** - 2025-11-03
- ✅ 创建标题组件 (Common Heading)
- ✅ 创建 Banner 组件 (Common Banner)
- ✅ 创建内容区域组件 (Common Content Area)
- ✅ 创建容器组件 (Common Container)
- ✅ 创建 Modal 组件 (Common Modal)
- ✅ 完整的响应式设计支持
- ✅ 中文后台界面

---

**文档维护**: Shopify Theme Development Team  
**最后更新**: 2025-11-03

