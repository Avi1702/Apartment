const express=require("express")
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")


app.use(cors())
// app.use(express.json())

mongoose.connect("mongodb://localhost:27017/Apartment",()=>{console.log("connected to DB")})

const Block_schema=new mongoose.Schema({
    name:{type:String},
    flats:{
        type:Array,
        
            childrenSchema:{
                flat_no:{
                    type:Number
                },
                residents:{
                    type:Object,
                    childrenSchema:{
                        name:{type:String},
                        age:{type:Number},
                        gender:{type:String}
                    }
                }
           
            }
    }

    // flats:[{flat_no:{type:Number},residents:{name:{type:String},age:{type:Number},gender:{type:String}}}]
})

const Blocks=new mongoose.model("Block",Block_schema)




app.get("/", async(req,res)=>{

    const data= await Blocks.find()
    console.log(data)
    res.send(data)

})

app.listen(5000,()=>{console.log("connected to port 5000")})