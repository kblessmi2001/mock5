const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const UserModel = require("./models/user.model");

const app=express();

app.use(express.json());
app.use(cors({origin:'*'}));

app.get("/",async(req,res)=>{
    try {
        const query = req.query
        if (query.name) {
            const nameRegex = new RegExp(query.name, 'i');
            query.name = nameRegex;
          }
        const contacts = await UserModel.find(query)
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
})
app.post("/contacts",async(req,res)=>{
    const {id} = req.body
     try {
        const newContact = new UserModel({...req.body,id});
        await newContact.save()
        res.status(200).json(newContact)
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
})

app.patch("/contacts/edit/:id",async(req,res)=>{
    const {id}=req.params;
    const payload=req.body;
    try {
        const contact= await UserModel.findById({_id:id})
        if(contact){
            await UserModel.findByIdAndUpdate({_id:id},payload)
            res.status(200).json({msg:`Contact with ${id} updated`})
        }
    } catch (error) {
        res.status(400).json({error})
    }
})

app.delete("/contacts/delete/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const contact= await UserModel.findById({_id:id})
        if(contact){
            await UserModel.findByIdAndDelete({_id:id})
            res.status(200).json({msg:`Contact with ${id} deleted`})
        }
    } catch (error) {
        res.status(400).json({error})
    }
})

app.listen(8081,async()=>{
    try {
        await connection;
        console.log("DB is connected")
        console.log("Server is running at 3000")
    } catch (error) {
        console.log(error);
    }
   
})