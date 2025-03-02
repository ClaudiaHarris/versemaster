let currentVerse, words, currentWordIndex;

document.addEventListener('DOMContentLoaded', () => {
  const userData = getUserData();
  const select = document.getElementById('verseSelect');
  userData.verses.filter(v => v.status === 'practicing').forEach(v => {
    const option = document.createElement('option');
    option.value = v.text;
    option.textContent = `${v.book} ${v.chapter}:${v.verse}`;
    select.appendChild(option);
  });
});

function startPractice() {
  const select = document.getElementById('verseSelect');
  currentVerse = select.value;
  words = currentVerse.split(' ');
  currentWordIndex = 0;
  document.getElementById('displayVerse').textContent = currentVerse;
  document.getElementById('readyBtn').style.display = 'none';
  document.getElementById('wordInput').style.display = 'block';
  document.getElementById('submitBtn').style.display = 'block';
  nextWord();
}

function nextWord() {
  if (currentWordIndex >= words.length) {
    const userData = getUserData();
    userData.points += 10;
    userData.verses.find(v => v.text === currentVerse).status = 'learned';
    saveUserData(userData);
    alert('Verse completed! +10 points');
    location.href = 'main.html';
    return;
  }
  const display = words.map((w, i) => i === currentWordIndex ? '____' : w).join(' ');
  document.getElementById('displayVerse').textContent = display;
  document.getElementById('wordInput').value = '';
  document.getElementById('nextBtn').style.display = 'none';
}

function checkWord() {
  const input = document.getElementById('wordInput').value;
  const feedback = document.getElementById('feedback');
  if (!input) return feedback.textContent = 'Enter a word';
  if (input === words[currentWordIndex]) {
    feedback.textContent = 'Correct!';
    currentWordIndex++;
    document.getElementById('nextBtn').style.display = 'block';
  } else {
    feedback.textContent = 'Try again';
  }
}