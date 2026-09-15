import './style.css'
import './landing.css'

document.addEventListener('DOMContentLoaded', () => {
  // Enquanto as páginas institucionais da fase 2 não forem publicadas,
  // mantemos a navegação útil levando às respectivas seções da Home.
  const homeFallbacks = {
    '/quem-somos/': '/#historia',
    '/proposta-pedagogica/': '/#proposta',
    '/infraestrutura/': '/#infraestrutura',
    '/atividades-extracurriculares/': '/#grade',
    '/contato/': '/#contato',
  }
  document.querySelectorAll('a[href]').forEach((link) => {
    const target = homeFallbacks[link.getAttribute('href')]
    if (target) link.setAttribute('href', target)
  })

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item')
      const isOpen = item.classList.contains('open')
      item.parentElement.querySelectorAll('.faq-item').forEach((other) => {
        other.classList.remove('open')
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false')
      })
      if (!isOpen) {
        item.classList.add('open')
        button.setAttribute('aria-expanded', 'true')
      }
    })
  })

  const toggle = document.querySelector('.mobile-menu-toggle')
  const menu = document.querySelector('.landing-nav ul')
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true'
      toggle.setAttribute('aria-expanded', String(!expanded))
      menu.classList.toggle('active', !expanded)
    })
  }

  const enrollmentForm = document.getElementById('enrollment-form')
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const data = new FormData(enrollmentForm)
      const message = `Olá! Quero agendar uma visita ao Colégio Passos.\n\nResponsável: ${data.get('responsavel')}\nAluno(a): ${data.get('aluno')}\nIdade: ${data.get('idade')}\nSérie desejada: ${data.get('serie')}\nTelefone: ${data.get('telefone')}\nE-mail: ${data.get('email')}\nMelhor horário: ${data.get('horario')}`
      window.open(`https://wa.me/5511974685979?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
    })
  }
})
