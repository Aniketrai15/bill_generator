const express = require('express');
const app = express();
require('./db/connection')

app.use(express.json());


const Myshop = require('./model/myschema');



const routes = require('./router/routes');

app.use(routes);

const middleware = (req,res,next) =>{
    console.log('this is middleware');
    next();
}

app.get('/',(req,res)=>{
    res.send('hello');
})

app.listen(3000,()=>{
    console.log('app is listening');
})