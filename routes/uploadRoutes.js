import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import axios from "axios";

import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// MULTER CONFIG
// ==========================

const upload = multer({
  dest:"uploads/"
});

// ==========================
// FORMAT DD-MM-YYYY
// ==========================

const formatDate=(dateString)=>{

if(!dateString) return null;

const [day,month,year]=
dateString.split("-");

return new Date(
`${year}-${month}-${day}`
);

};


// ==========================
// CSV UPLOAD ROUTE
// ==========================

router.post(

"/csv",

authMiddleware,

upload.single("file"),

async(req,res)=>{

try{

if(!req.file){

return res.status(400).json({

success:false,

message:"CSV file required"

});

}

const results=[];

fs.createReadStream(
req.file.path
)

.pipe(csv())

.on("data",(data)=>{

results.push(data);

})

.on("end",async()=>{

try{

const createdProducts=[];


// ==========================
// SAVE PRODUCTS
// ==========================

for(const item of results){

const product=
await Product.findOneAndUpdate(

{
productName:
item.productName?.trim(),

userId:
req.user.id
},

{

userId:
req.user.id,

role:
req.user.role,

productName:
item.productName?.trim(),

stock:
Number(item.stock),

lastSoldDate:
formatDate(item.lastSoldDate),

expiryDate:
formatDate(item.expiryDate),

monthlySales:
Number(item.monthlySales),

price:
Number(item.price),

risk:"Pending",

suggestion:"Pending",

daysToExpiry:0,

daysSinceSold:0,

aiCampaign:"Pending"

},

{

upsert:true,

returnDocument:"after"

}

);

createdProducts.push(
product._id
);

}


// ==========================
// TRIGGER N8N
// ==========================

try{

await axios.post(

 process.env.N8N_WEBHOOK_URL,
{

productIds:
createdProducts

}

);

console.log(
"CSV n8n triggered successfully"
);

}

catch(err){

console.log(
"CSV n8n failed:",
err.message
);

}


// ==========================
// DELETE FILE
// ==========================

fs.unlinkSync(
req.file.path
);


// ==========================
// RESPONSE
// ==========================

res.status(200).json({

success:true,

message:
"CSV uploaded successfully"

});

}

catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

});

}

catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

}

);

export default router;