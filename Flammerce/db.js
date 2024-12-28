const mysql = require('mysql2');

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const connection = mysql.createConnection({
  host: '127.0.0.1',       
  user: 'root',            
  password: '',            
  database: 'user_registration' 
});

// ทดสอบการเชื่อมต่อ
connection.connect((err) => {
  if (err) {
    console.error('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล:', err);
    return;
  }
  console.log('เชื่อมต่อฐานข้อมูลสำเร็จ');
});
