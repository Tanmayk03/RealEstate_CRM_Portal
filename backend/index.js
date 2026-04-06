const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')
require('dotenv').config();

if (!process.env.JWT_SECRET) {
    console.warn('WARNING: JWT_SECRET is missing in .env — login/signup will fail until you set it.');
}

require('./Models/db');


const PORT = process.env.PORT || 8088;
app.get('/', (req, res) => {
    res.send('Hello World!');
});

/** Quick check: open http://127.0.0.1:PORT/health in the browser */
app.get('/health', (req, res) => {
    res.json({ ok: true, port: PORT });
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter );
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://127.0.0.1:${PORT} (and http://localhost:${PORT})`);
});