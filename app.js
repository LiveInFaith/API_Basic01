require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./routes/users");

const app = express();  
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the User Registration API");
});

app.use("/api/users", UserRouter);

const startServer = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the DB");

        app.listen(process.env.PORT, () => {
            console.log(`Server is running at http://${process.env.HOST}:${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Could not connect to DB", error);
        process.exit(1);
    }
};

startServer();



