const { json } = require('express');
const mongoose = require('mongoose');

const myschema = new mongoose.Schema({
    bill_id : {
        type:Number,
        required:true
    },
    customer_name:{
        type:String,
        required:true
    },
    products: {
        type:Array,
        required:true,
    },
    total_bill:{
        type:Number,
        required:true
    }
})

const Bill = mongoose.model('BILL',myschema);
module.exports = Bill;