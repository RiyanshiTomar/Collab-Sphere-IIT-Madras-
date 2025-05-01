
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => form.classList.remove('active'));
            document.getElementById(`${tab}-form`).classList.add('active');
        });
    });
    
    // Form validation and submission
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simple validation
            if (!email || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Here you would typically make an AJAX call to your backend
            // For demo purposes, we'll simulate a successful login
            showMessage('Login successful! Redirecting...', 'success');
            
            // Redirect after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            const skills = document.getElementById('signup-skills').value;
            
            // Validation
            if (!name || !email || !password || !confirm) {
                showMessage('Please fill in all required fields', 'error');
                return;
            }
            
            if (password !== confirm) {
                showMessage('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                showMessage('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Here you would typically make an AJAX call to your backend
            // For demo purposes, we'll simulate a successful signup
            showMessage('Account created successfully!', 'success');
            
            // Clear form
            signupForm.reset();
            
            // Switch to login tab
            document.querySelector('.tab-btn[data-tab="login"]').click();
        });
    }
    
    // Show message function
    function showMessage(message, type) {
        // Remove any existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Insert message
        const activeForm = document.querySelector('.auth-form.active');
        activeForm.insertBefore(messageElement, activeForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    // Create additional background circles (same as main page)
    const bgAnimation = document.querySelector('.bg-animation');
    for (let i = 0; i < 5; i++) {
        const circle = document.createElement('div');
        circle.classList.add('bg-circle');
        const size = Math.random() * 300 + 100;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${posX}%`;
        circle.style.top = `${posY}%`;
        circle.style.animationDelay = `${delay}s`;
        bgAnimation.appendChild(circle);
    }
});