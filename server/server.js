const express = require('express');
const app = express();
const PORT = 3000;
const PASSWORD = 'faith123'; // Hardcoded password

app.use(express.json());
app.use(express.static('../public')); // Serve static files

// Login endpoint
app.post('/login', (req, res) => {
  if (req.body.password === PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false, error: 'Invalid password' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));