const express=require("express");
 const https=require("https");
const request=require("request");
const bodyparser=require("body-parser");
const app=express();
app.use(express.static("public"));
 app.use(bodyparser.urlencoded({extended : true}));
 app.get("/",function(req,res) {
   res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res) {
  const firstname=req.body.fname;
  const lastname=req.body.lname;
   const email=req.body.eml;
  // console.log(firstname,lastname,email);
  const data ={
    members: [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url = "https://us19.api.mailchimp.com/3.0/lists/e45ceb4077";
  const options = {
    method:"POST",
    auth:"varuni:12c96a98225669b95e3bca9e7756d6de-us19"
  }
  const request=https.request(url,options,function(response) {
   if(response.statusCode === 200) {
     res.sendFile(__dirname + "/succcess.html");
   } else {
     res.sendFile(__dirname + "/failure.html");
   }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });

  });
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function() {
  console.log("server running in port 3000");
});


//API KEY
// 12c96a98225669b95e3bca9e7756d6de-us19(usX=replace it with apl keys last us19)
//LIST-ID
//e45ceb4077
