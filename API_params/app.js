import express from 'express';
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/", {
    dbName: "API_Params",
})
    .then(() => {
        console.log("Database connected!");
    })
    .catch((err) => {
        console.log("DB connection Error: : " + err);
    })

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const app = express();

const PORT = 3000;

app.use(express.json());

// Empty route GET API
app.get('/', (req, res) => {
    res.send("Server is running!");
});

// Data creating POST API
app.post('/users/new', async (req, res) => {

    const { username, email, password } = req.body;

    await User.create({
        username,
        email,
        password,
    })

    res.json({
        success: true,
        message: 'SignUp successfully',
    });
})

// Data retrieval GET API
app.get('/users/all', async (req, res) => {

    // Fetching Parameters from URL
    // const ulrParametersObject = req.query;
    // console.log(ulrParametersObject);

    const userScope = await User.find({});

    res.json({
        success: true,
        userScope,
    })
});

// Static route with same previous path
app.get('/userid/special', (req, res) => {
    res.json({
        success: true,
        message: "Static route called!",
    })
})

// Dynamic route to fetch parameters from url
app.get('/userid/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
        success: true,
        user,
    })
})

app.listen(PORT, (req, res) => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});