/**
 * Campaign Common JavaScript
 * 活动页面公共 JS 模块
 */

class CampaignModal {
  constructor() {
    this.modal = null;
    this.init();
  }

  init() {
    // 初始化所有视频触发器
    document.addEventListener('click', (e) => {
      const videoTrigger = e.target.closest('[data-video-url]');
      if (videoTrigger) {
        e.preventDefault();
        const videoUrl = videoTrigger.dataset.videoUrl;
        if (videoUrl) {
          this.openVideoModal(videoUrl);
        }
      }
    });

    // ESC 键关闭弹窗
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal) {
        this.closeModal();
      }
    });
  }

  openVideoModal(videoUrl) {
    // 如果已有弹窗，先关闭
    if (this.modal) {
      this.closeModal();
    }

    // 确保 YouTube URL 包含 autoplay
    let finalUrl = videoUrl;
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      finalUrl = videoUrl.includes('?') 
        ? `${videoUrl}&autoplay=1` 
        : `${videoUrl}?autoplay=1`;
    }

    // 创建弹窗
    const modal = document.createElement('div');
    modal.className = 'campaign-modal';
    modal.innerHTML = `
      <div class="campaign-modal__overlay"></div>
      <div class="campaign-modal__content">
        <button class="campaign-modal__close" aria-label="Close video">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="campaign-modal__video-wrapper">
          <iframe 
            src="${finalUrl}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modal = modal;

    // 禁止页面滚动
    document.body.style.overflow = 'hidden';

    // 添加显示动画
    requestAnimationFrame(() => {
      modal.classList.add('campaign-modal--visible');
    });

    // 绑定关闭事件
    modal.querySelector('.campaign-modal__close').addEventListener('click', () => {
      this.closeModal();
    });

    modal.querySelector('.campaign-modal__overlay').addEventListener('click', () => {
      this.closeModal();
    });
  }

  closeModal() {
    if (!this.modal) return;

    // 添加关闭动画
    this.modal.classList.remove('campaign-modal--visible');

    setTimeout(() => {
      if (this.modal && this.modal.parentNode) {
        this.modal.parentNode.removeChild(this.modal);
      }
      this.modal = null;
      // 恢复页面滚动
      document.body.style.overflow = '';
    }, 300);
  }
}

// 产品网格懒加载
class CampaignLazyLoad {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadElement(entry.target);
              this.observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );

      // 观察所有带 data-lazy 属性的元素
      document.querySelectorAll('[data-lazy]').forEach((el) => {
        this.observer.observe(el);
      });
    } else {
      // 降级处理：直接加载所有元素
      document.querySelectorAll('[data-lazy]').forEach((el) => {
        this.loadElement(el);
      });
    }
  }

  loadElement(element) {
    const src = element.dataset.lazySrc;
    if (src) {
      if (element.tagName === 'IMG') {
        element.src = src;
      } else {
        element.style.backgroundImage = `url(${src})`;
      }
      element.classList.add('campaign-lazy-loaded');
    }
  }
}

// 平滑滚动到锚点
class CampaignScroll {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor && anchor.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const headerHeight = document.querySelector('.shopify-section-header')?.offsetHeight || 0;
          
          window.scrollTo({
            top: offsetTop - headerHeight - 20,
            behavior: 'smooth'
          });
        }
      }
    });
  }
}

// 自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCampaignCommon);
} else {
  initCampaignCommon();
}

function initCampaignCommon() {
  // 初始化所有功能模块
  new CampaignModal();
  new CampaignLazyLoad();
  new CampaignScroll();
  
  console.log('✅ Campaign Common JS initialized');
}

// 导出供外部使用
window.CampaignCommon = {
  Modal: CampaignModal,
  LazyLoad: CampaignLazyLoad,
  Scroll: CampaignScroll
};

