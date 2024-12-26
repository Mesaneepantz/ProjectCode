document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // ป้องกันการ reload หน้า

    // ดึงค่าจากฟอร์ม
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // ตรวจสอบข้อมูลที่กรอก
    if (!name || !email || !message) {
        alert("โปรดกรอกข้อมูลให้ครบถ้วน");
        return;
    }

    // กำหนดค่าต่าง ๆ สำหรับการส่งอีเมล
    const serviceID = "service_b92zg9v"; 
    const templateID = "template_rpv35nw";

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
    };

    try {
        // ตรวจสอบว่า publicKey ถูกตั้งค่าใน EmailJS หรือไม่
        if (!emailjs) {
            console.error("EmailJS ไม่ได้ถูกติดตั้งหรือโหลดสำเร็จ");
            alert("ไม่สามารถเชื่อมต่อกับระบบส่งอีเมลได้");
            return;
        }

        // ใช้ EmailJS ส่งอีเมล
        await emailjs.send(serviceID, templateID, templateParams);

        alert("ส่งข้อความสำเร็จ! เราจะติดต่อกลับในไม่ช้า");
        document.querySelector("form").reset(); // ล้างข้อมูลฟอร์ม

    } catch (error) {
        console.error("Error sending email:", error);
        alert("เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองใหม่อีกครั้ง");
    }
});
function toggleMenu() {
    const navbarNav = document.getElementById('navbarNav');
    navbarNav.classList.toggle('show');
}