const mongoose=require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL="mongodb://127.0.0.1:27017/WanderLustt";

main()
    .then(()=>{
        console.log("Connected to DB");
    })

    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(Mongo_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj,owner:"69a7e8ddf3bf9a8a0c8b0461"}))
    await Listing.insertMany(initData.data);
    console.log("DB was initialized");
    
}
initDB();