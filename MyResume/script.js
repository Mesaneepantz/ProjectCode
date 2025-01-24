// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('a.nav-link');
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60, // Adjust for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

function toggleMenu() {
    const navbarMenu = document.getElementById('navbarMenu');
    navbarMenu.classList.toggle('show');  // เปลี่ยนสถานะการแสดงผลของเมนู
}

