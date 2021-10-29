const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');

const app = express()
const port= process.env.PORT || 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ghw3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    // const database = client.db("sample_mflix");
    // const movies = database.collection("movies");
    console.log("kaj kortece abar kaj kortece")

  
      } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port,()=>{
	console.log("listening from",port)
})