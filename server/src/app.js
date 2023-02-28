import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js";
import deliveryRouter from "./routes/delivery.js";
import photoRouter from "./routes/photo.js";
import cookieParser from "cookie-parser";

// Create an express server
const app = express();
// import cookieParser from "cookie-parser";
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());
// Tell express that we use ejs as our default view engine for the forgot password page
app.set("view engine", "ejs");

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
app.use("/api/delivery", deliveryRouter);
app.use("/api/photo", photoRouter);

export default app;
