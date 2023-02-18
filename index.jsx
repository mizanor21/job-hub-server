const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());
require('dotenv').config();

// mongoDB user: jobHub
// mongoDB pass: turf8DYkm7fOO55i

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jobHub:turf8DYkm7fOO55i@cluster0.disah5t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const fresherJobCollection = client.db('jobHub').collection('fresherJobs');
        const experienceJobCollection = client.db('jobHub').collection('experienceJobs');
        const topITCompanyCollection = client.db('jobHub').collection('topITCompanies')

        app.get('/fresher-jobs', async (req, res) => {
            const query = {};
            const cursor = fresherJobCollection.find(query)
            const result = await cursor.limit(6).toArray();
            res.send(result)
        })

        app.get('/experience-jobs', async (req, res) => {
            const query = {};
            const cursor = experienceJobCollection.find(query)
            const result = await cursor.limit(6).toArray();
            res.send(result)
        })

        app.get('/top-it-companies', async (req, res) => {
            const query = {};
            const cursor = topITCompanyCollection.find(query)
            const result = await cursor.limit(3).toArray();
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Simple node is running')
})

app.listen(port, () => {
    console.log(`Simple node server running on port ${port}`);
})