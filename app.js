var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require("mysql");

app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine','ejs');

var db = mysql.createConnection({
  host    : 'localhost',
  user     : 'root',
  password : '',
  database : 'smart_result'
});

db.connect(function(err){
	if(err){
		throw err;
	}
	console.log("Database is connected");
});

app.get('/',function(req,res){
	res.render('login',{});
});

app.get('/signup',function(req,res){
	res.render('signup',{});
});

app.post('/profile',function(req,res){
	var id = req.body.id;
	var password = req.body.password;
	var type = req.body.type;
	console.log(password);
	console.log(type);


	if(type == "student"){

	db.query("SELECT pass FROM students WHERE id_no = ?",[id],function(err, results, fields){
    if(err){
      throw err;
    }
    console.log(results[0].pass);
    if(results[0].pass == password){
    
		db.query("SELECT * FROM `s1603028`",function(err, results, fields){
			if(err){
			  //throw err;
			}
			console.log(results.length);
			
			var i;
			for (i = 0; i < results.length; i++) {
			console.log(results[i].stud_no);
			}
			res.render('stdprofile', {length : results.length , result : results});
		   });
     	
    }
    });

	}
	else{

	db.query("SELECT pass FROM teachers WHERE id_no = ?",[id],function(err, results, fields){
    if(err){
      throw err;
    }
    console.log(results[0].pass);
    if(results[0].pass == password){
     res.render('teaprofile',{});	
    }
    });

	}

});

app.post('/success', function(req,res){
	var id = req.body.id;
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var type = req.body.type;


	if (type == "student"){

    db.query("INSERT INTO students (id_no, name, email, pass) VALUES (?, ?, ?, ?)",[ id, name, email, password],function(err, results, fields){
    if(err){
      throw err;
    }
    });

	}
	else{

    db.query("INSERT INTO teachers (id_no, name, email, pass) VALUES (?, ?, ?, ?)",[ id, name, email, password],function(err, results, fields){
    if(err){
      throw err;
    }
    });

	}

	console.log(id);
	console.log(name);
	console.log(email);
	console.log(password);
	console.log(type);

	res.render('success',{});
});


 app.post('/publish', function(req,res){
	
	var  mark1 = req.body.mark1;
	var  mark2 = req.body.mark2;
	
	
	console.log(mark1);
	console.log(mark2);

	db.query("INSERT INTO s1603028 (cor_name, mark) VALUES (?, ?)",["CSE 3105", mark1],function(err, results, fields){
		if(err){
		  throw err;
		}
		});
	
		db.query("INSERT INTO s1603029 (cor_name, mark) VALUES (?, ?)",["CSE 3105", mark2],function(err, results, fields){
			if(err){
			  throw err;
			}
			});	
	
	
	res.render('teaprofile',{});
	
 });




app.listen('8080', function(err){
	if(err){
		throw err;
	}
	console.log("Server run on port 8080");
});