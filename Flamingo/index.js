document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    const popupClose = document.getElementById("popup-close");

    // ฟังก์ชันตรวจสอบข้อมูลและแสดง Popup
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

        return null; // ถ้าไม่มีข้อผิดพลาด
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ

        const errorMessage = validateForm();
        if (errorMessage) {
            showPopup(errorMessage);
            return;
        }

        showPopup("ได้รับข้อมูลแล้ว โปรดรอการติดต่อกลับทางอีเมล");
        form.reset(); // ล้างข้อมูลในฟอร์ม
    });

    popupClose.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    // ฟังก์ชันแสดง Popup
    function showPopup(message) {
        popupMessage.textContent = message;
        popup.classList.remove("hidden");
    }
});
