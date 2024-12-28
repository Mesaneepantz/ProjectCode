// เมื่อฟอร์มล็อกอินถูกส่ง
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    // ดึงค่าจาก input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        // เรียกใช้งาน API
        const response = await fetch('http://localhost:3000/login.ejs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const result = await response.json();
        if (response.ok) {
            alert('Login successful!');
            console.log(result); 
            window.location.href = 'index.html'; 
        } else {
            alert(result.error || 'Login failed!');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred. Please try again.');
    }
});

// ฟังก์ชันแสดง/ซ่อนรหัสผ่าน
document.getElementById('show-password').addEventListener('change', (event) => {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        // ตรวจสอบสถานะ Checkbox
        if (event.target.checked) {
            passwordInput.type = 'text'; 
        } else {
            passwordInput.type = 'password'; 
        }
    } else {
        console.error('Password input not found!');
    }
});

// ฟังก์ชันสำหรับลิงก์ Forgot Password
document.querySelector('.forgot-password a').addEventListener('click', (event) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า
    // ไปยังหน้า Reset Password
    window.location.href = 'reset-password.html'; 
});
