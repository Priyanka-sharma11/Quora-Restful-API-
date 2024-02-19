/*
GET     / posts       to get data for all posts
POST    /posts        to add a new posts
GET     /posts/:id    to get one post(using id)
PATCH   /posts/:id    to update specific post       (OR PUT)
DELETE  /posts/:id    to delete specific post 
*/

const express= require("express");
let app = express();
let port= 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set('view engine',"ejs");
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"i love coding!"
    },
    {
        id:uuidv4(),
        username:"priyankasharma",
        content:"Hard work is important to achieve success!"
    },
    {
        id:uuidv4(),
        username:"nikitasharma",
        content:"i got selected for my 1st internship!"
    },
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
   let {username,content}=req.body;
   let id=uuidv4();
   posts.push({id,username,content});
   res.redirect('/posts');
});

//show
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===p.id);
    res.render('show.ejs',{post}); 
});

//update
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content=newcontent;
    res.redirect('/posts');
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params; 
    let post = posts.find((p)=>id===p.id);
    res.render('edit.ejs',{post});
});

//delete
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id !==p.id);
    res.redirect('/posts');
});

app.listen(port,()=>{
    console.log("listening to port 8080");
});

