require('dotenv').config();
const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors")

app.use(express.json());
app.use(cookieParser())
const allowedOrigins = [
  'http://localhost:5173',
  'https://dispensary-frontend-nhyuelgvm-arnab06082004s-projects.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



require('./connection');
const userRoutes = require("./Router/user")
const facilityRoutes = require("./Router/facility")
const medicineRoutes = require("./Router/medicine")
const hospitalRoutes = require("./Router/nearByHospital")
const notificationRoutes = require("./Router/notification")
const galleryRoutes = require("./Router/gallery")
const historyRoutes = require("./Router/history")

app.use("/api/auth", userRoutes)
app.use("/api/facility",facilityRoutes)
app.use("/api/medicine",medicineRoutes)
app.use("/api/hospital",hospitalRoutes)
app.use("/api/notification",notificationRoutes)
app.use("/api/gallery",galleryRoutes)
app.use("/api/history",historyRoutes)


app.listen(port, () => {
    console.log(`the app is running on: http://localhost:${port}`);
});
