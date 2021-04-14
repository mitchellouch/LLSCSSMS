const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;