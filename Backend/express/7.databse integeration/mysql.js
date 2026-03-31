const express=require("express")
require('dotenv').config()
const path=require("path")
const app=express()
const mysql=require("mysql2")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})
db.connect(err=>{
    if(err){
        console.log("db connection is failed",err);
        return;
    };
    console.log("connected")
})

app.post("/users", (req, res) => {
    const { name, age } = req.body;

    if (!name || age <= 18) {
        return res.status(400).send("Invalid data");
    }

    const sql = `INSERT INTO users(name,age) VALUES(?,?)`;
    db.query(sql, [name, age], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Database error");
        }
        res.send("user added");
    });
});

app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error fetching users");
        }
        res.json(result);
    });
});
app.get("/users",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
    // res.sendFile(Path.join(__dirname,"../frontend/public/index.html"))
})
const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})