/*// =========================
// LOAD ENV FIRST
// =========================

import "./config/env.js";


// =========================
// IMPORTS
// =========================

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";


// =========================
// CONNECT DATABASE
// =========================

connectDB();


// =========================
// EXPRESS APP
// =========================

const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(

  cors({

    origin:
      "http://localhost:5173",

    credentials:true,

    methods:[
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ]

  })

);

app.use(express.json());

app.use(

  express.urlencoded({

    extended:true

  })

);


// =========================
// GOOGLE POPUP FIX
// =========================

app.use((req,res,next)=>{

  res.setHeader(

    "Cross-Origin-Opener-Policy",

    "same-origin-allow-popups"

  );

  next();

});


// =========================
// ROUTES
// =========================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/translate",
  translateRoutes
);


// =========================
// TEST ROUTE
// =========================

app.get("/",(req,res)=>{

res.send(
"API Running Successfully"
);

});


// =========================
// GLOBAL ERROR HANDLER
// =========================

app.use(

(err,req,res,next)=>{

console.log(
"=================="
);

console.log(
"GLOBAL ERROR:"
);

console.log(error);

console.log(
"MESSAGE:"
);

console.log(
err.message
);

console.log(
err.stack
);

console.log(
"=================="
);

return res.status(500).json({

success:false,

message:

err.message ||

"Internal Server Error"

});

}

);


// =========================
// SERVER
// =========================

const PORT=

process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log(

`🚀 Server running on ${PORT}`

);

});*/

import "./config/env.js";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";


// =========================
// CONNECT DATABASE
// =========================

connectDB();


// =========================
// EXPRESS APP
// =========================

const app = express();


// =========================
// CREATE HTTP SERVER
// =========================

const server =
http.createServer(app);


// =========================
// SOCKET IO
// =========================

export const io =
new Server(server,{

cors:{

origin:[

"http://localhost:5173",

"https://inventory-ai-platform.vercel.app"

],

credentials:true,

methods:[

"GET",
"POST"

]

}

});


// =========================
// SOCKET CONNECTION
// =========================

io.on(

"connection",

(socket)=>{

console.log(

"Socket Connected:",

socket.id

);


socket.on(

"join",

(userId)=>{

socket.join(userId);

console.log(

`User joined: ${userId}`

);

});


socket.on(

"disconnect",

()=>{

console.log(

"Socket disconnected"

);

});

}

);


// =========================
// MIDDLEWARE
// =========================

app.use(

cors({

origin:[

"http://localhost:5173",

"https://inventory-ai-platform.vercel.app"

],

credentials:true,

methods:[

"GET",
"POST",
"PUT",
"DELETE"

]

})

);

app.use(express.json());

app.use(

express.urlencoded({

extended:true

})

);


// =========================
// GOOGLE POPUP FIX
// =========================

app.use((req,res,next)=>{

res.setHeader(

"Cross-Origin-Opener-Policy",

"same-origin-allow-popups"

);

next();

});


// =========================
// ROUTES
// =========================

app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/products",productRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/users",userRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/translate",translateRoutes);


// =========================
// TEST
// =========================

app.get("/",(req,res)=>{

res.send(
"API Running Successfully"
);

});


// =========================
// GLOBAL ERROR
// =========================

app.use(

(err,req,res,next)=>{

console.log(err);

res.status(500).json({

success:false,

message:

err.message ||

"Internal Server Error"

});

}

);


// =========================
// SERVER
// =========================

const PORT =
process.env.PORT || 5000;


server.listen(

PORT,

()=>{

console.log(

`🚀 Server running on ${PORT}`

);

}

);