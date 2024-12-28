// Toggle password visibility
document.getElementById('show-password').addEventListener('change', function () {
    var passwordField = document.getElementById('password');
    var confirmPasswordField = document.getElementById('confirm-password');
    
    if (this.checked) {
        passwordField.type = 'text';
        confirmPasswordField.type = 'text';
    } else {
        passwordField.type = 'password';
        confirmPasswordField.type = 'password';
    }
});

// Handle form submission with fetch
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Prepare data to send to server
    const data = {
        username: username,
        email: email,
        password: password
    };

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            
            return response.text();  
        }
        return response.json();  
    })
    .then(data => {
        console.log(data);  
        if (typeof data === 'string') {
            
            alert('There was an error with your registration.');
            return;
        }

        try {
            if (data.success) {
                window.location.href = '/login';  
            } else {
                alert(data.message);  
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error with your registration.');
    });
});
