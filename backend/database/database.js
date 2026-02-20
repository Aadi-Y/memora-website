const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to database");
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectToDatabase
}
