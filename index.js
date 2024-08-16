const express = require("express");
const app = express();
const{v4:uuidv4}= require('uuid');
const path = require("path");
const methodOverride = require("method-override");

const port = 8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

let posts = [
    // {
    //     id:         uuidv4(),
    //     username:   "Dhruba",
    //     content:    "Iam a full stack developer"        
    // },
    // {
    //     id:         uuidv4(),
    //     username:   "Nayan",
    //     content:    "Iam a MALopps developer" 
    // },
    // {
    //     id:         uuidv4(),
    //     username:   "Swarna",
    //     content:    "Iam a java developer" 
    // },
]

app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})

app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=> id === p.id);
    let newcontent = req.body.content;
    post.content = newcontent;
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username,content}= req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}= req.params;
    console.log(id);
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs",{post});
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/",(req,res)=>{
    res.send("hellow world");
});

app.listen(port,()=>{
    console.log("listening on port 8080");
});
