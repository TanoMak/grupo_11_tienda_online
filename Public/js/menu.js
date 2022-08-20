// FIXED NAVBAR

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('active', window.scrollY > 0)

}) 

// SIDEBAR DEL NAVBAR

const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', () => {
   document.getElementById('sidebar').classList.toggle('active');
})

console.log()

