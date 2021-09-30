const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote});
})

app.get('/api/quotes', (req, res, next) => {
    if (!req.query.person) {
        console.log('ok')
        res.send({ quotes: quotes });
    }
    const foundQuotes = quotes.filter(quote => quote.person === req.query.person);
    res.send({ quotes: foundQuotes });
})

app.post('/api/quotes', (req, res, next) => {
    if (!req.query.hasOwnProperty('quote') || !req.query.hasOwnProperty('person')) {
        res.status(400).send('Query string not completed')
    }
    quotes.push(req.query);
    res.send({ quote: req.query });
})

