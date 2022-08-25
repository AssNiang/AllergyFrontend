const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const specialistRoutes = require('./routes/specialist.routes');
const adminRoutes = require('./routes/admin.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({path:'./config/.env'});
require('./config/db');
const  {checkUser, requiredAuth} = require('./middleware/auth.middleware');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

// app.use(bodyParser.urlencoded({extended: true}));


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

// jwt
app.get('*', checkUser);
app.get('/jwtid', requiredAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
  
//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/user/specialist', specialistRoutes);
app.use('api/user/admin', adminRoutes);

//server
app.listen(process.env.PORT, ()=> {
  console.log(`Listening on port ${process.env.PORT}`);
});


// module.exports = app;