const UserRouter = require("express").Router();

const User = require("../models/User");

// Create a user 
UserRouter.post("/register", async (req, res) => {
   try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json(result);
   } catch (error) {
        res.status(400).json({message : error.message});
   } 
});

// Find all users
UserRouter.get("/", async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

// Find user by ID
UserRouter.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status("404").json({message : "User not found"});
        }
        else {
            return res.json(user);
        };
    } catch (error) {
        res.status(500).json({ message : error.message});
    }
});

// Updating a user by ID
UserRouter.put("/:id", async (req, res) => {
    try {
        console.log("Update route hit:", req.params.id, req.body);
        const UpdateUser = await User.findByIdAndUpdate(
            req.params.id , 
            req.body , 
            {new : true, runValidators : true});
        if (!UpdateUser) {
            console.error("Update failed", error);
            return res.status(404).json({message : "User not found"});
        }
        else {
            res.json(UpdateUser);
        };

    } catch (error) {
        res.status(400).json({ message : error.message});
    }
});

//Deleting a user by ID

UserRouter.delete("/:id", async (req, res) => {
    try {
        const constUserDelete = await User.findByIdAndDelete(req.params.id);
        if (!UserDelete) {
            return res.status(404).json({message : "User not found"})
        }
        else {
            res.json({message : "User Deleted"})
        };
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

module.exports = UserRouter;
