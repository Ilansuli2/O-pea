const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
// const axios = require("axios");
const app = express();
const http = require("http").createServer(app);

// Express App Config
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/user/user.routes");
const aisleRoutes = require("./api/aisle/aisle.routes");

// routes
const setupAsyncLocalStorage = require("./middlewares/setupAls.middleware");
app.all("*", setupAsyncLocalStorage);

app.use("/api/auth", authRoutes);
app.use("/api/aisle", aisleRoutes);
app.use("/api/user", userRoutes);

app.get("/api/test", async (req, res) => {
  try {
    res.send("test");
  } catch (err) {
    loggerService.error("Failed to get test", err);
    res.status(500).send({ err: "Failed to get test" });
  }
});

setInterval(async () => {
  try {
    const response = await axios.get(
      `https://o-pea-m2qy.onrender.com/api/test`
    );
    console.log("Request to / successful:", response.data);
  } catch (error) {
    console.error("Error making request to /:", error.message);
  }
}, 13 * 60 * 1000);
// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/station/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const logger = require("./services/logger.service");
const { log } = require("console");
const { default: axios } = require("axios");
const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info("Server is running on http://localhost:" + port);
});
