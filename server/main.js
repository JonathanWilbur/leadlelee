const fs = require("fs");
const crypto = require("crypto");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
var app = express();
const salt = "LEEDLE_LEEDLE_LEE";

// Reading this into memory instead of reading from a file every time.
const indexTemplate = fs.readFileSync("./client/index.ejs", "utf-8");

var users = require("../users.json");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get(["/", "/index.html"], function (req, res, next) {
    res.set("Cache-Control", "max-age=10000");
    res.send(ejs.render(indexTemplate, { users: users }, {}));
});

app.post("/signup", function (req, res, next) {
    if (!req.body) {
        res.sendStatus(400);
    } else {

        var usernameTaken = false;
        for (var i = 0; i < users.length; i++) {
            if (users[i].name == req.body.name) {
                usernameTaken = true;
                break;
            }
        }

        if (!usernameTaken) {
            const hash = crypto.createHash('sha256');
            hash.update(req.body.password + salt);
            var newUser = {
                name: req.body.name,
                passwordSHA256: hash.digest("hex"),
                updated: new Date(),
                weight: req.body.weight,
                height: req.body.height,
                bench: (req.body.bench || 0),
                squat: (req.body.squat || 0),
                deadlift: (req.body.deadlift || 0)
            };
            newUser.score = newUser.bench + newUser.squat + newUser.deadlift;
            users.push(newUser);
            res.end();
            users.sort(function(a, b) { return (b.score - a.score); });
            fs.writeFile("./users.json", JSON.stringify(users), function () {});
        } else {
            res.sendStatus(400);
        }

    }
});

app.post("/update", function (req, res, next) {
    if (!req.body) {
        res.sendStatus(400);
    } else {
        var usernameTaken = false;
        for (var i = 0; i < users.length; i++) {
            if (users[i].name == req.body.name) {
                usernameTaken = true;
                const hash = crypto.createHash('sha256');
                hash.update(req.body.password + salt);
                if (users[i].passwordSHA256 == hash.digest("hex")) {
                    users[i] = {
                        name: users[i].name,
                        password: users[i].passwordSHA256,
                        updated: new Date(),
                        weight: req.body.weight,
                        height: req.body.height,
                        bench: (req.body.bench || 0),
                        squat: (req.body.squat || 0),
                        deadlift: (req.body.deadlift || 0)
                    };
                    users[i].score = users[i].bench + users[i].squat + users[i].deadlift;
                    res.end();
                    users.sort(function(a, b) { return (b.score - a.score); });
                    fs.writeFile("./users.json", JSON.stringify(users), function () {});
                } else {
                    res.sendStatus(401);
                }
                break;
            }
        }
        if (!usernameTaken) res.sendStatus(401);
    }
});

app.use(express.static("/leaderboard/client", {}));

app.listen(80);
