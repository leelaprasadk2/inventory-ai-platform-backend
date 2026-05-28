import Product from "../models/Product.js";
import axios from "axios";


// =========================
// CREATE PRODUCT
// =========================

export const createProduct = async (
req,
res
) => {

try {

const {

productName,
stock,
lastSoldDate,
expiryDate,
monthlySales,
price

} = req.body;


const product =
await Product.create({

userId:req.user.id,

productName,

stock,

lastSoldDate,

expiryDate,

monthlySales,

price,

risk:"Pending",

suggestion:"Pending",

daysToExpiry:0,

daysSinceSold:0,

aiCampaign:"Pending"

});


// =========================
// TRIGGER N8N
// =========================

try{

await axios.post(

"http://localhost:5678/webhook/inventory-ai",

{

productId:
product._id

}

);

console.log(

`${product.productName} -> n8n triggered`

);

}

catch(error){

console.log(

"n8n failed:",

error.message

);

}


// =========================
// RETURN PRODUCT
// =========================

res.status(201).json({

success:true,

product

});

}

catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

};


// =========================
// GET PRODUCTS
// =========================

export const getProducts = async (
req,
res
) => {

try{

const products =
await Product.find({

userId:req.user.id

})

.sort({

createdAt:-1

});

res.status(200).json(

products

);

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};


// =========================
// UPDATE PRODUCT
// =========================

export const updateProduct =
async(req,res)=>{

try{

const product =
await Product.findOneAndUpdate(

{

_id:req.params.id,

userId:req.user.id

},

req.body,

{

returnDocument:"after"

}

);

if(!product){

return res.status(404).json({

success:false,

message:"Product not found"

});

}

res.status(200).json({

success:true,

product

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};


// =========================
// DELETE PRODUCT
// =========================

export const deleteProduct =
async(req,res)=>{

try{

const product =
await Product.findOneAndDelete(

{

_id:req.params.id,

userId:req.user.id

}

);

if(!product){

return res.status(404).json({

success:false,

message:"Product not found"

});

}

res.status(200).json({

success:true,

message:"Product deleted"

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};


// =========================
// UPDATE AI CAMPAIGN
// =========================

export const updateCampaign =
async(req,res)=>{

try{

const product =
await Product.findOneAndUpdate(

{

_id:req.params.id,

userId:req.user.id

},

{

aiCampaign:
req.body.aiCampaign

},

{

returnDocument:"after"

}

);

if(!product){

return res.status(404).json({

success:false,

message:"Product not found"

});

}

res.status(200).json({

success:true,

message:
"Campaign updated successfully",

product

});

}

catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

};