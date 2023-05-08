
app.get("/contact", (req, res) => {
    res.render("contact");
});
app.get("/contactsubmit", (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    const phone = req.query.phone;
    const review = req.query.review;
    db.collection("Feedback").add({
        Name: name,
        Email: email,
        PhoneNumber: phone,
        Feedback: review,
    }).then(() => {
        res.render("thankyou");