const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../models/userSchema");

const MongoSnapshot = require("mongodb-snapshot");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    var searchObj = {};

    // searchObj = {
    //     //saitId: { $regex: req.query.saitId }
    //     request: { type: Boolean, default: true }
    // }

    searchObj = {
        $or: [
            { request: 'true' },
            { request: true }
        ]
    }


    User.find(searchObj)
        .then((results) => res.status(200).send(results))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

router.get("/request/accept/:saitId", (req, res, next) => {
    //request: true -> false
    User.findOneAndUpdate({ saitId: req.params.saitId }, { $set: { request: false } }, { new: true })
        .then(() => res.redirect("/admin")) //redirect /admin
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })
});

router.get("/request/decline/:saitId", (req, res, next) => {
    //delete the user
    User.findOneAndDelete({ saitId: req.params.saitId })
        .then(() => res.redirect("/admin")) //redirect /admin
        .catch(error => {
            console.log(error);
            res.sendStatus(400);
        })
});

router.get("/backup/:collection", async (req, res, next) => {
    console.log("backup requests: "+req.params.collection);
    const collection = req.params.collection;

    if(collection == 'test') {
        console.log(__dirname);
    }
    else {
        await mongoSnap('');    //backup
    }

    res.redirect("/admin/backup");
});

router.get("/restore/:collection", async (req, res, next) => {
    console.log("restore requests: "+req.params.collection);
    const collection = req.params.collection;
    
    if(collection == 'test') {
    }
    else {
        await mongoSnap('', true);    //restore
    }

    res.redirect("/admin/backup");
});

async function mongoSnap(path, restore = false) {
    const mongo_connector = new MongoSnapshot.MongoDBDuplexConnector({
        connection: {
            uri: process.env.DB_CONNECTION,
            dbname: 'LLSCSSMS'
        }
    });

    const localfile_connector = new MongoSnapshot.LocalFileSystemDuplexConnector({
        connection: {
            path: './backups/backup.tar'
        }
    });

    const transferer = restore ? 
        new MongoSnapshot.MongoTransferer({ source: localfile_connector, targets: [mongo_connector] }) : 
        new MongoSnapshot.MongoTransferer({ source: mongo_connector, targets: [localfile_connector] }) ;

    for await (const { total, write } of transferer) {
        console.log(`remaining bytes to write: ${total - write}`);
    }
}

module.exports = router;