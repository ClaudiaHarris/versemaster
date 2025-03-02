document.addEventListener('DOMContentLoaded', () => {
  const userData = getUserData();
  document.getElementById('points').textContent = userData.points;
});