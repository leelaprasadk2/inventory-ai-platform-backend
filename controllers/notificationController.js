/*import Notification from "../models/Notification.js";
import mongoose from "mongoose";


// =========================
// GET NOTIFICATIONS
// =========================

export const getNotifications =
async (req, res) => {

  try {

    let notifications;

    // =========================
    // ADMIN
    // ONLY NEW USER REGISTERED
    // =========================

    if (req.user.role === "admin") {

      console.log(
        "Admin Logged In:",
        req.user.id
      );

      notifications =
      await Notification.find({

        type: "new_user"

      })

      .sort({

        createdAt: -1
      });

      console.log(
        "Admin notifications:",
        notifications.length
      );

    }

    // =========================
    // USER
    // ONLY OWN PRODUCT ALERTS
    // =========================

    else {

      console.log(
        "Logged User ID:",
        req.user.id
      );

      console.log(
        "Logged User Role:",
        req.user.role
      );

      notifications =
      await Notification.find({

        $or: [

          {
            userId:
            req.user.id
          },

          {
            userId:
            new mongoose.Types.ObjectId(
              req.user.id
            )
          }

        ],

        type:
        "inventory_alert"

      })

      .sort({

        createdAt: -1
      });

      console.log(
        "Notifications found:",
        notifications.length
      );

    }

    res.status(200).json(
      notifications
    );

  }

  catch (error) {

    console.log(
      "Notification Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
      error.message

    });

  }

};


// =========================
// MARK AS READ
// =========================

export const markAsRead =
async (req, res) => {

  try {

    const notification =
    await Notification.findByIdAndUpdate(

      req.params.id,

      {
        read: true
      },

      {
        returnDocument: "after"
      }

    );

    res.status(200).json(

      notification
    );

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      error.message

    });

  }

};


// =========================
// DELETE NOTIFICATION
// =========================

export const deleteNotification =
async (req, res) => {

  try {

    await Notification.findByIdAndDelete(

      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
      "Notification deleted"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      error.message

    });

  }

};*/



import Notification from "../models/Notification.js";
import { io } from "../index.js";


// =========================
// GET NOTIFICATIONS
// =========================

export const getNotifications =
async(req,res)=>{

try{

let notifications;


// =========================
// ADMIN
// =========================

if(req.user.role==="admin"){

console.log(
"Admin Logged In:",
req.user.id
);

notifications=
await Notification.find({

type:"new_user"

})

.sort({

createdAt:-1

});

console.log(

"Admin notifications:",

notifications.length

);

}


// =========================
// USER
// =========================

else{

console.log(
"Logged User ID:",
req.user.id
);

console.log(
"Logged User Role:",
req.user.role
);

notifications=
await Notification.find({

userId:req.user.id,

type:"inventory_alert"

})

.sort({

createdAt:-1

});

console.log(

"Notifications found:",

notifications.length

);

}

res.status(200).json(

notifications

);

}

catch(error){

console.log(

"Notification Error:",

error

);

res.status(500).json({

success:false,

message:error.message

});

}

};


// =========================
// MARK AS READ
// =========================

export const markAsRead =
async(req,res)=>{

try{

const notification=
await Notification.findByIdAndUpdate(

req.params.id,

{

read:true

},

{

returnDocument:"after"

}

);


// =========================
// REALTIME EVENT
// =========================

if(notification){

io.to(

req.user.id

).emit(

"notificationRead",

notification

);

}

res.status(200).json(

notification

);

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
// DELETE NOTIFICATION
// =========================

export const deleteNotification =
async(req,res)=>{

try{

await Notification.findByIdAndDelete(

req.params.id

);


// =========================
// REALTIME EVENT
// =========================

io.to(

req.user.id

).emit(

"notificationDeleted",

req.params.id

);

res.status(200).json({

success:true,

message:
"Notification deleted"

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
// SEND REALTIME NOTIFICATION
// =========================

export const sendRealtimeNotification =
async(notification)=>{

try{

if(notification?.userId){

io.to(

notification.userId

).emit(

"newNotification",

notification

);

}

}

catch(error){

console.log(

"Socket error:",

error.message

);

}

};