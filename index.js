const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS"); // Allow the specified methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Endpoint to handle incoming data
app.post('/submit', (req, res) => {
    const { name, email, mobile } = req.body;

    if (!name || !email || !mobile) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        try {
            let jsonData = [];

            if (data) {
                jsonData = JSON.parse(data);
            }

            const newData = { name, email, mobile };
            jsonData.push(newData);

            fs.writeFile('data.json', JSON.stringify(jsonData), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                console.log('Data saved:', newData);
                res.status(200).json({ message: 'Data saved successfully' });
            });
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
