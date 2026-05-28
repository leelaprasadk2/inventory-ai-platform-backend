import Product from "../models/Product.js";

export const getDashboardStats = async (
  req,
  res
) => {

  try {

    const products =
    await Product.find({

      userId:req.user.id

    });

    // =========================
    // TOTAL PRODUCTS
    // =========================

    const totalProducts =
    products.length;

    // =========================
    // DEAD STOCK
    // =========================

    const deadStockProducts =
    products.filter(

      product =>

      product.risk ===
      "Dead Stock"

    );

    const deadStock =
    deadStockProducts.length;


    // =========================
    // CRITICAL
    // =========================

    const criticalProducts =
    products.filter(

      product =>

      product.risk ===
      "Critical"

    );

    const critical =
    criticalProducts.length;


    // =========================
    // HEALTHY
    // =========================

    const healthyProducts =
    products.filter(

      product =>

      product.risk ===
      "Healthy"

    );

    const healthy =
    healthyProducts.length;


    // =========================
    // SLOW MOVING
    // =========================

    const slowMovingProducts =
    products.filter(

      product =>

      product.risk ===
      "Slow Moving"

    );

    const slowMoving =
    slowMovingProducts.length;


    // =========================
    // LOW STOCK
    // =========================

const lowStockProducts =
products.filter(

product =>

product.risk ===
"Low Stock"

);

const lowStock =
lowStockProducts.length;

    


    // =========================
    // EXPIRING SOON
    // =========================

    const expiringSoonProducts =
    products.filter(

      product =>

      product.risk ===
      "Expiry Risk"

    );

    const expiringSoon =
    expiringSoonProducts.length;


    // =========================
    // EXPIRED
    // =========================

    const expiredProducts =
    products.filter(

      product =>

      product.risk ===
      "Expired"

    );

    const expired =
    expiredProducts.length;


    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({

      totalProducts,

      deadStock,

      critical,

      expired,

      expiringSoon,

      lowStock,


      slowMoving,

      products,

      deadStockProducts,

      criticalProducts,

      expiredProducts,

      expiringSoonProducts,

      lowStockProducts,

      

      slowMovingProducts

    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({

      message:error.message

    });

  }

};