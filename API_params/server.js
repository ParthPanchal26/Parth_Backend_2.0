import { app } from './app.js';
import { connectDB } from './config/database.config.js';

connectDB();

const PORT = process.env.PORT;

// Empty route GET API
app.get('/', (req, res) => {
    res.send("Server is running!");
});

app.listen(PORT, (req, res) => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});