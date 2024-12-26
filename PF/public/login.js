// เมื่อฟอร์มล็อกอินถูกส่ง
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ

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
            console.log(result); // แสดงข้อมูลที่ส่งกลับจาก API

            // หากการล็อกอินสำเร็จ ให้เปลี่ยนเส้นทางไปที่ index.html
            window.location.href = 'index.html'; // เปลี่ยนเส้นทางไปยังหน้าหลักของผู้ใช้

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
            passwordInput.type = 'text'; // แสดงรหัสผ่าน
        } else {
            passwordInput.type = 'password'; // ซ่อนรหัสผ่าน
        }
    } else {
        console.error('Password input not found!');
    }
});
