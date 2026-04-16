const express = require("express")
const path = require("path");
const app = express();
const {MongoClient} = require("mongodb");
const fs = require("node:fs");
require("dotenv").config();

async function main() {
    const uri = process.env.DB_STRING;
    const client = new MongoClient(uri)
    try {
        await client.connect();
        const db = client.db("Blog");
        const collection = db.collection("Posts");
        const content = await collection.find().toArray()
        fs.writeFile("posts.txt", "", err => {
            if (err) {
                console.error(err);
            }
        });
        content.forEach(post => fs.appendFile("posts.txt", post.subject + "-" + post.content + "\n", err => {
            if (err) {
                console.error(err);
            }
        }));

    } catch (e) {
        console.error(e);
    } finally {
        await client.close()
    }
}
setInterval(main, 10000);
app.use(express.static(path.join(__dirname, "")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "", "index.html"));
})

app.listen(8080, () => {
    console.log("Server running on 8080");
});