const axios = require('axios');

exports.handler = async function (event, context) {
    const token = process.env.GITHUB_TOKEN;
    const username = 'nanadotam';

    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${token}`
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching repositories', error: error.message })
        };
    }
};
