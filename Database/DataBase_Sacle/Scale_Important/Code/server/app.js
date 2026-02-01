const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
// const setupSharding=require('./db/conn')

const connectDB = require("./db/conn");
const RegisterGet = require("./model/student");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.json());

// POST API to insert data

let port=3000;


app.get('/home' , (req,res)=>{
  console.log('hello jugal .....')

  res.json({
    name:'jugal',
    class:10,
    number:'fall very time'
  })

  res.json({instanceId:process.env.instanceId})

})


app.get("/users", async (req, res) => {
  const { price } = req.query;

  try {
    const query = {
      ...(price && { price: { $lte: Number(price) } }) // Convert query string to number
    };

    console.log("Query being used:", query);

    const users = await RegisterGet.find(query).explain("executionStats")
    
    console.log("Query result:", users);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});








// Connect DB and start server
connectDB();

app.listen(port, () => console.log(port ,"Server running on port 9000"));


///Cluster App.js Use Important --------------------------------------------------->>



// const express = require("express");
// const connectDB = require("./db/conn");
// const router = require("./routes/router");
// const startServer = require('./Cluster/clust');
// const redisClient = require("./Redis/redisClient");
// const TimeDate = require("./rateLimite/rate"); // Correct import
// const cors = require('cors');
// const app = express();
// const port = 9000;

// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
//   credentials: true,
// };



// // Apply middlewares before starting cluster workers
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
// app.use(TimeDate); // Apply the middleware globally
// app.use(router);



// // Start cluster (workers will listen)
// startServer(app, port);




// // Graceful shutdown
// process.on("SIGINT", async () => {
//   console.log("Shutting down server...");
//   process.exit(0);
// });


// module.exports = app; // Export only `app`
