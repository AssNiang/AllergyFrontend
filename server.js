const express = require('express');
const userRoutes = require('./routes/user.routes');
// const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({path:'./config/.env'});
require('./config/db');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });


//routes
app.use('/api/user', userRoutes);

//server
app.listen(process.env.PORT, ()=> {
  console.log(`Listening on port ${process.env.PORT}`);
});


// module.exports = app;