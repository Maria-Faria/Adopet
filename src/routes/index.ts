import express from "express";
import petRouter from "../routes/petRouter";
import adopterRouter from "../routes/adopterRoutes";

const router = (app: express.Router) => {
    app.use("/pets", petRouter);
    app.use("/adotantes", adopterRouter);
};

export default router;