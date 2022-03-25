const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Task = require('./models/tasks')

//middlewares
app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//mongodb connection
const dburi = 'mongodb+srv://myuser:myuser123@project1.rn7o3.mongodb.net/MiniProject?retryWrites=true&w=majority';
mongoose.connect(dburi)
    .then((result)=> app.listen(3000) )
    .catch((err)=> console.log(err));

app.get('/',(req,res)=>{
    Task.find()
    .then((result)=>{
        res.render('index.ejs',{records :result})
    })
    .catch((err)=>{
        console.log(err);
    }) 

})
 
app.post('/delete' ,(req,res)=>{
   // console.log("BOdy");
    //console.log(req.body);
    const info = {
        title : req.body.title,
        id : req.body.id,
    }
 
    Task.findByIdAndRemove(info.id, (err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
})
app.post('/update',async (req,res)=>{
    const info = {
        newValue : req.body.title,
        id : req.body.id,
    }
    console.log(info.newValue);
    console.log(info.id);

    Task.findOneAndUpdate(
        {_id : info.id },
        {$set:{ title : info.newValue}
    },(err)=>{
        console.log(err);
    })

})

app.post('/add', async(req,res)=>{
    const title = req.body.title;

    console.log("Title: "+ title)

    console.log(title);
    const newTask = await Task.create({title});
    res.redirect('/');
})

