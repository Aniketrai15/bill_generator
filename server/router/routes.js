const express = require('express');
const cors = require('cors');
require('../db/connection');
require('../db/billdbconnection');

const router = express.Router();

router.use(cors());

const Myshop = require("../model/myschema");
const Bill = require("../model/billschema");

router.get('/',(req,res)=>{
    res.send('hello from router');
})

router.post('/postdata',(req,res)=>{
    const {prod_id,prod_name,price} = req.body;
    
    if(!prod_id || !prod_name || !price){
        return res.status(422).json({error: "plz fill the fields properly"});
    }

    Myshop.findOne({prod_id:prod_id})
    .then((prodExist) =>{
        if(prodExist){
            return res.status(422).json({error: "prod already exist"});
        }

        const myshop = new Myshop({prod_id,prod_name,price});
        myshop.save().then(()=>{
            res.status(201).json({message:"product register succesfully"});
        }).catch((err) =>{
            res.status(500).json({err: "failed registerd"});
        })
    }).catch(err =>{
        console.log(err);
    })
})

router.get('/getdata/:id',(req,res)=>{
    const prod_id = req.params.id;
    // console.log(prod_id);

    Myshop.findOne({prod_id:prod_id})
    .then((prodExist) =>{
        if(prodExist){
            return res.status(200).json({the_prod_is:prodExist});
        }
    }).catch(err =>{
        console.log(err);
    })


})

router.post('/savedata',(req,res)=>{
    const {bill_id,customer_name,products,total_bill} = req.body;
    

    Bill.findOne({bill_id:bill_id})
    .then((billExist) =>{
        if(billExist){
            return res.status(422).json({error: "bill no. already exist"});
        }

        const myshop = new Bill({bill_id,customer_name,products,total_bill});
        myshop.save().then(()=>{
            res.status(201).json({message:"bill register succesfully"});
        }).catch((err) =>{
            res.status(500).json({err: "failed registering the bill"});
        })
    }).catch(err =>{
        console.log(err);
    })
})

module.exports = router;