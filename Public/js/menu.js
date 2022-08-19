const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('active', window.scrollY > 0)

})