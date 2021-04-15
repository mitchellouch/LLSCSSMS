const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const User = require("../../models/userSchema");


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


/*  <Below code is for testing free version but failed, upgrade plan of MongoDB cluster provides automatic backup and restoration functionality>
//backup plan, module has some malfunction, need to wait bug fix


// const multer = require("multer");
// const upload = multer({ dest: "backups/" });
// const fs = require("fs");

// const MongoSnapshot = require("mongodb-snapshot");

// const MongoClient = require("mongodb").MongoClient;
// const client = new MongoClient(process.env.DB_CONNECTION, { useUnifiedTopology: true });

router.get("/backup/:collection", async (req, res, next) => {
    console.log("backup requests: "+req.params.collection);
    const collection = req.params.collection;

    if(collection == 'test') {
        console.log(__dirname);
    }
    else {
        
        // client.connect(function(err) {
        //     console.log('Connected successfully to server');
        //     const db = client.db("LLSCSSMS");

        //     getDocuments(db, function(docs) {
        //         console.log("Closing connection.");
        //         client.close();

        //         //write to file
        //         try {
        //             fs.writeFileSync('out_file.json', JSON.stringify(docs));
        //             console.log('Done writing to file.');
        //         }
        //         catch(err) {
        //             console.log('Error writing to file', err);
        //         }
        //     })
        // })

        // const getDocuments = function(db, callback) {
        //     const query = {};
        //     db.collection("saitprograms")
        //     .find(query)
        //     .toArray(function(err, result) {
        //         if(err) throw err;
        //         callback(result);
        //     })
        // }

        await mongoSnap('');    //backup
        console.log("\n####1\n");
        res.download(path.join(__dirname, "../../backups/backup.tar"), "backup.tar", err => {
            console.log(err);
            console.log("\n####2\n");
        });
    }

     res.redirect("/admin/backup");
});

router.get("/restore/:collection", async (req, res, next) => {
    console.log("restore requests: "+req.params.collection);
    const collection = req.params.collection;
    
    if(collection == 'test') {
    }
    else {

        // client.connect(function(err) {
        //     const db = client.db("LLSCSSMS");
        //     const data = fs.readFileSync('out_file.json');
        //     const docs = JSON.parse(data.toString());

        //     db.collection('saitprograms')
        //     .insertMany(docs, function(err, result) {
        //         if(err) throw err;
        //         console.log('Inserted docs: ', result.insertedCount);
        //         client.close();
        //     });
        // });

        await mongoSnap('', true);    //restore
        await fs.unlink(path.join(__dirname, `../../backups/backup.tar`), async error => {
            if(error != null){
                console.log(err);
                return res.sendStatus(400);
            }
        });
    }

    var payload = {
        userLoggedIn: req.session.user
    };

    res.status(200).render("users/adminBackup", payload);
    // res.redirect("/admin/backup");
});

router.post("/restore", upload.single("backupFile"), async (req, res, next) => {
    
    if(!req.file) {
        console.log("No file uploaded with ajax request.");
        return res.sendStatus(400);
    }

    var filePath = `/backups/backup.tar`;
    var tempPath = req.file.path;
    var targetPath = path.join(__dirname, `../../${filePath}`);

    fs.rename(tempPath, targetPath, async error => {
        if(error != null) {
            console.log(error);
            return res.sendStatus(400);
        }
        res.sendStatus(204);
    })

    

    //res.redirect("/admin/backup");
});



async function mongoSnap(path, restore = false) {
    const mongo_connector = new MongoSnapshot.MongoDBDuplexConnector({
        connection: {
            uri: process.env.DB_CONNECTION,
            dbname: 'LLSCSSMS'
        },
        assource: {
            collections: ['saitprograms']
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
*/
module.exports = router;