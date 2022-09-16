const express = require("express");
const app = express();
const { insert, getAll, login } = require("./models/appModels")

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.post("/api/register", (req, res) => {
    let promise = insert(req.body)
        .then((results) => {
            if (results === true) {
                return res.status(200).json({ error: false, message: "registered successful" });
            }
            else {
                return res.status(401).json({ error: true, message: results })
            }
        });
    db_res = insert(req.body);

});
app.post("/api/login", (req, res) => {
    let promise = login(req.body)
        .then((results) => {
            if (results) {
                return res.status(200).json({ error: false, message: "registered successful", user: { id: results.id, fullName: results.fullName, token: null } });
            }
            else {
                return res.status(404).json({ error: true, message: "User not Found!" })
            }
        });

});

app.listen(4000, () => {
    console.log("listening");
});
