/**
 * Built to Last: Durable Hair Systems JavaScript
 * 视频播放功能
 */

(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    const closeButton = modal?.querySelector('.durable-modal-close');
    const overlay = modal?.querySelector('.durable-modal-overlay');
    
    // 打开视频模态框
    function openVideoModal(videoUrl) {
      if (!modal || !videoContainer) return;
      
      // 创建 iframe
      const iframe = document.createElement('iframe');
      iframe.src = videoUrl;
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      
      videoContainer.innerHTML = '';
      videoContainer.appendChild(iframe);
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    // 关闭视频模态框
    function closeVideoModal() {
      if (!modal || !videoContainer) return;
      
      modal.classList.remove('active');
      videoContainer.innerHTML = '';
      document.body.style.overflow = '';
    }
    
    // 绑定所有视频元素的点击事件
    const videoWrappers = document.querySelectorAll('[data-video]');
    videoWrappers.forEach(function(wrapper) {
      wrapper.addEventListener('click', function() {
        const videoUrl = this.getAttribute('data-video');
        if (videoUrl) {
          openVideoModal(videoUrl);
        }
      });
    });
    
    // 关闭按钮事件
    if (closeButton) {
      closeButton.addEventListener('click', closeVideoModal);
    }
    
    // 点击遮罩层关闭
    if (overlay) {
      overlay.addEventListener('click', closeVideoModal);
    }
    
    // ESC 键关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal?.classList.contains('active')) {
        closeVideoModal();
      }
    });
    
  });
  
})();

