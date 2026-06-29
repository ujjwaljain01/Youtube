import { asyncHandler } from "../utils/asynchandler.js";
import express from "express";
import mongoose from "mongoose";
// import redisClient from "redis/Client";

// router.route("/").get(healthCheck);
const healthCheck = asyncHandler(async (req, res) => {
  const healthCheck = {
    status: "ok",
    upTime: process.uptime(),
    timestamp: Date.now(),
    checks: {},
  };

  try {
    const dbStatus = mongoose.connection.readyState === 1 ? "UP" : "DOWN";
    healthCheck.checks.database = dbStatus;

    // const redisStatus = redisClient.isOpen ? "UP" : "DOWN"
    // healthCheck.checks.redis = redisStatus

    // || resdisStatus === "DOWN"
    if (dbStatus === "DOWN") {
      healthCheck.status = "UNHEALTHY";
      return res.status(503).json(healthCheck);
    }

    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.status = "ERROR";
    healthCheck.error = error.message || "Unknown database error";
    res.status(503).json(healthCheck);
  }
});

export { healthCheck };
