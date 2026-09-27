import express from "express";
import dotenv from "dotenv";
import path from "path";
import webRoutes from "./routes/web";
// import  getConnection from "./config/database";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

//config view engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config routes
webRoutes(app);

// getConnection();

//config static file: images/css/js
app.use (express.static(`public`));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("env port:", process.env.PORT);
});