const emailjs = require('emailjs'); // ใช้ emailjs สำหรับฝั่ง server

// สร้าง client สำหรับส่งอีเมล
const emailClient = emailjs.server.connect({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: 'smtp.gmail.com',
  ssl: true,
});

function sendResetLink(email, resetToken) {
  const resetLink = `https://yourdomain.com/reset-password/${resetToken}`;

  const message = {
    text: `We received a request to reset your password. Please click the link below to reset your password:\n\n${resetLink}\n\nIf you didn't request this, please ignore this email.`,
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Password',
  };

  // ส่งอีเมลผ่าน emailjs
  emailClient.send(message, function (err, message) {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Password reset email sent:', message);
    }
  });
}
