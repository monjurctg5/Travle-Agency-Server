const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId

const app = express()

const port= process.env.PORT || 5000

//midleware

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ghw3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = client.db("Travelo");
    const serviceColection = database.collection("Services");

    app.get('/services',async(req,res)=>{
      const cursor = serviceColection.find({})
      const result = await cursor.toArray()
      res.send(result)
      console.log(result)
    })


    app.post('/services',async(req,res)=>{
      const newService = req.body;
      const result = await serviceColection.insertOne(newService)
      res.send(result)
      console.log(result)
    })
   

  
      } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port,()=>{
	console.log("listening from",port)
})