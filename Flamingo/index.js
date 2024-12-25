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
