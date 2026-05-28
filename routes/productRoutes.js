import express from "express";

import {

createProduct,
getProducts,
updateProduct,
deleteProduct,
updateCampaign

} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// CREATE PRODUCT
router.post(
"/",
authMiddleware,
createProduct
);


// GET PRODUCTS
router.get(
"/",
authMiddleware,
getProducts
);


// UPDATE PRODUCT
router.put(
"/:id",
authMiddleware,
updateProduct
);


// UPDATE CAMPAIGN
router.put(
"/campaign/:id",
authMiddleware,
updateCampaign
);


// DELETE PRODUCT
router.delete(
"/:id",
authMiddleware,
deleteProduct
);

export default router;