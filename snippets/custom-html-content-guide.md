# 自定义 HTML 内容模块使用指南

## ⚠️ 防止样式污染的重要说明

为了避免自定义 CSS 和 JavaScript 污染全局样式，请遵循以下最佳实践：

---

## CSS 作用域限制

### ❌ 错误示例（会污染全局）

```css
/* 这样写会影响整个网站的所有 h1 标签 */
h1 {
  color: red;
  font-size: 32px;
}

.title {
  margin-bottom: 20px;
}
```

### ✅ 正确示例 1：使用 Section ID

```css
/* 使用唯一的 section ID 作为前缀 */
#custom-html-{{ section.id }} h1 {
  color: red;
  font-size: 32px;
}

#custom-html-{{ section.id }} .title {
  margin-bottom: 20px;
}

#custom-html-{{ section.id }} .custom-button {
  background: blue;
  padding: 10px 20px;
}
```

### ✅ 正确示例 2：使用 Custom Class

```css
/* 使用 .custom-scoped-section 作为父选择器 */
.custom-scoped-section h1 {
  color: red;
  font-size: 32px;
}

.custom-scoped-section .title {
  margin-bottom: 20px;
}

.custom-scoped-section .custom-button {
  background: blue;
  padding: 10px 20px;
}
```

### ✅ 正确示例 3：复杂选择器

```css
/* 嵌套选择器也要加前缀 */
.custom-scoped-section .container {
  max-width: 1200px;
  margin: 0 auto;
}

.custom-scoped-section .container .row {
  display: flex;
  gap: 20px;
}

.custom-scoped-section .container .row .col {
  flex: 1;
}

/* 伪类和伪元素 */
.custom-scoped-section .button:hover {
  opacity: 0.8;
}

.custom-scoped-section .title::after {
  content: "";
  display: block;
  width: 50px;
  height: 2px;
  background: red;
}
```

---

## JavaScript 作用域限制

### ❌ 错误示例（会影响全局）

```javascript
// 这会选择页面上所有的按钮
const buttons = document.querySelectorAll('.button');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('clicked');
  });
});
```

### ✅ 正确示例

```javascript
// 限制在当前 section 内操作
const section = document.querySelector('.custom-scoped-section');
if (section) {
  const buttons = section.querySelectorAll('.button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('clicked');
    });
  });
}
```

### ✅ 使用 IIFE 避免全局变量污染

```javascript
(function() {
  // 所有代码在函数作用域内
  const section = document.querySelector('.custom-scoped-section');
  if (!section) return;

  // 你的代码
  const myData = { /* ... */ };
  
  function handleClick() {
    // ...
  }

  section.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', handleClick);
  });
})();
```

---

## 完整使用示例

### HTML Block 内容

```html
<div class="my-custom-content">
  <div class="hero-banner">
    <h1 class="hero-title">Welcome to Our Store</h1>
    <p class="hero-description">Discover amazing products</p>
    <button class="hero-button">Shop Now</button>
  </div>
</div>
```

### 对应的 CSS（在自定义 CSS 设置中）

```css
.custom-scoped-section .my-custom-content {
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.custom-scoped-section .hero-banner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  color: white;
}

.custom-scoped-section .hero-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.custom-scoped-section .hero-description {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.custom-scoped-section .hero-button {
  padding: 15px 40px;
  font-size: 18px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.custom-scoped-section .hero-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .custom-scoped-section .hero-title {
    font-size: 32px;
  }
  
  .custom-scoped-section .hero-description {
    font-size: 16px;
  }
}
```

### 对应的 JavaScript（在自定义 JS 设置中）

```javascript
(function() {
  const section = document.querySelector('.custom-scoped-section');
  if (!section) return;

  const button = section.querySelector('.hero-button');
  
  if (button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 平滑滚动到产品区域
      const productsSection = document.querySelector('#products');
      if (productsSection) {
        productsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // 添加点击动画
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 100);
    });
  }
})();
```

---

## 调试技巧

### 1. 检查样式是否被正确限制

在浏览器开发者工具中：
- 打开 Elements/元素 面板
- 选择自定义内容的元素
- 查看 Styles 面板，确认选择器以 `.custom-scoped-section` 或 section ID 开头

### 2. 验证 JavaScript 作用域

在控制台运行：
```javascript
// 应该只返回当前 section 内的元素
document.querySelectorAll('.custom-scoped-section .your-class');
```

### 3. 检查全局污染

```javascript
// 在添加自定义 CSS 前后对比
getComputedStyle(document.querySelector('h1'));
```

---

## 常见问题

### Q: 为什么我的样式没有生效？

A: 检查以下几点：
1. 确保所有选择器都添加了 `.custom-scoped-section` 前缀
2. 检查 CSS 优先级，可能需要添加 `!important`
3. 确认 HTML 结构和类名拼写正确

### Q: 可以使用外部库（如 jQuery）吗？

A: 可以，但要确保：
```javascript
(function($) {
  // 限制 jQuery 操作到当前 section
  var $section = $('.custom-scoped-section');
  $section.find('.button').on('click', function() {
    // ...
  });
})(jQuery);
```

### Q: 如何使用 @keyframes 动画？

A: 动画名称会是全局的，建议添加唯一前缀：
```css
@keyframes customSection-fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.custom-scoped-section .animated-element {
  animation: customSection-fadeIn 1s ease-in;
}
```

---

## 总结

✅ **务必记住**：
1. CSS 选择器前加 `.custom-scoped-section`
2. JavaScript 操作前先获取 section 容器
3. 使用 IIFE 包裹 JS 代码避免全局变量
4. 为动画、变量等使用唯一命名

这样可以确保你的自定义代码只影响当前 section，不会污染网站其他部分的样式和功能！

