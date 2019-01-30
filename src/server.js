const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');


const mysqlConnection = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'baza',
 database: 'rental',
 multipleStatements: true 
});
const app = express();
app.use(bodyparser.json());

app.listen(4000,()=>console.log('express server is running at port no: 4000'));

app.get('/employees',(req,res)=>{
 mysqlConnection.query('SELECT * FROM employee',(err,rows,fields)=>{
   if(!err){
     res.send(rows);
   } else {
     console.log(err);
   }
 })
}) 



app.delete('/employees/:id',(req,res)=>{
 mysqlConnection.query('DELETE FROM employee where EmployeeID = ?',[req.params.id],(err,rows,fields)=>{
   if(!err){
     res.send("Deleted successfully.");
   } else {
     console.log(err);
   }
 })
}) 

app.post('/customers',(req,res)=>{
   let cus = req.body;
   console.log(cus);
   var sql = "SET @CustomerID = ?; SET @PersonalID = ?; SET @Login=?; SET @Password=?; SET @ValletBalance=?; CALL CustomerAddOrEdit(@CustomerID,@PersonalID,@Login,@Password,@ValletBalance);";
   mysqlConnection.query(sql,[cus.CustomerID,cus.PersonalID, cus.Login, cus.Password, cus.ValletBalance],(err,rows,fields)=>{
   if(!err){
       rows.forEach(element=>{
           if(element.constructor === Array ) {
               res.send('Inserted employee id : '+ element[0].CustomerId)
           }
       })
   } else {
     console.log(err);
   }
 })
}) 

app.get('/customers',(req,res)=>{
   mysqlConnection.query('SELECT * FROM customer',(err,rows,fields)=>{
     if(!err){
       res.send(rows);
     } else {
       console.log("witam");
       console.log(err);
     }
   })
 }) 
 

 app.post('/personal',(req,res)=>{
   let cus = req.body;
   console.log(cus);
   var sql = "SET @PersonalID = ?; SET @Name = ?; SET @Surname=?; SET @PhoneNumber=?; SET @Email=?; CALL PersonalAddOrEdit(@PersonalID,@Name,@Surname,@PhoneNumber,@Email);";
   mysqlConnection.query(sql,[cus.PersonalID,cus.Name, cus.Surname, cus.PhoneNumber, cus.Email],(err,rows,fields)=>{
   if(!err){
       rows.forEach(element=>{
           if(element.constructor === Array ) {
               res.send('Inserted employee id : '+ element[0].PersonalID)
           }
       })
   } else {
     console.log(err);
   }
 })
}) 

app.get('/personal',(req,res)=>{
   
 mysqlConnection.query('SELECT * FROM personal',(err,rows,fields)=>{
   if(!err){
     res.send(rows);
   } else {
     console.log(err);
   }
 })
}) 

// REJESTRACJA KLIENTA
app.post('/combined',(req,res)=>{
 let cus = req.body;
 console.log(cus);
 var sql = "SET @CustomerID = ?; SET @PersonalID = ?; SET @Login=?; SET @Password=?; SET @ValletBalance=?; SET @Name = ?; SET @Surname=?; SET @PhoneNumber=?; SET @Email=?; CALL AddOrEdit(@CustomerID,@PersonalID,@Login,@Password,@ValletBalance,@Name,@Surname,@PhoneNumber,@Email);";
 mysqlConnection.query(sql,[cus.CustomerID,cus.PersonalID,cus.Login,cus.Password,cus.ValletBalance,cus.Name, cus.Surname, cus.PhoneNumber, cus.Email],(err,rows,fields)=>{
 if(!err){
     rows.forEach(element=>{
         if(element.constructor === Array ) {
            // res.send('Inserted employee id : '+ element[0].PersonalID)
         }
     })
 } else {
   console.log(err);
 }
})
}) 


app.get('/videos',(req,res)=>{
   
  mysqlConnection.query('SELECT * FROM movie',(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    } else {
      console.log(err);
    }
  })
 }) 



 // DODAWANIE/EDYCJA FILMU

 app.post('/addVideo',(req,res)=>{
  let cus = req.body;
  console.log(cus);
  var sql = "SET @MovieID = ?; SET @Title = ?; SET @Director=?; SET @ReleaseYear=?; SET @MovieGenre=?; SET @MovieLanguage=?; SET @Price = ?; SET @ImgSrc=?; SET @Description=?; CALL AddVideo(@MovieID,@Title,@Director,@ReleaseYear,@MovieGenre,@MovieLanguage,@Price,@ImgSrc,@Description);";
  mysqlConnection.query(sql,[cus.MovieID,cus.Title,cus.Director, cus.ReleaseYear,cus.MovieGenre,cus.MovieLanguage,cus.Price, cus.ImgSrc, cus.Description],(err,rows,fields)=>{
  if(!err){
      rows.forEach(element=>{
          if(element.constructor === Array ) {
             // res.send('Inserted employee id : '+ element[0].PersonalID)
          }
      })
  } else {
    console.log(err);
  }
 })
 }) 

 // USUWANIE FILMU

app.delete('/videos/:id',(req,res)=>{
  mysqlConnection.query('DELETE FROM movie where MovieID = ?',[req.params.id],(err,rows,fields)=>{
    if(!err){
      res.send("Deleted successfully.");
    } else {
      console.log(err);
    }
  })
 }) 