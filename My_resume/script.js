// เพิ่มฟังก์ชันเลื่อนแบบ Smooth ไปยัง Section
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Scroll แบบ Smooth
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
