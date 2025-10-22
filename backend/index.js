import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();
app.use(cors()); // to allow cross origin requests

// by default, express does not parse json body, need to use middleware, so able to access req.body
app.use(bodyParser.json()); // to parse json bodies
// body-parser a new middleware where read the req bodies, return req.body
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser tells what kind of data we are expecting, parsing urlencoded data

// simple endpoint to check if the backend is on running
app.get("/health", (req, res) => res.send("Server is working!"));
// app.get("/status-check", (req, res) => res.send("Server is working!"));

app.use("/auth", authRoute); // auth/login



// Temp area
app.use("/user", userRoute); // user/:id

// Not Founded handler
app.use(notFound);

// Error middleware must placed after routes
app.use(errorHandler);

export default app;
