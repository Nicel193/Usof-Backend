import express from "express";
import UserController from "../controllers/user.controller.js";

const api = express.Router();

api.post("/register", UserController.createUser);

api.post("/login", (req, res) => {
});

api.post("/logout", (req, res) => {

});

api.post("/reset-password", (req, res) => {

});

export default api;