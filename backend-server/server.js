const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const token = process.env.GITHUB_TOKEN;

app.get('/repos', async (req, res) => {
    try {
        const response = await axios.get(`https://api.github.com/users/nanadotam/repos`, {
            headers: { Authorization: `token ${token}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching repos', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
