const mongoose = require('mongoose');

const myschema = new mongoose.Schema({
    prod_id : {
        type:Number,
        required:true
    },
    prod_name: {
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true
    }
})

const Myshop = mongoose.model('MYSHOP',myschema);
module.exports = Myshop;