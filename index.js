const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");


const app=express();
const port=process.env.PORT || 5000;

//midlewares
app.use(express.json())
app.use(cors())

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z5rmhar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const menuCollection=client.db('Fairy').collection('menu');
    const reviewsCollection=client.db('Fairy').collection('reviews');
    app.get("/", (req, res) => {
      res.send("hello world!");
    });
    //get all menu
    app.get('/menu',async(req,res)=>{
        const result=await menuCollection.find().toArray();
        res.send(result)
    })
    //get all reviews data
    app.get('/reviews',async(req,res)=>{
        const result=await menuCollection.find().toArray();
        res.send(result)
    })





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log('successfully connected to db')
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port,()=>{
    console.log(`server is running on fairy resturant - ${port}`)
})