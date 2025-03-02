// Replace with your actual api.bible key
const API_KEY = 'cd7f1e33bf6628bd6df94eecccd60500';
const BIBLE_ID = 'de4e12af7f28f599-01'; // ESV Bible (English)

// Map common book names to API abbreviations (partial list, expand as needed)
const bookMap = {
  'genesis': 'GEN',
  'exodus': 'EXO',
  'leviticus': 'LEV',
  'numbers': 'NUM',
  'deuteronomy': 'DEU',
  'joshua': 'JOS',
  'judges': 'JDG',
  'ruth': 'RUT',
  'matthew': 'MAT',
  'mark': 'MRK',
  'luke': 'LUK',
  'john': 'JHN',
  'acts': 'ACT',
  'romans': 'ROM',
  '1 corinthians': '1CO',
  '2 corinthians': '2CO',
  'galatians': 'GAL',
  'ephesians': 'EPH',
  'philippians': 'PHP',
  'colossians': 'COL',
  '1 thessalonians': '1TH',
  '2 thessalonians': '2TH',
  '1 timothy': '1TI',
  '2 timothy': '2TI',
  'titus': 'TIT',
  'philemon': 'PHM',
  'hebrews': 'HEB',
  'james': 'JAS',
  '1 peter': '1PE',
  '2 peter': '2PE',
  '1 john': '1JN',
  '2 john': '2JN',
  '3 john': '3JN',
  'jude': 'JUD',
  'revelation': 'REV'
  // Add more as needed (full list: https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books)
};

function lookupVerse() {
  const book = document.getElementById('book').value.trim().toLowerCase();
  const chapter = document.getElementById('chapter').value.trim();
  let verse = document.getElementById('verse').value.trim();

  if (!book || !chapter || !verse) {
    alert('Please fill in Book, Chapter, and Verse');
    return;
  }

  // Convert book name to API abbreviation
  const bookAbbr = bookMap[book] || book.toUpperCase(); // Fallback to uppercase if not mapped

  // Parse verse range (e.g., "1-2" or "1")
  let startVerse, endVerse;
  if (verse.includes('-')) {
    const [start, end] = verse.split('-').map(v => v.trim());
    startVerse = start;
    endVerse = end;
  } else {
    startVerse = verse;
    endVerse = verse; // Single verse case
  }

  // Validate verse numbers
  if (!startVerse || (endVerse && isNaN(endVerse)) || isNaN(startVerse)) {
    alert('Invalid verse format. Use "1" or "1-2".');
    return;
  }

  // Construct passage ID (e.g., "MAT.8.1-MAT.8.2")
  const passageId = `${bookAbbr}.${chapter}.${startVerse}${endVerse !== startVerse ? `-${bookAbbr}.${chapter}.${endVerse}` : ''}`;

  fetch(`https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/passages/${passageId}`, {
    headers: { 'api-key': API_KEY }
  })
  .then(res => {
    if (!res.ok) throw new Error('Passage not found or API error');
    return res.json();
  })
  .then(data => {
    // Remove HTML tags and verse numbers
    let verseText = data.data.content;
    // Step 1: Remove verse numbers in brackets (e.g., [1], [2])
    verseText = verseText.replace(/\[.*?\]/g, '');
    // Step 2: Remove all HTML tags, leaving only text
    verseText = verseText.replace(/<[^>]+>/g, '').trim();
    // Step 3: Normalize whitespace (optional, removes extra spaces/newlines)
    verseText = verseText.replace(/\s+/g, ' ');
    verseText = verseText.replace(/¶/g, '');
    
    document.getElementById('text').value = verseText;
  })
  .catch(err => {
    console.error(err);
    alert('Could not find the passage. Check the reference or enter it manually.');
  });
}

function addVerse() {
  const book = document.getElementById('book').value;
  const chapter = document.getElementById('chapter').value;
  const verse = document.getElementById('verse').value;
  const text = document.getElementById('text').value;
  if (!book || !chapter || !verse || !text) return alert('All fields required');
  const userData = getUserData();
  userData.verses.push({ book, chapter, verse, text, status: 'practicing' });
  saveUserData(userData);
  location.href = 'verses.html';
}