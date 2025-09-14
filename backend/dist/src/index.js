import express from "express";
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Hello");
    console.log("Response sent");
});
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
