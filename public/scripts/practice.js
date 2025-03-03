let currentVerse, words, currentWordIndex, missingWord;

document.addEventListener('DOMContentLoaded', () => {
    const userData = getUserData();
    const select = document.getElementById('verseSelect');
    
    // Add change event listener to verse select
    select.addEventListener('change', () => {
        const selectedVerse = select.value;
        document.getElementById('displayVerse').innerHTML = selectedVerse;
        document.getElementById('startBtn').style.display = 'block';
    });

    // Populate verse select options
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
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('wordInput').style.display = 'block';
    document.getElementById('submitBtn').style.display = 'block';
    document.getElementById('helpBtn').style.display = 'block';
    nextWord();
}

function nextWord() {
    if (currentWordIndex < words.length) {
        missingWord = words[currentWordIndex];
        words[currentWordIndex] = `<span class="missing-word">_____</span>`;
        document.getElementById('displayVerse').innerHTML = words.join(' ');
        document.getElementById('wordInput').value = '';
        document.getElementById('wordInput').placeholder = `Enter word ${currentWordIndex + 1}`;
        document.getElementById('feedback').textContent = '';
    } else {
        document.getElementById('feedback').textContent = 'You have completed the verse!';
        document.getElementById('wordInput').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('helpBtn').style.display = 'none';
    }
}

function checkWord() {
    const input = document.getElementById('wordInput').value.trim();
    if (input === missingWord) {
        words[currentWordIndex] = `<span class="correct-word">${missingWord}</span>`;
        currentWordIndex++;
        document.getElementById('feedback').textContent = 'Correct!';
        nextWord();
    } else {
        document.getElementById('feedback').textContent = 'Try again!';
    }
}

function provideHelp() {
    words[currentWordIndex] = `<span class="help-word">${missingWord}</span>`;
    currentWordIndex++;
    document.getElementById('feedback').textContent = `The correct word was: ${missingWord}`;
    nextWord();
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