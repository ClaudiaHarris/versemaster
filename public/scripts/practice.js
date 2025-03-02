let currentVerse, words, currentWordIndex;

document.addEventListener('DOMContentLoaded', () => {
    const userData = getUserData();
    const select = document.getElementById('verseSelect');
    
    // Add change event listener to verse select
    select.addEventListener('change', () => {
        const selectedVerse = select.value;
        document.getElementById('displayVerse').textContent = selectedVerse;
        document.getElementById('startBtn').style.display = 'block';
        document.getElementById('deleteBtn').style.display = 'block';
        document.getElementById('readyBtn').style.display = 'none';
        document.getElementById('wordInput').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'none';
    });

    // Populate verse select options
    userData.verses.filter(v => v.status === 'practicing').forEach(v => {
        const option = document.createElement('option');
        option.value = v.text;
        option.textContent = `${v.book} ${v.chapter}:${v.verse}`;
        option.dataset.reference = JSON.stringify({ book: v.book, chapter: v.chapter, verse: v.verse });
        select.appendChild(option);
    });
});

function startPractice() {
  const select = document.getElementById('verseSelect');
  currentVerse = select.value;
  words = currentVerse.split(' ');
  currentWordIndex = 0;
  document.getElementById('startBtn').style.display = 'none';
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

function deleteVerse() {
    const select = document.getElementById('verseSelect');
    const selectedOption = select.selectedOptions[0];
    
    if (!selectedOption.value) {
        alert('Please select a verse to delete');
        return;
    }

    if (confirm('Are you sure you want to delete this verse?')) {
        const reference = JSON.parse(selectedOption.dataset.reference);
        const userData = getUserData();
        
        // Find and remove the verse
        userData.verses = userData.verses.filter(v => 
            !(v.book === reference.book && 
              v.chapter === reference.chapter && 
              v.verse === reference.verse)
        );
        
        // Save updated data
        saveUserData(userData);
        
        // Remove from select and reset display
        select.remove(select.selectedIndex);
        document.getElementById('displayVerse').textContent = '';
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('deleteBtn').style.display = 'none';
    }
}