import express from 'express';
import path from 'path';

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(), './public')));
app.use(express.urlencoded({ extended: true }));

let users = [];

app.get('', (req, res) => {
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
    res.render("index.ejs");

    // 6. TO render html, css files we can have a static folder name 'public'.
    //  To access those files we have express.static(). As this is a middleware we need
    // 'use()' method.

});

app.get("/success", (req, res) => {
    res.render("success.ejs");
})

app.get("/users", (req, res) => {
    res.json({
        users,
    })
})

app.post('/contact', (req, res) => {
    users.push({ userName: req.body.name, email: req.body.email });
    res.redirect("/success");
})

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
})