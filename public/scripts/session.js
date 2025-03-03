function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

function setLoggedIn(username) {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('username', username);
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  window.location.href = 'login.html';
}

function checkAuth() {
  if (!isLoggedIn()) {
      window.location.href = 'login.html';
  }
}