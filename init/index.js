const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js");
const mongo_url="mongodb://127.0.0.1:27017/wanderlus";
main().then(()=>{
    console.log("connected sucessfully");
})
.catch(err => console.log(err));


async function main() {
  await mongoose.connect(mongo_url);
}

async function initDb(){
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner:'65a250c1a7f68416afc152a3'}));
    await Listing.insertMany(initData.data);
}
initDb();