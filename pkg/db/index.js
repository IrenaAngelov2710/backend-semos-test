//* npm i mongoose - instrument za modeliranje na podatoci i komunikacija so MongoDB bazi na podatoci
const mongoose = require("mongoose");
//* npm i dotenv - bibilioteka za citanje na konfiguraciski promenlivi od config.env datotekata
const dotenv = require("dotenv");


//* Konfiguracija na dotenv;
dotenv.config({path: `${__dirname}/../config/config.env`});

//* Zamena na PASSWORD so DATABASE_PASSWORD
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

//* Povrzuvanje so MongoDB bazata
exports.init = async () => {
    try{
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to the database.")
    }
    catch(err){
        console.log(err);
    }
};