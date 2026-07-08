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
    const intervalTime = 1200; // Reduzido de 2000ms para 1200ms para passar mais rápido
    
    const getScrollAmount = () => {
      const firstCard = gradeGrid.querySelector('.grade-card');
      return firstCard ? firstCard.offsetWidth + 40 : 380; // card width + gap
    };

    const startAutoScroll = () => {
      stopAutoScroll();
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
});
