import fetch from 'node-fetch';

fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        date: '2024-12-06',
        time: '15:00',
        lat: 34.0522,
        lon: -118.2437
    }),
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));