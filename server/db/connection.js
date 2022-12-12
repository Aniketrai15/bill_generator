const mongoose = require('mongoose');

const dburl = "mongodb+srv://aniketrai:noneabcd@cluster0.0vfncyp.mongodb.net/test_db?retryWrites=true&w=majority";

mongoose.connect(dburl).then(()=>{
    console.log('connection successful');
}).catch((err)=>{
    console.log('no connection');
})