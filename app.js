const express = require('express');
const fetch = require('isomorphic-fetch');

const app = express();
app.use(express.json());

app.post('/check-balance', async (req, res) => {
    const walletAddress = req.body.walletAddress;

    // Make the API request to CryptoAPIs
    var apiUrl = "https://api.cryptoapis.io/v1/blockchain-data/{blockchain}/{network}/addresses/{address}/balance";
    const response = await fetch(apiUrl, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': '4a831277f741a587fa7b9faef9d9ac6dfd8ed85d'
        }
    });
    const data = await response.json();

    // Process the response and send it back to the client
    if (response.ok) {
        const balance = data.data.item.confirmedBalance.amount;
        const unit = data.data.item.confirmedBalance.unit;
        res.status(200).json({ balance, unit });
    } else {
        res.status(response.status).json({ error: 'Error retrieving balance' });
    }
});

const port = 5500; // Choose the port number that you prefer
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
