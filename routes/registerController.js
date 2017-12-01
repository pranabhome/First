/**
 * for register an user
 */
var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
	
	host : 'localhost',
	user : 'root',
	password : '1234',
	database : 'test'
});

connection.connect(function(err){
	if(!err)
		{
		console.log('Database is connected');
		}
	else
		{
		console.log('Error while connecting with database');
		}
	
});

    module.exports.register=function(req,res){
        var today = new Date();
        var users={
            "name":req.body.name,
            "email":req.body.email,
            "password":req.body.password,
            "created_at":today,
            "updated_at":today
        }
       connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
          if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
          }else{
              res.json({
                status:true,
                data:results,
                message:'user registered sucessfully'
            })
          }
        });
    }

