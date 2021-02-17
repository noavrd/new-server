const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.get("/v3/b/:id", (req, res) => {
    const id = req.params.id;
    try {
        const binContent = fs.readFileSync(`./bins/${id}.json`); //מקבלת את הקובץ שבתוך תיקייה בינס ומכניסה את התוכן שלה למשתנה בין קונטנט
        res.send(binContent);
    } catch(e) {
        res.status(404).json({"message": "Invalid Record ID"});
    }
});
