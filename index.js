const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Crime Data API');
});

app.get('/crimes', (req, res) => {
    const { area_name, month, year } = req.query;

    if (!area_name || !month || !year) {
        return res.status(400).send('Please provide area_name, month, and year');
    }

    const results = [];

    fs.createReadStream('data/crimes.csv')
        .pipe(csv())
        .on('data', (data) => {
            if (data.area_name.includes(area_name) && data.date_occ_year == year && data.date_occ_month == month) {
                results.push({
                    lat: data.lat,
                    lon: data.lon,
                    crime_type: data.crm_cd_desc
                });
            }
        })
        .on('end', () => {
            res.json(results);
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});