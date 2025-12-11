const express=require("express");
const app=express();
const path=require('path');
const cors=require('cors');
const mongoose= require('mongoose')
const Course=require('./models/CourseSchema');
app.set('views',path.join(__dirname,'views'))
app.use(cors())
app.use(express.json());

app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    console.log("First Middleware");
    next();
})
mongoose.connect('mongodb://localhost:27017/Courses')
.then(()=>console.log("DB connected Succesfully!!"))
.catch(()=>console.log("DB not connected!!"))


app.get('/courses',async(req,res)=>{
    try{
        const data= await Course.find();
        res.json(data);
    }
    catch(err)
    {
    res.status(500).json({error:"Server Error!"})
    }
})
app.post('/courses', async (req, res) => {
    try {
        const { title, description } = req.body;

        const newCourse = new Course({
            title,
            description
        });

        await newCourse.save();

        res.status(201).json({
            message: "Course added successfully!",
            course: newCourse
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});











app.get('/home',(req,res)=>{
    console.log("Welcome to home page!")
    res.send("Home page")
})
app.listen(3000,()=>{
    console.log("Server Listening in port 3000")
})