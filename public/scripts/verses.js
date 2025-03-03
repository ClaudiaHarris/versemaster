document.addEventListener('DOMContentLoaded', () => {

  const userData = getUserData();
  const verseList = document.getElementById('verseList');

  userData.verses.forEach(v => {
    const li = document.createElement('li');
    li.textContent = `${v.book} ${v.chapter}:${v.verse} - ${v.status}`;
    verseList.appendChild(li);
  });

  const ctx = document.getElementById('verseChart').getContext('2d');
  const practicing = userData.verses.filter(v => v.status === 'practicing').length;
  const learned = userData.verses.filter(v => v.status === 'learned').length;

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Practicing', 'Learned'],
      datasets: [{ 
        data: [practicing, learned], 
        backgroundColor: ['#ff6384', '#36a2eb'] 
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 20
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: 'Arial',
              size: 14
            },
            boxWidth: 15,
            padding: 15
          }
        }
      }
    }
  });

  // Initialize the first tab as active
  showTab('add');
});

function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show the selected tab content
    document.getElementById(`${tabName}-tab`).classList.add('active');

    // Add active class to the selected tab button
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
}