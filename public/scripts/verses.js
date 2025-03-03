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
});

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
}