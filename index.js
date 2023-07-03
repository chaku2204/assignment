const express = require('express');
const app = express();
const hbs = require("hbs");
const cors = require('cors');
app.use(cors());
const port = 3000;
const { MongoClient } = require('mongodb');
const path = require('path');
const mongoose = require('mongoose');
const connectionURL = "mongodb+srv://chakugujarati:JsbmagrLohGopEQJ@cluster0.2fdvqox.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = client.db("dashaboard");
const collection = db.collection("year");
const static_path = path.join(__dirname,'/public');
const teplate_path = path.join(__dirname,"/template/views");
console.log(teplate_path);
app.set("view engine","hbs");
app.set("views",teplate_path);
app.use(express.static(static_path));

app.get("/",(req,res)=>{
  res.render("index");
});

app.get('/api/data', (req, res) => {
    try {
      collection.find().toArray().then((value)=>{
        
        const {end_year_min,end_year_max,topic,sector,region} = req.query;
        
        let filterdata = value;
        if(end_year_min){
          filterdata = filterdata.filter(obj=>obj.end_year>=end_year_min);
         }
         
        if(end_year_max){
          filterdata = filterdata.filter(obj=>obj.end_year<=end_year_max);
         }
        if(topic){
            filterdata = filterdata.filter(obj=>obj.topic===topic)
        }

        if(sector){
          filterdata = filterdata.filter(obj=>obj.sector===sector)
        }

        if(region){
          filterdata = filterdata.filter(obj=>obj.region===region);
        }
        res.json(filterdata);

     })
      
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data records' });
    }
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



