
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors({origin:true}));
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send('Hello world, this is the grocery store')
})

app.post('/create', (req, res)=>{
    // the req.body should be in json format send as FormData
    const title = req.body.title;
    const ingrediants = req.body.ingrediants;
    const fullData = [title, ingrediants];
    res.status(200).send(`Here is the data: ${fullData}`);
})


app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
})