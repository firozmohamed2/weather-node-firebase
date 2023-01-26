const functions = require("firebase-functions");
const express= require("express");
const app=express();
const https= require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/time",function(request,response){
  response.send("hi");
})

app.get("/",function(request,response){
    response.send("hello");
  })

  app.post("/",function(request,response){
    response.send("hellos");
  })

  app.post("/test",function(request,response){
    var name= request.body.name;
    var email= request.body.email;
    response.send(name +" " + email);
  })


  app.post("/weather",function(req,res){
    console.log(req.body.city);
   
   
     
    const key=req.body.city;
    const api_url="54b17ee4d01f3615394a450b41ef69b7";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+key+"&appid="+api_url+"&units=metric";
    https.get(url,function(response){
      // console.log(response);
       response.on("data",function(data){
         const weatherdata= JSON.parse(data);
         const temp= weatherdata.main.temp;
         const weatherdescription= weatherdata.weather[0].description;
         const weatherIcon= weatherdata.weather[0].icon;
        
    
    
        res.write("<h1>temperature in "+key+" is "+ temp+"</h1>");
        res.write("<p>weather in "+key+" is "+ weatherdescription+"</p>");
        const imgurl="http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
    
        res.write("<img src="+imgurl+">");
         res.send();
    
       })
    });
   
   
   })
   



   


  app.post("/signup",function(req,res){
    var name= request.body.name;
    var email= request.body.email;



   
    


    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:name,
                    LNAME:"demo name"
                }
            }
       
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/7f5ee873aa";
    const options={
        method:"POST",
        auth : "demoname:b74b3596b9a78f4218734418826a8813-us10"
    }





    const request= https.request(url,options,function(response){

        if(response.statusCode == 200){
          //  res.send("successs");
          res.send(name +" " + email + " " + "success");
        }
        else{
            //res.send("try again");
            res.send(name +" " + email + " " + "fail");


        }
        response.on("data",function(data){
           // console.log(JSON.parse(data));
        })
    })

   request.write(jsonData);
   request.end();

});






  
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest(app);

//to hook up the cloud function exports.helloworld to hosting project 

