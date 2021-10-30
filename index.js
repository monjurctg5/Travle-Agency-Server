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
     const OrdersColection = database.collection("Orders");

    //get all service
    app.get('/services',async(req,res)=>{
      const cursor = serviceColection.find({})
      const result = await cursor.toArray()
      res.send(result)
      // console.log(result)
    })


    //get one from service

     app.get('/services/:id',async(req,res)=>{
      const id = req.params.id
      console.log(id)
      if(id){
        // console.log(id)
      const query = { _id: ObjectId(id) }
      const result = await serviceColection.findOne(query)
      res.send(result)
      // console.log(result)

      }
      
    })

     //get all from orders

     app.get('/orders',async(req,res)=>{
      const cursor = OrdersColection.find({})
      const result = await cursor.toArray()
      res.send(result)
      // console.log(result)
    })


    //delete a service
    app.delete("/services/:id",async(req,res)=>{
      const id = req.params.id
      console.log(id)
      const result =  await serviceColection.deleteOne({_id:ObjectId(id)})
      // console.log(result)
      res.send(result)
    })

      //delete a orders
    app.delete("/orders/:id",async(req,res)=>{
      const id = req.params.id
      console.log(id)
      const result =  await OrdersColection.deleteOne({_id:ObjectId(id)})
      console.log(result)
      res.send(result)
    })

    //update 
     app.put('/services/:id', async (req, res) => {
            const id = req.params.id;
            const updateService = req.body
            // console.log(id,updateService)
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    ServiceName: updateService.ServiceName,
                    sortTitle: updateService.sortTitle,
                    description: updateService.description,
                    img:updateService.img,
                    const:updateService.cost

                },
            };

            const result = await serviceColection.updateOne(filter, updateDoc, options);
            // console.log("update", result);
            res.send(result)
        })
      app.put('/orders/:id', async (req, res) => {
            const id = req.params.id;
            
            // console.log(id)
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    approved:"true"  
                },
            };

            const result = await OrdersColection.updateOne(filter, updateDoc, options);
            // console.log("update", result);
            res.send(result)
        })

    //add service  by post method
    app.post('/services',async(req,res)=>{

      const newService = req.body;

      const result = await serviceColection.insertOne(newService)
      res.send(result)
      // console.log(result)

    })

    //cline orders post method
     app.post('/orders',async(req,res)=>{
      const newOrders = req.body;
      const result = await OrdersColection.insertOne(newOrders)
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