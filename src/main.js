import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização do Intersection Observer para as micro-interações de fade-in
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // Infinite Auto Scroll Carousel para a Grade Escolar (Puro JS equivalente ao componente)
  const gradeGrid = document.querySelector('.grade-grid');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (gradeGrid) {
    let scrollInterval;
    const intervalTime = 3500; // ~3.5s por card para dar tempo de ler
    
    const getScrollAmount = () => {
      const firstCard = gradeGrid.querySelector('.grade-card');
      return firstCard ? firstCard.offsetWidth + 40 : 380; // card width + gap
    };

    const startAutoScroll = () => {
      stopAutoScroll();
      // Não roda autoplay no mobile para não bugar o usuário (fica estático)
      if (window.innerWidth <= 768) return;
      
      scrollInterval = setInterval(() => {
        const cardWidth = getScrollAmount();
        const maxScrollLeft = gradeGrid.scrollWidth - gradeGrid.clientWidth;
        
        if (gradeGrid.scrollLeft >= maxScrollLeft - 10) {
          // Volta suavemente ao início
          gradeGrid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          gradeGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, intervalTime);
    };

    const stopAutoScroll = () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };

    // Eventos de clique nas setas
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        const cardWidth = getScrollAmount();
        if (gradeGrid.scrollLeft <= 10) {
          // Se estiver no início, vai para o fim
          gradeGrid.scrollTo({ left: gradeGrid.scrollWidth, behavior: 'smooth' });
        } else {
          gradeGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
        // Reinicia o autoplay após um tempo sem interação
        setTimeout(startAutoScroll, 3000);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        const cardWidth = getScrollAmount();
        const maxScrollLeft = gradeGrid.scrollWidth - gradeGrid.clientWidth;
        if (gradeGrid.scrollLeft >= maxScrollLeft - 10) {
          // Se estiver no fim, vai para o início
          gradeGrid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          gradeGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
        // Reinicia o autoplay após um tempo sem interação
        setTimeout(startAutoScroll, 3000);
      });
    }

    startAutoScroll();

    // Pausa o autoplay ao passar o mouse ou tocar na tela
    gradeGrid.addEventListener('mouseenter', stopAutoScroll);
    gradeGrid.addEventListener('mouseleave', startAutoScroll);
    gradeGrid.addEventListener('touchstart', stopAutoScroll, { passive: true });
    gradeGrid.addEventListener('touchend', startAutoScroll, { passive: true });
  }

  // Menu Sanduíche Mobile
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ═══════════════════════════════════════════════════
  // 3D Cylinder Carousel — Infraestrutura
  // ═══════════════════════════════════════════════════
  const cylinder = document.getElementById('carousel3d-cylinder');
  const overlay  = document.getElementById('carousel3d-overlay');
  const overlayImg = document.getElementById('carousel3d-overlay-img');

  if (cylinder && overlay) {
    const images = [
      { src: '/infraestrutura/IMG_6154.jpg', alt: 'Espaço educacional Colégio Passos' },
      { src: '/infraestrutura/IMG_6162.jpg', alt: 'Instalações Colégio Passos' },
      { src: '/infraestrutura/IMG_6167.jpg', alt: 'Área de convivência Colégio Passos' },
      { src: '/infraestrutura/IMG_6191.jpg', alt: 'Sala de aula Colégio Passos' },
      { src: '/infraestrutura/IMG_6194.jpg', alt: 'Pátio Colégio Passos' },
      { src: '/infraestrutura/IMG_6195.jpg', alt: 'Corredor Colégio Passos' },
      { src: '/infraestrutura/IMG_6201.jpg', alt: 'Espaço externo Colégio Passos' },
      { src: '/infraestrutura/IMG_6203.jpg', alt: 'Quadra Colégio Passos' },
      { src: '/infraestrutura/IMG_6218.jpg', alt: 'Biblioteca Colégio Passos' },
      { src: '/infraestrutura/IMG_6265.jpg', alt: 'Estrutura Colégio Passos' },
    ];

    const isMobile   = () => window.innerWidth <= 640;
    const faceCount  = images.length;
    const getFaceW   = () => isMobile() ? 240 : 320;
    const getCylW    = () => getFaceW() * faceCount;
    const getRadius  = () => getCylW() / (2 * Math.PI);

    // Build faces
    images.forEach((img, i) => {
      const face = document.createElement('div');
      face.className = 'carousel3d-face';
      const image = document.createElement('img');
      image.src  = img.src;
      image.alt  = img.alt;
      image.loading = 'lazy';
      image.addEventListener('click', (e) => {
        if (Math.abs(dragDelta) > 6) return; // ignore clicks after drag
        e.stopPropagation();
        overlayImg.src = img.src;
        overlay.classList.add('active');
      });
      face.appendChild(image);
      cylinder.appendChild(face);
    });

    // Position faces on cylinder
    const layoutFaces = () => {
      const faceW  = getFaceW();
      const radius = getRadius();
      cylinder.style.setProperty('--c3d-face-w', faceW + 'px');
      cylinder.style.width = faceW + 'px';
      [...cylinder.querySelectorAll('.carousel3d-face')].forEach((face, i) => {
        const angle = i * (360 / faceCount);
        face.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
      });
    };
    layoutFaces();
    window.addEventListener('resize', layoutFaces);

    // ── Drag with spring inertia + auto-rotation ──
    let rotY          = 0;    // current rotation in degrees
    let velY          = 0;    // velocity (used for spring after drag)
    let autoSpeed     = 0.06; // degrees per frame  (~8 s per image at 60fps)
    let isAutoPlaying = true;
    let isDragging    = false;
    let dragStartX    = 0;
    let dragDelta     = 0;
    let rafId         = null;
    let resumeTimer   = null;

    const setRotation = (deg) => {
      cylinder.style.transition = 'none';
      cylinder.style.transform  = `rotateY(${deg}deg)`;
    };

    // Auto-rotate loop — smooth continuous spin
    const autoLoop = () => {
      rotY += autoSpeed;
      setRotation(rotY);
      rafId = requestAnimationFrame(autoLoop);
    };

    const startAutoPlay = () => {
      if (rafId) cancelAnimationFrame(rafId);
      isAutoPlaying = true;
      rafId = requestAnimationFrame(autoLoop);
    };

    const stopAutoPlay = () => {
      isAutoPlaying = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    };

    // Spring loop after drag release — decelerates then hands back to auto
    const springLoop = () => {
      if (Math.abs(velY) < 0.05) {
        velY = 0;
        // Resume auto-play after 2 s of no interaction
        resumeTimer = setTimeout(startAutoPlay, 2000);
        return;
      }
      velY  *= 0.93;  // damping
      rotY  += velY;
      setRotation(rotY);
      rafId = requestAnimationFrame(springLoop);
    };

    const onDragStart = (clientX) => {
      isDragging  = true;
      dragStartX  = clientX;
      dragDelta   = 0;
      velY        = 0;
      clearTimeout(resumeTimer);
      stopAutoPlay();
    };

    const onDragMove = (clientX) => {
      if (!isDragging) return;
      dragDelta  = clientX - dragStartX;
      rotY      += dragDelta * 0.25;
      dragStartX = clientX;
      setRotation(rotY);
    };

    const onDragEnd = (velocityX) => {
      isDragging = false;
      velY = velocityX * 0.12;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(springLoop);
    };

    // Mouse events
    cylinder.addEventListener('mousedown', (e) => onDragStart(e.clientX));
    window.addEventListener('mousemove',   (e) => isDragging && onDragMove(e.clientX));
    window.addEventListener('mouseup',     (e) => isDragging && onDragEnd(e.movementX));

    // Touch events
    let lastTouchX = 0;
    cylinder.addEventListener('touchstart', (e) => {
      lastTouchX = e.touches[0].clientX;
      onDragStart(lastTouchX);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - lastTouchX;
      lastTouchX = e.touches[0].clientX;
      onDragMove(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      onDragEnd(e.changedTouches[0].clientX - lastTouchX);
    });

    // ── Pause on hover ──
    const scene = document.getElementById('carousel3d-scene');
    scene.addEventListener('mouseenter', () => {
      if (isAutoPlaying) stopAutoPlay();
    });
    scene.addEventListener('mouseleave', () => {
      if (!isDragging && !overlay.classList.contains('active')) {
        startAutoPlay();
      }
    });

    // ── Close overlay → resume autoplay ──
    overlay.addEventListener('click', () => {
      overlay.classList.remove('active');
      startAutoPlay();
    });

    // ── Kick off auto-rotation ──
    startAutoPlay();
  }
});
