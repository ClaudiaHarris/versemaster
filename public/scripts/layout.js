function initializeLayout() {
  initializeNavBar();
  initializeFooter();
}

function initializeNavBar() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const username = localStorage.getItem('username');
    navbar.innerHTML = `
      <div class="nav-content">
        <a href="main.html" class="logo">VerseMaster</a>
        <span class="username">Welcome ${username || 'Guest'}</span>
        <div class="nav-links">
          <a href="verses.html">Verses</a>
          <a href="about.html">About</a>          
          <a href="#" onclick="logout()">Logout</a>
        </div>
      </div>
    `;
  }
}

function initializeFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-content">
      <p>&copy; ${new Date().getFullYear()} VerseMaster by Claudia Harris</p>
    </div>
  `;
  document.body.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', initializeLayout);