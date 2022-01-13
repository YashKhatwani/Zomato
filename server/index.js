require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
//Databse Connection
import ConnectDB from "./database/connection";

//to initialize express in zomato
const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(cors());
zomato.use(helmet());

//route
zomato.get("/", (req, res) => {
    res.json({ message: "Setup Success" });
});

zomato.listen(4000, () =>
    ConnectDB()
        .then(() => console.log("Server is up and running"))
        .catch(() =>
            console.log("Server is running, but database connection failed .")
        )
);
