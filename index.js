const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.get('/b', (req, res) => {
    try {
        const listOfTasks=[];
        fs.readdirSync('./task').forEach(file => {
            let task = JSON.parse(readFileSync(`./task/${file}`, {encoding: 'utf8', flag: 'r'}))
            listOfTasks.push(task)
        });
        res.send(listOfTasks);
    } catch(e) {
        res.status(404).json({"massage": e})
    }
});

app.get("/v3/b/:id", (req, res) => {
    const id = req.params.id;
    try {
        const binContent = fs.readFileSync(`./bins/${id}.json`); //מקבלת את הקובץ שבתוך תיקייה בינס ומכניסה את התוכן שלה למשתנה בין קונטנט
        res.send(binContent);
    } catch(e) {
        res.status(404).json({"message": "Invalid Record ID"});
    }
});

app.put("/v3/b/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const binExist = fs.existsSync(`./bins/${id}.json`);
    if(!binExist) {
        res.status(404).json({
            "message": "Bin not found",
            "success": false
    });
    return;
    }
    fs.existsSync(`./bins/${id}.json`, body);
    const successMessage = {
        success: true,
        data: body,
        "version": 1,
        "parentId": id
    }   
    res.send(successMessage);                                                        ")
})

app.listen(3001, () => {
    console.log("run")
});
