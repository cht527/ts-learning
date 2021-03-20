const path = require('path');
import express from 'express';
const app = express();
const port = 3000;
app.use('/src', express.static(path.join(__dirname, '../src')));
app.set('views', path.join(__dirname, '../src'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});
// app.get('/js/rx.js', function (req, res) {
//     res.set('Content-Type', 'text/html')
//     res.send('rx.js');
// });
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
