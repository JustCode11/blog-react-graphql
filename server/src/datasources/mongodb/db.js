const mongoose = require("mongoose");

const connectToMongoDB = DB_HOST => {
    mongoose.connect(DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("Mit MongoDB verbunden.");
        })
        .catch((err) => {
            console.log("Verbindung mit MongoDB fehlgeschlagen.");
            console.log(err);
        })
};

module.exports = connectToMongoDB;