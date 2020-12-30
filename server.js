
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
// import mealModel from './models/mealModel.js';
const mealModel = require('./models/mealModel.js');
const e = require('express');
const PORT = 9000;

app.use(cors({origin:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const mongo_uri = process.env.MONGOOSE_URI;
mongoose.connect(`${mongo_uri}`, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

app.get('/', (req, res)=>{
    res.status(200).send('Hello world, this is the grocery store')
})

app.get('/view', (req, res)=>{
    mealModel.find({}, null, {sort: {published_date: -1}}, (err, data)=>{
        if (err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data);
        }
    })
})

app.get('/userView/:user', (req, res)=>{
    //  fix find method once user is defined
    mealModel.find({ author: req.params.user}, (err, data)=>{
        if (err){
            res.status(500).send(err)
        } else {
            console.log(data, req.params.user);
            res.status(201).send(data);
        }
    })
})

app.post('/create', (req, res)=>{
    // the req.body should be in json format send as FormData
    const data = req.body;
    console.log(req.body);
    
    mealModel.create(data, (error, data)=>{
        if (error){
            res.status(500).send(error);
        } else {
            res.status(201).send(data);
        }
    })
})

app.delete('/:postId', (req,res)=>{
    const id = req.params.postId.split('=')[1];
    mealModel.deleteOne({_id: id})
    .then((response)=>{
        console.log(id, 'deleted');
        res.status(201).send('sucessfully deleted post');
    }).catch((e)=>{
        res.status(501).send(e);
    })
})


app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
})