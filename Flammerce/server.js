require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const cors = require('cors');
const emailjs = require('emailjs-com');
const crypto = require('crypto');

// Initialize express app
const app = express();
const port = 3000;

// Middleware setup
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SECRET || 'my_super_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'user_registration',
  connectTimeout: 10000,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err.message);
    return;
  }
  console.log('Connected to MySQL Database!');
});

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register', { message: req.flash('message') });
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    req.flash('message', 'All fields are required!');
    return res.redirect('/register');
  }

  try {
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error checking email:', err);
        req.flash('message', 'Error checking email!');
        return res.redirect('/register');
      }

      if (results.length > 0) {
        req.flash('message', 'Email already in use');
        return res.redirect('/register');
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          req.flash('message', 'Error registering user!');
          return res.redirect('/register');
        }

        res.status(200).json({
          success: true,
          message: 'Registration successful!',
          data: { username, email },
        });
      });
    });
  } catch (error) {
    console.error('Error in /register:', error);
    req.flash('message', 'Internal Server Error');
    res.redirect('/register');
  }
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      req.flash('message', 'Invalid email or password!');
      return res.redirect('/login');
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.userId = user.id;
      res.status(200).json({
        success: true,
        message: 'Login successful!',
        redirect: '/',
      });
    } else {
      req.flash('message', 'Invalid email or password!');
      res.status(401).json({
        success: false,
        error: 'Invalid email or password!',
      });
    }
  });
});

// Secrets route
app.get('/secrets', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render('secrets');
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Reset Password route
app.post('/reset-password', (req, res) => {
  const { email } = req.body;

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      req.flash('message', 'Error checking email!');
      return res.redirect('/reset-password');
    }

    if (results.length === 0) {
      req.flash('message', 'Email not found');
      return res.redirect('/reset-password');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);

    const updateQuery = 'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?';
    db.query(updateQuery, [resetToken, resetTokenExpiry, email], (err, result) => {
      if (err) {
        console.error('Error updating reset token:', err);
        req.flash('message', 'Error updating reset token!');
        return res.redirect('/reset-password');
      }

      sendResetLink(email, resetToken);
      res.status(200).json({
        success: true,
        message: 'Password reset link has been sent to your email.',
      });
    });
  });
});

// Send reset link via EmailJS
function sendResetLink(email, resetToken) {
  const resetLink = `https://yourdomain.com/reset-password/${resetToken}`;
  const templateParams = {
    to_email: email,
    subject: 'Reset Password',
    text: `We received a request to reset your password. Please click the link below to reset your password:\n\n${resetLink}\n\nIf you didn't request this, please ignore this email.`,
  };

  emailjs
    .send(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, templateParams, process.env.EMAIL_USER)
    .then((response) => {
      console.log('Password reset email sent:', response.text);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
