// server.js (ESM clean version)
import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());

// ---- Fix __dirname for ES modules ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- Backend API ----
app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${apiKey}`;

    const response = await axios.get(url);
    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// ---- Serve Frontend ----
app.use(express.static(path.join(__dirname, "Frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

// ---- Start Server ----
app.listen(5000, () => console.log("Server running at http://localhost:5000"));
