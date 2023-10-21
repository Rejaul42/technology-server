const express = require('express');
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;



// products
// AEmBXfhnRmCt66tO
// uK2pZQalSjz1HVt4
// reja22
// qzFCELkxxNLPAdUf






const uri = "mongodb+srv://reja22:qzFCELkxxNLPAdUf@cluster0.mym0on6.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db("productDB").collection("product")

    // send data to the database
    app.post('/product', async(req, res) =>{
        const newProduct = req.body;
        console.log(newProduct)
        // database e send
        const result = await productCollection.insertOne(newProduct)
        res.send(result)
    })

    // get data from database
    app.get("/product", async(req, res) =>{
        const cursor = productCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





// middleware 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Technology server is running...');
})

app.listen(port, () => {
    console.log(`Technology server running on port: ${port}`)
})