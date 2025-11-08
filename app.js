import express from "express";
import {authenticator} from "./src/middleware/authentication.middleware.js";
import router from "./src/routes/index.js";
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("hi");
});

app.use(router)





app.get('/private',authenticator ,(req, res) => {

    console.log(req.user)
    res.status(200).json({ message: "I'm private" })

})



app.use(function (err, _req, res, _next) {
    console.log(err);
    const message =  err.message ? err.message : "server error";
    const status = err.status ? err.status : 500;
    res.status(status).json({
        message
    });


});

export default app;
