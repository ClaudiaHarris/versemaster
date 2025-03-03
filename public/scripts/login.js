function createAccount(event) {
    event.preventDefault();
    
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
        alert('Username already taken');
        return false;
    }

    // Save new user
    users[username] = { password };
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set session
    setLoggedIn(username);
    alert('New account created!');
    window.location.href = 'main.html';
    return false;
}

function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Check credentials
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]?.password === password) {
        setLoggedIn(username);
        window.location.href = 'main.html';
    } else {
        alert('Invalid username or password');
    }
    return false;
}

// Redirect if already logged in
if (isLoggedIn()) {
    window.location.href = 'main.html';
}