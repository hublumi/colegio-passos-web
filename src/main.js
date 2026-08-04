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

  // Animação SVG Entrelaçada por Scroll para Proposta Pedagógica
  const propostaSection = document.getElementById('proposta');
  const desktopPath = document.querySelector('.proposta-line.desktop-only path');
  const mobilePath = document.querySelector('.proposta-line.mobile-only path');

  if (propostaSection) {
    const updateLines = () => {
      const rect = propostaSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Começa a desenhar quando o topo da seção estiver 15% visível de baixo para cima
      const startTrigger = viewportHeight * 0.85;
      // Termina de desenhar quando o fundo da seção estiver quase saindo da tela pelo topo (85% do scroll da seção)
      const endTrigger = viewportHeight * 0.15;
      
      const totalDistance = (startTrigger - endTrigger) + rect.height;
      let progress = (startTrigger - rect.top) / totalDistance;
      
      progress = Math.min(Math.max(progress, 0), 1);
      
      if (desktopPath && window.innerWidth > 768) {
        // Usa clip-path para desenhar a linha da esquerda (100%) para a direita (0%)
        desktopPath.parentNode.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
      }
      if (mobilePath && window.innerWidth <= 768) {
        // Usa clip-path para desenhar a linha de cima (100%) para baixo (0%)
        mobilePath.parentNode.style.clipPath = `inset(0 0 ${100 - progress * 100}% 0)`;
      }
    };

    window.addEventListener('scroll', updateLines, { passive: true });
    window.addEventListener('resize', updateLines, { passive: true });
    setTimeout(updateLines, 100); // Initial check
  }

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

  // ── FAQ Accordion ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    // Garante que iniciem recolhidas via JavaScript (imunidade a cache de CSS antigo)
    answer.style.overflow = 'hidden';
    answer.style.maxHeight = '0px';
    answer.style.opacity = '0';

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        const ans = i.querySelector('.faq-answer');
        if (ans) {
          ans.style.maxHeight = '0px';
          ans.style.opacity = '0';
        }
      });
      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = '500px';
        answer.style.opacity = '1';
      }
    });
  });

  // ── Formulário de Contato e Integração Supabase ──
  const contactForm = document.getElementById('public-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('lead_name').value;
      const phone = document.getElementById('lead_phone').value;
      const email = document.getElementById('lead_email').value;
      const segment = document.getElementById('lead_segment').value;
      const message = document.getElementById('lead_message').value;

      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.style.color = 'var(--text-body)';
        formFeedback.textContent = 'Enviando sua mensagem...';
      }

      const supabaseUrl = 'https://gteomtbdgqppuwozcvnw.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZW9tdGJkZ3FwcHV3b3pjdm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwOTE1NjUsImV4cCI6MjA5OTY2NzU2NX0.HOYbrd4fPQnUdpTUEjDLc4EmIvqKl8QwHK7I1liQ1aw';

      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            segment,
            message,
            status: 'novo',
            contacted: false
          })
        });

        if (!response.ok) {
          throw new Error('Falha no envio dos dados');
        }

        if (formFeedback) {
          formFeedback.style.color = '#10b981';
          formFeedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        }
        contactForm.reset();
      } catch (err) {
        console.error(err);
        if (formFeedback) {
          formFeedback.style.color = '#ef4444';
          formFeedback.textContent = 'Ocorreu um erro ao enviar. Por favor, tente novamente.';
        }
      }
    });
  }

  // ── Dynamic Blog Loader and Toggle ────────────────────────────────────────
  const blogGrid = document.getElementById('blog-grid');
  const showAllContainer = document.getElementById('blog-show-all-container');
  const btnShowAll = document.getElementById('btn-show-all-blogs');

  if (blogGrid) {
    const supabaseUrl = 'https://gteomtbdgqppuwozcvnw.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZW9tdGJkZ3FwcHV3b3pjdm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwOTE1NjUsImV4cCI6MjA5OTY2NzU2NX0.HOYbrd4fPQnUdpTUEjDLc4EmIvqKl8QwHK7I1liQ1aw';

    async function loadBlogsFromDatabase() {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/blog_posts?order=created_at.desc&select=*`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });

        if (!response.ok) throw new Error('Falha ao buscar posts do blog');

        const posts = await response.json();
        if (posts.length > 0) {
          blogGrid.innerHTML = ''; // Limpa cards estáticos fallback
          
          posts.forEach((post, index) => {
            const card = document.createElement('article');
            card.className = 'blog-card';
            card.style.display = index >= 3 ? 'none' : 'block';
            card.setAttribute('data-index', index);

            // Determina URL
            let linkUrl = `blog-post.html?slug=${post.slug}`;
            if (post.slug === 'blog-leitura' || post.slug === 'a-importancia-da-leitura-na-infancia') {
              linkUrl = 'blog-leitura.html';
            } else if (post.slug === 'blog-telas' || post.slug === 'o-limite-das-telas-no-cotidiano-escolar') {
              linkUrl = 'blog-telas.html';
            } else if (post.slug === 'blog-protagonismo' || post.slug === 'protagonismo-infantil-na-educacao') {
              linkUrl = 'blog-protagonismo.html';
            }

            const dateStr = post.created_at ? new Date(post.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }) : '';

            card.innerHTML = `
              <img src="${post.image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'}" alt="${post.image_alt || post.title}" class="blog-image" />
              <div class="blog-content">
                <div class="blog-meta">Por: ${post.author || 'Coordenação Pedagógica'} • ${dateStr}</div>
                <h3>${post.title}</h3>
                <p>${post.summary || ''}</p>
                <a href="${linkUrl}" style="color: var(--primary-color); font-weight: bold; text-decoration: none;">Ler mais &rarr;</a>
              </div>
            `;
            blogGrid.appendChild(card);
          });

          // Se tiver mais de 3, exibe o botão "Ver todos"
          if (posts.length > 3 && showAllContainer) {
            showAllContainer.style.display = 'block';
          }
        }
      } catch (err) {
        console.warn('Usando posts estáticos do HTML como fallback:', err);
      }
    }

    if (btnShowAll) {
      btnShowAll.addEventListener('click', () => {
        const hiddenCards = blogGrid.querySelectorAll('article[style*="display: none"]');
        hiddenCards.forEach(card => {
          card.style.display = 'block';
        });
        showAllContainer.style.display = 'none'; // Esconde o botão após expandir
      });
    }

    loadBlogsFromDatabase();
  }
});

