// Menu mobile toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Prevenir scroll do body quando menu está aberto
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
}));

// Fechar menu ao clicar fora dele
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Fechar menu ao redimensionar a tela
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Scroll suave para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animação de entrada aprimorada para elementos
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Adicionar classe para ativar animação
      entry.target.classList.add('animate-visible');
      
      // Remover observer após animação
      setTimeout(() => {
        animationObserver.unobserve(entry.target);
      }, 1000);
    }
  });
}, observerOptions);

// Função para adicionar animações baseadas na posição
function addScrollAnimations() {
  // Elementos que vêm da esquerda
  const leftElements = document.querySelectorAll('.value-item:nth-child(odd), .project-card:nth-child(odd), .service-card:nth-child(odd), .team-member:nth-child(odd), .tech-card:nth-child(odd)');
  
  // Elementos que vêm da direita
  const rightElements = document.querySelectorAll('.value-item:nth-child(even), .project-card:nth-child(even), .service-card:nth-child(even), .team-member:nth-child(even), .tech-card:nth-child(even)');
  
  // Elementos que vêm de baixo
  const bottomElements = document.querySelectorAll('.section-header, .carousel-container');
  
  // Elementos que vêm de cima
  const topElements = document.querySelectorAll('.about-content, .contact-info');
  
  // Elementos que fazem fade in com scale
  const fadeScaleElements = document.querySelectorAll('.hero-logo, .contact-form');
  
  // Configurar estados iniciais e observers
  leftElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-100px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    animationObserver.observe(el);
  });
  
  rightElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(100px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    animationObserver.observe(el);
  });
  
  bottomElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(100px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    animationObserver.observe(el);
  });
  
  topElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-100px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    animationObserver.observe(el);
  });
  
  fadeScaleElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'scale(0.8)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    animationObserver.observe(el);
  });
}

// Função para ativar animações quando elementos entram na viewport
function activateAnimations() {
  const animatedElements = document.querySelectorAll('.animate-visible');
  
  animatedElements.forEach(el => {
    // Determinar direção da animação baseada na classe ou posição
    if (el.classList.contains('value-item') || el.classList.contains('project-card') || 
        el.classList.contains('service-card') || el.classList.contains('team-member') || 
        el.classList.contains('tech-card')) {
      
      const isOdd = Array.from(el.parentNode.children).indexOf(el) % 2 === 0;
      
      if (isOdd) {
        // Animação da esquerda
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      } else {
        // Animação da direita
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }
    } else if (el.classList.contains('section-header') || el.classList.contains('carousel-container')) {
      // Animação de baixo
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    } else if (el.classList.contains('about-content') || el.classList.contains('contact-info')) {
      // Animação de cima
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    } else if (el.classList.contains('hero-logo') || el.classList.contains('contact-form')) {
      // Animação fade in com scale
      el.style.opacity = '1';
      el.style.transform = 'scale(1)';
    }
  });
}

// Inicializar animações quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  addScrollAnimations();
  
  // Ativar animações após um pequeno delay
  setTimeout(() => {
    activateAnimations();
  }, 100);
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simular envio
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.textContent = 'Mensagem enviada!';
      this.reset();
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }, 1000);
  });
}

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Efeito de foco nos inputs do formulário
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focus');
  });
  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focus');
  });
});

// Pequeno efeito parallax no hero
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('mousemove', e => {
  if (heroBg) {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    heroBg.style.transform = `translate(${x}px, ${y}px)`;
  }
});

// Melhorias para mobile - touch gestures
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartY - touchEndY;
  
  // Swipe para cima - fechar menu se estiver aberto
  if (diff > swipeThreshold && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Melhorar performance em mobile
let ticking = false;

function updateParallax() {
  if (heroBg) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    heroBg.style.transform = `translateY(${rate}px)`;
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Adicionar classe para dispositivos touch
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.body.classList.add('touch-device');
} 