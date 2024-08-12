import express from "express";
import { AppDataSource } from "../config/dataSource";
import AdopterController from "../controller/AdopterController";
import AdopterRepository from "../repositories/AdopterRepository";

const router = express.Router();
const adopterRepository = new AdopterRepository(
    AppDataSource.getRepository("AdopterEntity")
);

const adopterController = new AdopterController(adopterRepository);

router.post("/", (req, res) => adopterController.createAdopter(req, res));

export default router;