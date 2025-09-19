const { Client } = require('pg');
const express = require('express');
const app = express();
app.use(express.json());

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Jack15june",  // ✅ correct key name
    database: "demopost"
});

con.connect()
  .then(() => console.log("Connected"))
  .catch(err => console.error("Connection error", err.stack));

app.post('/postData', (req, res) => {
    const { name, id } = req.body;
    const insert_query = 'INSERT INTO demotable (name, id) VALUES ($1, $2)';
    
    con.query(insert_query, [name, id], (err, result) => {  // ✅ FIXED
        if (err) {
            console.error(err);
            res.status(500).send("Database Error");
        } else {
            console.log(result);
            res.send("POSTED DATA");
        }
    });
});

app.listen(3000, () => {
    console.log("server is running....");
});

app.get('/fetchData',(req,res)=>{
    const fetch_query ="Select * from demotable"
    con.query(fetch_query,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result.rows)
        }
    })
})
app.get('/fetchbyid/:id',(req,res)=>{
    const id = req.params.id
    const fetch_query = "Select * from demotable  where id = $1"
    con.query(fetch_query,[id],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result.rows[0])
        }
    })
})
app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const update_query ="UPDATE demotable SET name =$1 WHERE id =$2"
    con.query(update_query,[name,id],(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("UPDATED")
        }
    })
})
app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id
    const delete_query = 'Delete from demotable where id = $1'
    con.query(delete_query,[id],(err,result)=>{
        if(err){
            res.send(err)

        }
        else{
            res.send(result)
        }
    })

})