import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import superheroRoutes from "./routes/superheroRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET","POST","PUT","DELETE"],
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// routes
app.use("/api/superheroes", superheroRoutes);

// connect to DB & start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});