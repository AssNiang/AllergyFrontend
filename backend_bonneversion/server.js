const app = require('app');
require('dotenv').config({path:'./config/.env'});


app.listen(process.env.PORT, ()=> {
    console.log(`Listening on port ${process.env.PORT}`);
});