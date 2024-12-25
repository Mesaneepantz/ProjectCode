document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    const popupClose = document.getElementById("popup-close");

    /**
     * Validate the form inputs.
     * @returns {string|null} An error message if validation fails, otherwise null.
     */
    const validateForm = () => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            return "โปรดกรอกข้อมูลให้ครบถ้วน";
        }

        if (!email.endsWith("@gmail.com")) {
            return "โปรดกรอกอีเมลที่มี @gmail.com";
        }

        return null; // No errors
    };

    /**
     * Show the popup with a specified message.
     * @param {string} message - The message to display in the popup.
     */
    const showPopup = (message) => {
        popupMessage.textContent = message;
        popup.classList.remove("hidden");
    };

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page refresh

        const errorMessage = validateForm();
        if (errorMessage) {
            showPopup(errorMessage);
            return;
        }

        showPopup("ได้รับข้อมูลแล้ว โปรดรอการติดต่อกลับทางอีเมล");
        form.reset(); // Clear the form inputs
    });

    // Close the popup when the close button is clicked
    popupClose.addEventListener("click", () => {
        popup.classList.add("hidden");
    });
    
});
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
