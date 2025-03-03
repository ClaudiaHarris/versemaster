const API_KEY = 'cd7f1e33bf6628bd6df94eecccd60500';
const BIBLE_ID = 'de4e12af7f28f599-01'; // ESV Bible 

const bookMap = {
  'genesis': 'GEN',
  'exodus': 'EXO',
  'leviticus': 'LEV',
  'numbers': 'NUM',
  'deuteronomy': 'DEU',
  'joshua': 'JOS',
  'judges': 'JDG',
  'ruth': 'RUT',
  '1 samuel': '1SA',
  '2 samuel': '2SA',
  '1 kings': '1KI',
  '2 kings': '2KI',
  '1 chronicles': '1CH',
  '2 chronicles': '2CH',
  'ezra': 'EZR',
  'nehemiah': 'NEH',
  'esther': 'EST',
  'job': 'JOB',
  'psalms': 'PSA',
  'proverbs': 'PRO',
  'ecclesiastes': 'ECC',
  'song of solomon': 'SNG',
  'isaiah': 'ISA',
  'jeremiah': 'JER',
  'lamentations': 'LAM',
  'ezekiel': 'EZK',
  'daniel': 'DAN',
  'hosea': 'HOS',
  'joel': 'JOL',
  'amos': 'AMO',
  'obadiah': 'OBA',
  'jonah': 'JON',
  'micah': 'MIC',
  'nahum': 'NAM',
  'habakkuk': 'HAB',
  'zephaniah': 'ZEP',
  'haggai': 'HAG',
  'zechariah': 'ZEC',
  'malachi': 'MAL',
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
  const bookAbbr = bookMap[book] || book.toUpperCase(); // Fallback if not in map

  // Handle verse ranges (e.g., "1-2" becomes "ROM.1.1-ROM.1.2")
  let passageId;
  if (verse.includes('-')) {
    const [startVerse, endVerse] = verse.split('-').map(v => v.trim());
    if (!startVerse || !endVerse) {
      alert('Invalid verse range. Use format "1-2".');
      return;
    }
    passageId = `${bookAbbr}.${chapter}.${startVerse}-${bookAbbr}.${chapter}.${endVerse}`;
  } else {
    passageId = `${bookAbbr}.${chapter}.${verse}`;
  }

  fetch(`https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/passages/${passageId}`, {
    headers: { 'api-key': API_KEY }
  })
  .then(res => {
    if (!res.ok) throw new Error('Passage not found');
    return res.json();
  })
  .then(data => {
    if (!data.data || !data.data.content) throw new Error('Invalid response data');
    let verseText = data.data.content;
    verseText = verseText.replace(/\[.*?\]/g, ''); // Remove verse numbers
    verseText = verseText.replace(/<[^>]+>/g, '').trim(); // Remove HTML tags
    verseText = verseText.replace(/\s+/g, ' '); // Normalize whitespace
    verseText = verseText.replace(/¶/g, ''); // Remove pilcrow
    
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
  alert('Verse added!');
  location.href = 'verses.html';
}