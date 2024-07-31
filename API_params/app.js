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

app.get('/', (req, res) => {
    res.send("Server is running!");
});

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

app.get('/users/all', async (req, res) => {

    const userScope = await User.find({});

    res.json({
        success: true,
        userScope,
    })
});

app.listen(PORT, (req, res) => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});