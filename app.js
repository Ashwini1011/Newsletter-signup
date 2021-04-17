const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


app.use(express.static("public"));//to access static or local files like images and css to server
app.use(bodyParser.urlencoded({extended:true}));//to grab the data from our form.bodyparser allows us to look inside the body.
app.get("/",function(req,res)//when we request homeroute"/" from our server then it should deliver signup.html page.
{
res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res)
{
var firstName=req.body.fname;
var lastName=req.body.lname;
var email=req.body.email;
var data=
{
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_feild:
      {
        FNAME:firstName,
        LName:lastName
      }
    }
  ]
};
var jsonData=JSON.stringify(data);//turn whatever stored in "data" variable into compact string one line form.
const url ="https://us1.api.mailchimp.com/3.0/lists/1210b41903";

const options={
  method:"POST",
  auth:"harshal:0c47ce2ce00ea63f0be3c97d900e990b-us1"
}

const request=https.request(url,options,function(response){
  if(response.statusCode===200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else {
    {
  res.sendFile(__dirname+"/failure.html");
    }
  }
response.on("data",function(data){
  console.log(JSON.parse(data));
});
});//This "response" variable will give us response from mailchimp server.
request.write(jsonData);
request.end();
});


//post request when the subscription get failed and you need to back on home page after clicling "try me button".
app.post("/failure",function(req,res)
{
res.redirect("/");
});

app.listen(process.env.PORT || 3000,function()//process.env.port is dynamic and process object is defined by heroku
{
  console.log("port 3000 is started");
});









//list id
//1210b41903
//api key
//0c47ce2ce00ea63f0be3c97d900e990b-us1
//https://immense-falls-22451.herokuapp.com/  my final website from heroku
