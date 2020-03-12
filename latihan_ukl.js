const express = require('express')
const bodyPraser = require('body-parser')
const mysql = require('mysql')
const login = require('jsonwebtoken')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "latihan_ukl"
})

const pass = "Oktavian_Danuarta";

const Autorisasi = (request, result, next) => {
    if(typeof(request.headers['password ']) == 'Undefined '){
        return result.status(403).json({
            success: false,
            message: 'Token provided'
        })
    }
let token = request.headers['password'];

jwt.verify(token, pass, (err, decoded)=>{
        if(err){
            return result.status(403).json({
                success: false,
                message: 'Token invalid'
            })
        }
    })
    next()
}
//CRUD Penjual
app.get('/', (request, result) => {
    result.json({
        success: true,
        message: "Welcome"
    })
})

app.post('/login', (request, result ) => {
    let data = request.body;
    let username = data.penjual;
    let password = data.password;

    if(data.username == username && data.password == password){
        let token = jwt.sign(data.username + '|' + data.password, pass)
        result.json({
            success: true,
            message: "Login Success",
            token: token
        })
        
    }else{
        result.json({
            success: false,
            message: "Failed"
        })
    }
})

app.get('/penjual/semangka', (req, res) =>{
    let sql = "select * from semangka";
    db.query(sql, (err, results)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json({
                message: "This is your data",
                data: result
            })
        }
    })
})
l
app.post('/penjual/semangka', (res, req)=>{
    let data = request.body;
    let sql = `insert into semangka (id, jenis, berat, harga)
                values (`+data.id+`, `+data.jenis+`, `+data.berat+`, `+data.harga+`)`;
    db.query(sql, (err, results)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json({
                message: "Success input data",
                data: result
            })
        }
    })
})