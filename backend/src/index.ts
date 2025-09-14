// import express from "express"

// const app = express()

// const port = process.env.PORT ?? "9001"

// app.get("/", (req, res) => {
//     res.send("Hello")
//     console.log("Response sent");    
// })

// app.listen(port, () => {
//     console.log(`App is running on port ${port}`)
// })

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import superheroRoutes from "./routes/superheroRoutes.js";

// dotenv.config();
// const app = express();

// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["GET","POST","PUT","DELETE"],
// }));

// app.use(express.json());

// // routes
// app.use("/api/superheroes", superheroRoutes);

// // connect to DB & start server
// const PORT = process.env.PORT || 8000;
// connectDB().then(() => {
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// });

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
const PORT = process.env.PORT || 8000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});