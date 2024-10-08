import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieparser from "cookie-parser";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

mongoose.connect("mongodb://localhost:27017/", {
    dbName: "Parth_Backend_2_0",
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
}, { timeStamp: true });

const User = mongoose.model("User", userSchema);

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(), './public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;
    if (token) {
        const decodedUserId = jwt.verify(token, "YUIF5CRyu6R96N4FU4865NFHDJFJKjh7nyecufn4uff");
        req.user = await User.findById(decodedUserId._id)
        req.user && next();
    } else {
        res.redirect("/login");
    }

}

app.get('/', isAuthenticated, (req, res) => {
    // 1.Sending StatusCode
    // res.sendStatus(200);

    // 2.Sending json response
    // res.json({
    //     firstName: "Parth",
    //     lastName: "Panchal",
    //     age: 19,
    //     contactNo: 7486863095,
    //     email: "parth.code2625@gmail.com",
    //     password: 'f4m3o7c56QY876NR84'
    // })

    // 3. chaining StatusCode and response
    // res.status(200).send("Hellowww! I'm Parth!");

    // 4.Sending entire file
    // const pathLocation = path.resolve();
    // let test = path.join(pathLocation, './views/index.ejs');
    // res.sendFile(test);

    // 5. Sending data and accessing in html file! We can achieve 
    // this functionality using html templates, There are so many of them available
    // but we will use 'ejs'.
    // res.render("index.ejs", {name: "Parth"});
    // console.log(req.cookies);


    // 6. TO render html, css files we can have a static folder name 'public'.
    //  To access those files we have express.static(). As this is a mtokendleware we need
    // 'use()' method.
    res.render("logout.ejs", { username: req.user.username });

});

app.get('/login', (req, res) => {
    res.render("login.ejs")
})

app.get('/register', (req, res) => {
    res.render("register.ejs")
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) return res.redirect('/register');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.render("login.ejs", { email, message: "Incorrect password" });

    const token = jwt.sign({ _id: user._id }, "YUIF5CRyu6R96N4FU4865NFHDJFJKjh7nyecufn4uff")

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 300 * 1000)
    }).status(201).redirect('/')


})

app.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.redirect('/login');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        username,
        email,
        password: hashedPassword,
    })

    const token = jwt.sign({ _id: user._id }, "YUIF5CRyu6R96N4FU4865NFHDJFJKjh7nyecufn4uff")
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 300 * 1000)
    }).status(201).redirect('/')

})

app.get("/logout", (req, res) => {

    res.cookie("token", null, {
        expires: new Date(Date.now())
    });

    res.redirect('/')
})

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
})