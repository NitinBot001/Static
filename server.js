// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 8000;

app.get('/fetch-songs', async (req, res) => {
  try {
    const response = await axios.get('https://www.genyt.net');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).send('Error fetching songs');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
