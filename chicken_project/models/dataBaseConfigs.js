const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://Lounes:root@cluster0.xf0zc.mongodb.net/chicken_db?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Mongodb connected");
    else console.log("Connection error :" + err);
  }
)