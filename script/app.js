/**
 * Piscou Chegou - Script Principal (Leve e Sem Dependências)
 * Foco em performance (< 1s no 4G), acessibilidade e conversão Mobile-First.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Acordeão de FAQ (Tira-Dúvidas)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    // Inicializa o primeiro item aberto se já estiver marcado como data-open="true"
    if (item.getAttribute('data-open') === 'true') {
      content.style.maxHeight = content.scrollHeight + 'px';
    }

    trigger.addEventListener('click', () => {
      const isExpanded = item.getAttribute('data-open') === 'true';

      // Fecha os demais itens para manter a leitura limpa no mobile
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.setAttribute('data-open', 'false');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = '0px';
        }
      });

      // Alterna o estado do item clicado
      const nextState = !isExpanded;
      item.setAttribute('data-open', String(nextState));
      trigger.setAttribute('aria-expanded', String(nextState));
      content.style.maxHeight = nextState ? content.scrollHeight + 'px' : '0px';
    });
  });

  // 2. Menu Mobile (Abrir/Fechar)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', String(isHidden));
    });

    // Fecha o menu mobile ao clicar em qualquer link interno
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Rolagem Suave com Compensação do Header Fixo
  const header = document.getElementById('site-header');
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        const headerOffset = header ? header.offsetHeight + 12 : 88;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // 4. Atualização automática do ano no rodapé
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 5. Lightbox para Ampliar as Fotos do Caminhão
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxTriggers = document.querySelectorAll('[data-lightbox-src]');

  if (lightbox && lightboxImg && lightboxCaption) {
    const openLightbox = (src, caption) => {
      lightboxImg.src = src;
      lightboxCaption.textContent = caption || '';
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    };

    lightboxTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const src = trigger.getAttribute('data-lightbox-src');
        const caption = trigger.getAttribute('data-lightbox-caption');
        if (src) openLightbox(src, caption);
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Fecha ao clicar fora da foto (no fundo escuro)
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    // Fecha ao pressionar a tecla ESC
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightbox();
      }
    });
  }
});

