const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

let posts = [
    {
        username:   "Dhruba",
        content:    "Iam a full stack developer"        
    },
    {
        username:   "Nayan",
        content:    "Iam a MALopps developer" 
    },
    {
        username:   "Swarna",
        content:    "Iam a java developer" 
    },
]

app.post("/posts",(req,res)=>{
    let {username,content}= req.body;
    posts.push({username,content});
    res.redirect("/posts");
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
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
