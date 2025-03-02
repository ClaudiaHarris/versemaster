function login() {
  const password = document.getElementById('password').value;
  if (!password) return alert('Password required');
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      location.href = 'main.html';
    } else {
      alert(data.error);
    }
  })
  .catch(() => alert('Server unavailable'));
}