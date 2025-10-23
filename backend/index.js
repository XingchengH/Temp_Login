import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

console.log(app);


app.use(cors()); // to allow cross origin requests

// by default, express does not parse json body, need to use middleware, so able to access req.body
app.use(bodyParser.json()); // to parse json bodies
// body-parser a new middleware where read the req bodies, return req.body
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser tells what kind of data we are expecting, parsing urlencoded data


app.get("/", logger, (req, res) => {
  res.send("API is running...");
});

// simple endpoint to check if the backend is on running
app.get("/health", (req, res) => res.send("Server is working!"));
// app.get("/status-check", (req, res) => res.send("Server is working!"));

app.use("/auth", authRoute); // auth/login



// Temp area
app.use("/user", userRoute); // user/:id

// Error since ESM does not have __dirname
// console.log(__dirname);

// console.log(import.meta);



// Concept of Asynchronous JavaScript, single threaded non-blocking
// console.log("Start");
// setTimeout(() => {
//     console.log("Timeout after 3 seconds");
// }, 3000)
// console.log("End");


// Create a demo middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next(); // call next middleware in line
}

// Not Founded handler
app.use(notFound);

// Error middleware must placed after routes
app.use(errorHandler);

export default app;
