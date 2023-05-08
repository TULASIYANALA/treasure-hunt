const e = require("express");
const express = require("express");
const math = require("mathjs");
const app = express();
const port = 3001;

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./key.json");
initializeApp({
    credential: cert(serviceAccount),
});
const db = getFirestore();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("WELCOME TO TRESURE HUNT");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});




app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/signupnav", (req, res) => {
    res.render("signup");
})
app.get("/signupsubmit", (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    const phone = req.query.phone;
    const password = req.query.password;
    db.collection("Users").add({
        Name: name,
        Email: email,
        PhoneNumber: phone,
        Password: password,
    }).then(() => {
        res.render("login");
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/loginnav", (req, res) => {
    res.render("login");
})
app.get("/loginsubmit", (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    db.collection("Users")
        .where("Email", "==", email)
        .where("Password", "==", password)
        .get()
        .then((docs) => {
            if (docs.size > 0) {
                res.render("gamepage");
            } else {
                res.render("signup");
            }
        });
});
app.get("/gamepage", (req, res) => {
    res.render("hint11");
});

app.get("/hint11", (req, res) => {
    res.render("hint2");
});
app.get("/hint2", (req, res) => {
    res.render("hint3");
});
app.get("/hint3", (req, res) => {
    res.render("hint4");
});
app.get("/hint4", (req, res) => {
    res.render("hint5");
});
app.get("/hint5", (req, res) => {
    res.render("hint6");
});
app.get("/hint6", (req, res) => {
    res.render("hint7");
});
app.get("/hint7", (req, res) => {
    res.render("finalans");
});

app.get("/finalans", (req, res) => {
    res.render("leaderboard");
});

app.get("/leaderboard", (req, res) => {
    res.render("final");
});
app.get("/final", (req, res) => {
    res.render("about");
});
app.get("/final", (req, res) => {
    res.render("gamepage");
});
app.get("/about", (req, res) => {
    res.render("final");
});




app.listen(port, () => {
    console.log(`Server is running on Port Number: http://localhost:${port}`);
});