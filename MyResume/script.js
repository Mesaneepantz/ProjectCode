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

// Toggle dark mode functionality
const toggleDarkMode = document.createElement('button');
toggleDarkMode.textContent = 'Toggle Dark Mode';
toggleDarkMode.classList.add('dark-mode-toggle');
document.body.appendChild(toggleDarkMode);

toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    toggleDarkMode.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});

// Preserve dark mode setting on page reload
window.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleDarkMode.textContent = 'Light Mode';
    }
});

// Skill progress bar animation
const skillBars = document.querySelectorAll('.skill-bar');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        bar.style.width = `${value}%`;
    });
}

window.addEventListener('scroll', () => {
    const skillsSection = document.getElementById('skills');
    const sectionPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        animateSkillBars();
    }
});

// Form validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const message = contactForm.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you for your message!');
        contactForm.reset();
    });
}
