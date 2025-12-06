import express from "express";
const router = express.Router();

router.get("/ping", (req, res) => res.json({ status: "ok", message: "Server is healthy" }));

export default router;
