import express from "express";
import path from "path";

const app = express();

app.get("/", (req, res) => {
  console.log("Resolving / endpoint");
  res.json({
    pid: process.pid,
    msg: "HOLA JUAN CARL!OS",
  });
});

export default app;
