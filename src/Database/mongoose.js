const mongoose = require("mongoose");

try {
    mongoose.connect("mongodb+srv://Irvis:simmi6464@pokekai.bhuo7.mongodb.net/?retryWrites=true&w=majority", {
        autoIndex: false,
        bufferCommands: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to Database");
    })
}
catch (err) {
    console.error(err);
}