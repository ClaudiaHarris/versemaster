document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('navbar').innerHTML = `
    <a href="main.html">Home</a>
    <a href="verses.html">Verses</a>
    <a href="about.html">About</a>
  `;
});

function getUserData() {
  return JSON.parse(localStorage.getItem('userData')) || { points: 0, verses: [] };
}

function saveUserData(data) {
  localStorage.setItem('userData', JSON.stringify(data));
}
